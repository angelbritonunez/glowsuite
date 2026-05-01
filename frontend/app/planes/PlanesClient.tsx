"use client"

import { Check, Clock } from "lucide-react"
import { usePlan } from "@/hooks/usePlan"
import { usePaddleCheckout } from "@/hooks/usePaddleCheckout"
import { useLemonCheckout } from "@/hooks/useLemonCheckout"
import { useFeatureFlags } from "@/hooks/useFeatureFlags"
import { FLAG_KEYS } from "@/lib/feature-flag-keys"
import { createClient } from "@/lib/supabase"
import type { SubscriptionPlan } from "@/types"

interface PlanDef {
  id: SubscriptionPlan
  name: string
  price: string
  period: string
  features: string[]
  priceEnvKey: string | null
  popular: boolean
}

const PLANS: PlanDef[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "para siempre",
    features: [
      "Clientes y ventas",
      "Seguimientos 2+2+2",
      "Dashboard básico",
      "Metas de negocio",
    ],
    priceEnvKey: null,
    popular: false,
  },
  {
    id: "basic",
    name: "Basic",
    price: "$9",
    period: "por mes",
    features: [
      "Todo lo de Free",
      "Crédito y cobros",
      "Ganancias netas",
      "Workspace unificado",
    ],
    priceEnvKey: "NEXT_PUBLIC_PADDLE_PRICE_BASIC",
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    period: "por mes",
    features: [
      "Todo lo de Basic",
      "Métricas avanzadas",
      "WhatsApp automático",
      "Link de registro",
      "Agenda (próximamente)",
    ],
    priceEnvKey: "NEXT_PUBLIC_PADDLE_PRICE_PRO",
    popular: false,
  },
]

const PLAN_BADGE: Record<SubscriptionPlan, string> = {
  free:  "bg-gray-100 text-gray-500",
  basic: "bg-blue-50 text-blue-600",
  pro:   "bg-[#FFF0F4] text-[#E75480]",
}

const LS_CHECKOUT_BASIC = process.env.NEXT_PUBLIC_LS_CHECKOUT_BASIC
const LS_CHECKOUT_PRO   = process.env.NEXT_PUBLIC_LS_CHECKOUT_PRO
const USE_LEMON = !!(LS_CHECKOUT_BASIC || LS_CHECKOUT_PRO)

function getPaddlePriceId(planId: SubscriptionPlan): string | undefined {
  if (planId === "basic") return process.env.NEXT_PUBLIC_PADDLE_PRICE_BASIC
  if (planId === "pro")   return process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO
  return undefined
}

function getLsCheckoutUrl(planId: SubscriptionPlan): string | undefined {
  if (planId === "basic") return LS_CHECKOUT_BASIC
  if (planId === "pro")   return LS_CHECKOUT_PRO
  return undefined
}

export default function PlanesClient() {
  const { plan: currentPlan, loading } = usePlan()
  const { openCheckout: openPaddleCheckout } = usePaddleCheckout()
  const { openCheckout: openLemonCheckout } = useLemonCheckout()
  const { isEnabled, loading: flagsLoading } = useFeatureFlags()

  async function handleCheckout(planId: SubscriptionPlan) {
    if (USE_LEMON) {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const checkoutUrl = getLsCheckoutUrl(planId)
      if (checkoutUrl) openLemonCheckout(checkoutUrl, user.id, user.email ?? undefined)
    } else {
      const priceId = getPaddlePriceId(planId)
      if (priceId) openPaddleCheckout(priceId)
    }
  }

  function isPlanAvailable(planId: SubscriptionPlan): boolean {
    if (planId === "basic") return isEnabled(FLAG_KEYS.PLAN_BASIC)
    if (planId === "pro") return isEnabled(FLAG_KEYS.PLAN_PRO)
    return true
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[#1A1A2E] tracking-tight">
          Planes y precios
        </h1>
        <p className="text-sm text-gray-400 mt-1.5">
          Elige el plan que mejor se adapta a tu negocio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PLANS.map((p) => {
          const isCurrent   = currentPlan === p.id
          const isPopular   = p.popular
          const planEnabled = isPlanAvailable(p.id as SubscriptionPlan)

          return (
            <div
              key={p.id}
              className={`relative bg-white rounded-2xl border overflow-hidden flex flex-col transition ${
                isPopular
                  ? "border-[#E75480] shadow-md shadow-[#E75480]/10"
                  : "border-gray-100"
              } ${isCurrent ? "ring-2 ring-[#E75480]/20" : ""}`}
            >
              {isPopular && (
                <div className="bg-[#E75480] text-white text-[11px] font-bold tracking-wider uppercase text-center py-1.5 px-4">
                  Más popular
                </div>
              )}

              <div className="px-6 pt-6 pb-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${PLAN_BADGE[p.id]}`}>
                    {p.name}
                  </span>
                  {isCurrent && !loading && (
                    <span className="text-[10px] font-semibold bg-[#FFF0F4] text-[#E75480] rounded-full px-2 py-0.5">
                      Tu plan actual
                    </span>
                  )}
                </div>

                <div className="mt-4 mb-5">
                  <span className="text-3xl font-bold text-[#1A1A2E]">{p.price}</span>
                  <span className="text-sm text-gray-400 ml-1.5">{p.period}</span>
                </div>

                <ul className="space-y-2.5 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check size={14} className="text-[#E75480] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  {p.id === "free" || isCurrent ? (
                    <button
                      disabled
                      className="w-full rounded-xl py-2.5 text-sm font-semibold bg-gray-100 text-gray-400 cursor-not-allowed"
                    >
                      {isCurrent ? "Plan actual" : "Gratis siempre"}
                    </button>
                  ) : flagsLoading ? (
                    <div className="w-full rounded-xl py-2.5 bg-gray-100 animate-pulse h-10" />
                  ) : !planEnabled ? (
                    <button
                      disabled
                      className="w-full rounded-xl py-2.5 text-sm font-semibold bg-gray-100 text-gray-400 cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Clock size={14} />
                      Próximamente
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCheckout(p.id as SubscriptionPlan)}
                      disabled={loading}
                      className={`w-full rounded-xl py-2.5 text-sm font-semibold transition ${
                        isPopular
                          ? "bg-[#E75480] text-white hover:bg-[#d04070] disabled:bg-[#E75480]/40"
                          : "bg-[#1A1A2E] text-white hover:bg-[#2a2a4e] disabled:bg-gray-300"
                      } disabled:cursor-not-allowed`}
                    >
                      Elegir {p.name}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-center text-xs text-gray-300 mt-8">
        Los precios están en USD. Puedes cancelar en cualquier momento.
      </p>
    </div>
  )
}
