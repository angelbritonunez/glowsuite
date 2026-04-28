import { Metadata } from "next"
import PlanesClient from "./PlanesClient"

export const metadata: Metadata = {
  title: "Planes — GlowSuite CRM",
  robots: { index: false, follow: false },
}

export default function Page() {
  return <PlanesClient />
}
