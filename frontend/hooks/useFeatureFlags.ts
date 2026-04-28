"use client"

import { useEffect, useState, useRef } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

let _cache: Record<string, boolean> | null = null

export function useFeatureFlags() {
  const [flags, setFlags] = useState<Record<string, boolean>>(_cache ?? {})
  const [loading, setLoading] = useState(_cache === null)
  const fetched = useRef(_cache !== null)

  useEffect(() => {
    if (fetched.current) return
    fetched.current = true

    fetch(`${API_URL}/feature-flags`)
      .then((r) => r.json())
      .then((data: Record<string, boolean>) => {
        _cache = data
        setFlags(data)
      })
      .catch(() => {
        // On error all flags default to true so checkout is not accidentally blocked
        _cache = {}
        setFlags({})
      })
      .finally(() => setLoading(false))
  }, [])

  const isEnabled = (key: string): boolean => {
    if (loading) return false
    // Unknown flags default to true (fail open)
    return key in flags ? flags[key] : true
  }

  return { flags, loading, isEnabled }
}
