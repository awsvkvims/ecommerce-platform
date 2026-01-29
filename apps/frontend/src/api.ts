export type HealthResponse = {
  status: string
  service: string
  version: string
  timestamp: string
  checks: Record<string, string>
}

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch('/api/health')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return (await res.json()) as HealthResponse
}