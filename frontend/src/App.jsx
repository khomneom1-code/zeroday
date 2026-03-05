import { useEffect, useState } from 'react'
import { fetchEvents, uploadVideo } from './api'

export default function App() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function loadEvents() {
    try {
      const data = await fetchEvents()
      setEvents(data.items || [])
    } catch (e) {
      setError(e.message)
    }
  }

  async function onUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError('')
    try {
      await uploadVideo(file)
      await loadEvents()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])

  return (
    <main style={{ maxWidth: 900, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>CCTV Threat Dashboard</h1>
      <p>Upload a video clip to run placeholder threat analysis.</p>

      <input type="file" accept="video/*" onChange={onUpload} />
      {loading && <p>Analyzing video...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <h2>Recent Events</h2>
      <table width="100%" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th align="left">Person ID</th>
            <th align="left">Threat Score</th>
            <th align="left">Type</th>
            <th align="left">Timestamp</th>
            <th align="left">Source Video</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, idx) => (
            <tr key={`${event.timestamp}-${idx}`} style={{ borderTop: '1px solid #ddd' }}>
              <td>{event.person_id}</td>
              <td>{event.threat_score}</td>
              <td>{event.type}</td>
              <td>{new Date(event.timestamp).toLocaleString()}</td>
              <td>{event.source_video || '-'}</td>
            </tr>
          ))}
          {!events.length && (
            <tr>
              <td colSpan="5">No events yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  )
}
