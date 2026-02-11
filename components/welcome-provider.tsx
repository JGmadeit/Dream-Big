"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { WelcomeModal } from "@/components/welcome-modal"

export function WelcomeProvider({ children }: { children: React.ReactNode }) {
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    // Check if the user has seen the welcome modal before
    const hasSeenWelcome = localStorage.getItem("dreamSimulator_hasSeenWelcome")

    if (!hasSeenWelcome) {
      // Show the welcome modal after a short delay
      const timer = setTimeout(() => {
        setShowWelcome(true)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleCloseWelcome = () => {
    setShowWelcome(false)
    // Save that the user has seen the welcome modal
    localStorage.setItem("dreamSimulator_hasSeenWelcome", "true")
  }

  return (
    <>
      {children}
      {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}
    </>
  )
}
