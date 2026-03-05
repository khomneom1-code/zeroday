import os
from datetime import datetime, timezone
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from .database import MongoRepo
from .schemas import ThreatEvent, ThreatResponse

app = FastAPI(title="CCTV Threat Detection API", version="0.1.0")
repo = MongoRepo()

origins_raw = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:5173")
origins = [o.strip() for o in origins_raw.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/api/events")
def get_events(limit: int = 20) -> dict:
    return {"items": repo.list_events(limit=limit)}


@app.post("/api/events", response_model=ThreatResponse)
def create_event(event: ThreatEvent) -> ThreatResponse:
    repo.insert_event(event.model_dump())
    return ThreatResponse(status="ok", message="Event stored", event=event)


@app.post("/api/analyze", response_model=ThreatResponse)
async def analyze_video(file: UploadFile = File(...)) -> ThreatResponse:
    # Placeholder analysis result (replace with YOLO + ByteTrack pipeline)
    fake_score = 78
    fake_type = "Suspicious Behaviour" if fake_score >= 70 else "Normal"

    event = ThreatEvent(
        person_id=1,
        threat_score=fake_score,
        type=fake_type,
        timestamp=datetime.now(timezone.utc),
        source_video=file.filename,
    )

    repo.insert_event(event.model_dump())
    return ThreatResponse(status="ok", message="Video analyzed", event=event)
