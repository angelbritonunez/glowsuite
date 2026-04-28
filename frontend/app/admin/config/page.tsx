import { Metadata } from "next"
import AdminConfigClient from "./AdminConfigClient"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function Page() {
  return <AdminConfigClient />
}
