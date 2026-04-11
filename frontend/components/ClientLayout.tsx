"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import Navbar from "@/components/Navbar"

export default function ClientLayout({ children }: any) {
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState<string>("consultora")
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return

      const user = session.user
      setUser(user)

      const { data: profile } = await supabase
        .from("profiles")
        .select("role, must_change_password")
        .eq("id", user.id)
        .single()

      setRole(profile?.role || "consultora")

      if (profile?.must_change_password) {
        router.push("/profile?mustChange=1")
      }
    }

    loadUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session?.user) setRole("consultora")
    })

    return () => { subscription.unsubscribe() }
  }, [])

  return (
    <>
      {user && <Navbar role={role} />}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </>
  )
}
