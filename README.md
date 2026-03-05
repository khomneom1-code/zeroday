# CCTV Threat Detection Starter (Manual-Friendly)

This repository now includes a complete **starter file set** so you can run and modify the system manually.

## Included services
- `backend` (FastAPI)
- `frontend` (React)
- `mongodb` (for alerts/events)

## Quick start (Docker)
```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend docs: http://localhost:8000/docs

## Quick start (manual, no Docker)
### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Project structure
```text
backend/
  app/
    main.py
    database.py
    schemas.py
  requirements.txt
  Dockerfile
frontend/
  src/
    App.jsx
    main.jsx
    api.js
  index.html
  package.json
  vite.config.js
  Dockerfile
  nginx.conf
docker-compose.yml
.env.example
```

## Notes
- `videos/` is included for your demo clips.
- `models/` is included for YOLO/ML assets.
- Detection/tracking is currently stubbed and easy to replace with YOLO + ByteTrack.
