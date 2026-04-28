"use client"

import { useEffect, useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export function useFeatureFlags() {
  const [flags, setFlags] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/feature-flags`)
      .then((r) => r.json())
      .then((data: Record<string, boolean>) => setFlags(data))
      .catch(() => setFlags({}))
      .finally(() => setLoading(false))
  }, [])

  const isEnabled = (key: string): boolean => {
    if (loading) return false
    return key in flags ? flags[key] : true
  }

  return { flags, loading, isEnabled }
}
