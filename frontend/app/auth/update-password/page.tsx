"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Lock, Eye, EyeOff, Sparkles, CheckCircle } from "lucide-react"
import AuthCard from "@/components/ui/AuthCard"
import AuthInput from "@/components/ui/AuthInput"
import AuthButton from "@/components/ui/AuthButton"

export default function UpdatePasswordPage() {
  const supabase = createClient()
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Supabase lee el token del hash fragment automáticamente al cargar
    supabase.auth.getSession()
  }, [supabase])

  const handleUpdate = async () => {
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.")
      return
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.")
      return
    }

    setLoading(true)
    setError("")
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) {
      const msg = error.message.toLowerCase()
      if (msg.includes("different from the old password")) {
        setError("La nueva contraseña debe ser diferente a la anterior.")
      } else if (msg.includes("at least")) {
        setError("La contraseña debe tener al menos 6 caracteres.")
      } else {
        setError("Ocurrió un error. Intenta de nuevo.")
      }
    } else {
      setDone(true)
      setTimeout(() => router.push("/login"), 3000)
    }
  }

  return (
    <AuthCard
      icon={<Sparkles size={32} color="white" />}
      title="GlowSuite CRM"
      subtitle="Tu negocio, organizado."
      caption="Para vendedoras independientes"
    >
      <div className="w-full max-w-sm mx-auto flex flex-col gap-5">
        {done ? (
          <div className="flex flex-col items-center gap-4 text-center py-4">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle size={28} className="text-green-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">¡Contraseña actualizada!</h2>
              <p className="text-sm text-gray-500 mt-2">Redirigiendo al inicio de sesión...</p>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Nueva contraseña</h2>
              <p className="text-sm text-gray-500 mt-1 mb-6">Elige una contraseña segura para tu cuenta</p>
            </div>

            <AuthInput
              label="Nueva contraseña"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              leftIcon={<Lock size={16} />}
              rightIcon={
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </span>
              }
            />

            <AuthInput
              label="Confirmar contraseña"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirm}
              onChange={setConfirm}
              leftIcon={<Lock size={16} />}
            />

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <AuthButton onClick={handleUpdate} loading={loading}>
              Actualizar contraseña
            </AuthButton>
          </>
        )}
      </div>
    </AuthCard>
  )
}
