const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    })

    if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        throw new Error(error.message || `API Error: ${res.status}`)
    }

    return res.json()
}

export async function healthCheck() {
    return fetchAPI('/health')
}
