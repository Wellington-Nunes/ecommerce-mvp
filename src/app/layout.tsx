import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { FiltersProvider } from "@/contexts/FiltersContext"
import { SplashScreen } from "@/components/layout/SplashScreen"
import { LayoutWrapper } from "@/components/layout/LayoutWrapper"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ECOMMERCE-MVP",
  description: "Uma aplicação moderna de e-commerce construída com Next.js",
  keywords: "e-commerce, produtos, compras online",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className={`${inter.variable} bg-gray-50`}>
        <FiltersProvider>
          <SplashScreen />
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </FiltersProvider>
      </body>
    </html>
  )
}