const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export async function fetchEvents() {
  const res = await fetch(`${API_BASE}/api/events`)
  if (!res.ok) throw new Error('Failed to fetch events')
  return res.json()
}

export async function uploadVideo(file) {
  const fd = new FormData()
  fd.append('file', file)
  const res = await fetch(`${API_BASE}/api/analyze`, { method: 'POST', body: fd })
  if (!res.ok) throw new Error('Failed to analyze video')
  return res.json()
}
