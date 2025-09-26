import type React from "react"
import type { Metadata } from "next"
import { Libre_Baskerville } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { GlobalNavigation } from "@/components/global-navigation"
import "./globals.css"

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
})

export const metadata: Metadata = {
  title: "EVH Legal Agent - Internal Dashboard",
  description: "Entity compliance risk and document intelligence dashboard",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-serif ${libreBaskerville.variable} antialiased`}>
        <div className="min-h-screen bg-background">
          <div className="flex">
            <GlobalNavigation />

            <main className="flex-1 ml-64 transition-all duration-300">
              <Suspense>
                {children}
                <Analytics />
              </Suspense>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
