"use client"

export function useLemonCheckout() {
  const openCheckout = (checkoutUrl: string, userId: string, userEmail?: string) => {
    const url = new URL(checkoutUrl)
    url.searchParams.set("checkout[custom][user_id]", userId)
    if (userEmail) {
      url.searchParams.set("checkout[email]", userEmail)
    }
    window.open(url.toString(), "_blank")
  }
  return { openCheckout }
}
