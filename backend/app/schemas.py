from pydantic import BaseModel, Field
from datetime import datetime


class ThreatEvent(BaseModel):
    person_id: int
    threat_score: int = Field(ge=0, le=100)
    type: str
    timestamp: datetime
    source_video: str | None = None


class ThreatResponse(BaseModel):
    status: str
    message: str
    event: ThreatEvent
