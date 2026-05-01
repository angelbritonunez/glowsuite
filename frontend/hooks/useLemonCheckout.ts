"use client"

export function useLemonCheckout() {
  const openCheckout = (variantId: string, userId: string, userEmail?: string) => {
    const url = new URL(`https://glowsuitecrm.lemonsqueezy.com/checkout/buy/${variantId}`)
    url.searchParams.set("checkout[custom][user_id]", userId)
    if (userEmail) {
      url.searchParams.set("checkout[email]", userEmail)
    }
    if (typeof window !== "undefined" && (window as any).LemonSqueezy) {
      (window as any).LemonSqueezy.Url.Open(url.toString())
    } else {
      window.open(url.toString(), "_blank")
    }
  }

  return { openCheckout }
}
