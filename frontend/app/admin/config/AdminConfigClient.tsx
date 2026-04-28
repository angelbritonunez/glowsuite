"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { getFeatureFlagsDetail, patchFeatureFlag } from "@/lib/api"

interface FeatureFlag {
  key: string
  enabled: boolean
  updated_at: string
  description: string
}

function fmtDate(iso: string | null): string {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("es-DO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function AdminConfigClient() {
  const router = useRouter()
  const [flags, setFlags] = useState<FeatureFlag[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }, [])

  useEffect(() => {
    const init = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) { router.push("/login"); return }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single()

      if (profile?.role !== "admin") { router.push("/admin/dashboard"); return }

      try {
        const data = await getFeatureFlagsDetail()
        setFlags(data)
      } catch {
        // show empty state
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [router])

  const handleToggle = async (key: string, currentEnabled: boolean) => {
    const newEnabled = !currentEnabled
    setFlags((prev) =>
      prev.map((f) => f.key === key ? { ...f, enabled: newEnabled, updated_at: new Date().toISOString() } : f)
    )
    try {
      await patchFeatureFlag(key, newEnabled)
      const label = flags.find((f) => f.key === key)?.description ?? key
      showToast(`${label}: ${newEnabled ? "activado" : "desactivado"}`)
    } catch {
      setFlags((prev) =>
        prev.map((f) => f.key === key ? { ...f, enabled: currentEnabled } : f)
      )
      showToast("Error al actualizar")
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      <div>
        <h1 className="text-xl font-semibold text-gray-900 tracking-tight">Configuración</h1>
        <p className="text-sm text-gray-400 mt-0.5">Ajustes globales de la plataforma</p>
      </div>

      {/* ── Feature Flags ── */}
      <section className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-50 px-5 py-4">
          <span className="text-sm font-semibold text-gray-800">Feature Flags</span>
          <p className="text-xs text-gray-400 mt-0.5">
            Activa o desactiva funciones sin necesidad de un deploy
          </p>
        </div>

        {loading ? (
          <div className="divide-y divide-gray-50">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5 gap-4 animate-pulse">
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 bg-gray-100 rounded w-48" />
                  <div className="h-3 bg-gray-100 rounded w-32" />
                </div>
                <div className="h-3 bg-gray-100 rounded w-24 hidden sm:block" />
                <div className="h-6 w-11 bg-gray-100 rounded-full" />
              </div>
            ))}
          </div>
        ) : flags.length === 0 ? (
          <p className="text-center py-10 text-sm text-gray-400">
            No hay flags configurados.
          </p>
        ) : (
          <div className="divide-y divide-gray-50">
            {flags.map((flag) => (
              <div key={flag.key} className="flex items-center justify-between px-5 py-3.5 gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{flag.description}</p>
                  <p className="text-xs text-gray-400 mt-0.5 font-mono">{flag.key}</p>
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap hidden sm:block">
                  {fmtDate(flag.updated_at)}
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={flag.enabled}
                  onClick={() => handleToggle(flag.key, flag.enabled)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E75480] focus-visible:ring-offset-2 ${
                    flag.enabled ? "bg-[#E75480]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
                      flag.enabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-5 py-2.5 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  )
}
