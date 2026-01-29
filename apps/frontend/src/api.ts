export type HealthResponse = {
  status: string
  service: string
  version: string
  timestamp: string
  checks: Record<string, string>
}

export async function fetchReadiness(): Promise<HealthResponse> {
  const res = await fetch('/api/health/ready')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return (await res.json()) as HealthResponse
}