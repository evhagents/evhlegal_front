"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Palette } from "lucide-react"

const themes = [
  { name: "Default", value: "default" },
  { name: "Garden", value: "garden" },
  { name: "Daily UI", value: "dailyui" },
]

export function ThemeChanger() {
  const [currentTheme, setCurrentTheme] = useState("default")

  useEffect(() => {
    // Get the current theme from localStorage or default
    const savedTheme = localStorage.getItem("theme") || "default"
    setCurrentTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (theme: string) => {
    const html = document.documentElement

    // Remove existing theme attributes
    html.removeAttribute("data-theme")

    // Apply new theme
    if (theme !== "default") {
      html.setAttribute("data-theme", theme)
    }

    // Save to localStorage
    localStorage.setItem("theme", theme)
    setCurrentTheme(theme)
  }

  const handleThemeChange = (theme: string) => {
    applyTheme(theme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => handleThemeChange(theme.value)}
            className={`cursor-pointer ${currentTheme === theme.value ? "bg-primary/10 text-primary" : ""}`}
          >
            {theme.name}
            {currentTheme === theme.value && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
