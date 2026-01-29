import { useEffect, useState } from 'react'
import { fetchHealth } from './api'

type HealthResponse = {
  status: string
  service: string
  version: string
  timestamp: string
  checks: Record<string, string>
}

export default function App() {
  const [data, setData] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchHealth()
        setData(res)
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e))
      }
    }
    load()
  }, [])

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <h1>Platform Learning App</h1>

      <h2>Backend Health</h2>
      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
      {!error && !data && <p>Loading…</p>}
      {data && (
        <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 8 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}