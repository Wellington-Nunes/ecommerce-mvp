import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css";
import Header from "./layout/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "E-commerce MVP",
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
      <body
        className={inter.variable}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
