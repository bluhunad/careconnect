'use client'

import { useState } from 'react'
import type { ApiResult } from '@/lib/schemas'

export function useAiRequest<T>(endpoint: string) {
  const [result, setResult] = useState<ApiResult<T> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function submit(text: string) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const body = await res.json()
      if (!res.ok) {
        setError(body.error ?? 'Something went wrong. Please try again.')
        return
      }
      setResult(body as ApiResult<T>)
    } catch {
      setError('Could not reach the server. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setResult(null)
    setError(null)
  }

  return { result, error, loading, submit, reset }
}
