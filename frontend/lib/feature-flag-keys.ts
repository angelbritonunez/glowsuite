export const FLAG_KEYS = {
  PLAN_BASIC: "plan_basic_available",
  PLAN_PRO: "plan_pro_available",
} as const

export type FlagKey = (typeof FLAG_KEYS)[keyof typeof FLAG_KEYS]
