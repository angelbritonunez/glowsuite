"use client"

import { Suspense } from "react"
import NewSaleContent from "./NewSaleContent"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Cargando...</div>}>
      <NewSaleContent />
    </Suspense>
  )
}