import { ReactNode } from "react"

interface AuthCardProps {
  subtitle: string
  caption: string
  children: ReactNode
  // legacy — ignored, kept for backward compat during transition
  icon?: ReactNode
  title?: string
}

export default function AuthCard({ subtitle, caption, children }: AuthCardProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left column — hidden on mobile */}
      <div
        className="hidden md:flex flex-col items-center justify-center gap-6 text-white px-10"
        style={{ width: "38%", backgroundColor: "#E75480" }}
      >
        <img
          src="/logos/glowsuite-crm-horizontal-white.svg"
          alt="GlowSuite CRM"
          height={52}
          style={{ height: 52, width: "auto" }}
        />
        <p className="text-lg font-medium opacity-90">{subtitle}</p>
        <p className="text-sm opacity-70">{caption}</p>
      </div>

      {/* Right column */}
      <div className="flex-1 flex flex-col justify-center bg-white p-10">
        {children}
      </div>
    </div>
  )
}
