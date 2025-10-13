export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"

export async function apiFetch(path: string, init: RequestInit = {}, token?: string) {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers || {}),
    },
  })

  if (!res.ok) {
    const message = await res.text().catch(() => "Request failed")
    throw new Error(message || `Request failed: ${res.status}`)
  }

  return res
}


