'use client'

import { useSplash } from "@/hooks/useSplash"
import Header from "./Header"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const isSplashVisible = useSplash()

  if (isSplashVisible) return null

  return (
    <>
      <Header />
      {children}
    </>
  )
}