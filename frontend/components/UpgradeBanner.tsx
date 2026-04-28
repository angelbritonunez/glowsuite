"use client"

import { Lock, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import type { SubscriptionPlan } from "@/types"

const PLAN_LABELS: Record<SubscriptionPlan, string> = {
  free:  "Free",
  basic: "Basic",
  pro:   "Pro",
}

const PLAN_COLORS: Record<SubscriptionPlan, string> = {
  free:  "bg-gray-100 text-gray-500",
  basic: "bg-blue-50 text-blue-600",
  pro:   "bg-[#FFF0F4] text-[#E75480]",
}

export default function UpgradeBanner({ requiredPlan }: { requiredPlan: Exclude<SubscriptionPlan, "free"> }) {
  const router = useRouter()

  if (requiredPlan === "pro") {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#FFF0F4] flex items-center justify-center mb-5">
          <Clock size={24} className="text-[#E75480]" />
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Próximamente
        </h2>

        <p className="text-sm text-gray-400 max-w-sm">
          Esta función estará disponible en el plan{" "}
          <span className={`inline-block text-xs font-semibold rounded-full px-2.5 py-0.5 ${PLAN_COLORS.pro}`}>
            Pro
          </span>
          . Estamos trabajando en ello.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-5">
        <Lock size={24} className="text-gray-400" />
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Función no disponible en tu plan actual
      </h2>

      <p className="text-sm text-gray-400 mb-6 max-w-sm">
        Esta función está disponible a partir del plan{" "}
        <span className={`inline-block text-xs font-semibold rounded-full px-2.5 py-0.5 ${PLAN_COLORS[requiredPlan]}`}>
          {PLAN_LABELS[requiredPlan]}
        </span>
        .
      </p>

      <button
        type="button"
        onClick={() => router.push("/planes")}
        className="bg-[#E75480] text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-[#d04070] transition"
      >
        Ver planes
      </button>
    </div>
  )
}
