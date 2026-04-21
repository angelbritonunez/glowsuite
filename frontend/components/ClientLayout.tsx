"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"
import { useAuth } from "@/hooks/useAuth"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, role } = useAuth()
  const pathname = usePathname()

  const publicPages = ["/", "/terminos", "/privacidad", "/ayuda"]
  const authPages = ["/login", "/register", "/auth/confirmed", "/auth/update-password"]
  if (publicPages.includes(pathname) || authPages.includes(pathname)) {
    return <>{children}</>
  }

  return (
    <>
      {user && <Navbar role={role} />}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {children}
      </main>
    </>
  )
}
