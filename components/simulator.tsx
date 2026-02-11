"use client"

import { useState } from "react"
import { SimulationForm } from "@/components/simulation-form"
import { SimulationResults } from "@/components/simulation-results"
import { SimulationTimeline } from "@/components/simulation-timeline"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Clock, BarChart, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WelcomeModal } from "@/components/welcome-modal"
import { ExportButton } from "@/components/export-button"
import { Toaster } from "@/components/ui/toaster"
import type { Scenario, SimulationResult } from "@/lib/types"
import { generateSimulationWithGroq } from "@/lib/actions"
import { motion, AnimatePresence } from "framer-motion"
import { fadeIn, slideUp } from "@/lib/animations"
import confetti from "canvas-confetti"

export function Simulator() {
  const [results, setResults] = useState<SimulationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentCategory, setCurrentCategory] = useState<string>("")
  const [currentScenario, setCurrentScenario] = useState<string>("")
  const [activeTab, setActiveTab] = useState("results")
  const [showHelp, setShowHelp] = useState(false)

  const handleSubmit = async (scenario: Scenario) => {
    setIsLoading(true)
    setError(null)
    setCurrentCategory(scenario.category)
    setCurrentScenario(scenario.scenario)

    try {
      // Use the Groq-powered server action
      const simulationResults = await generateSimulationWithGroq(scenario)
      setResults(simulationResults)

      // Trigger confetti when results are ready
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }, 300)
    } catch (error) {
      console.error("Failed to generate simulation:", error)
      setError("Failed to generate simulation. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div className="space-y-6" initial="hidden" animate="visible" variants={fadeIn}>
      <div className="flex justify-between items-center">
        <div className="flex-1"></div>
        <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => setShowHelp(true)}>
          <HelpCircle className="h-4 w-4" />
          <span>How it works</span>
        </Button>
      </div>

      <SimulationForm onSubmit={handleSubmit} isLoading={isLoading} />

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {results && (
          <motion.div initial="hidden" animate="visible" exit="exit" variants={slideUp}>
            <Card className="border-2 border-primary/10 overflow-hidden">
              <CardContent className="p-0">
                <Tabs defaultValue="results" value={activeTab} onValueChange={setActiveTab}>
                  <div className="flex items-center justify-between px-4 pt-4">
                    <TabsList className="rounded-md">
                      <TabsTrigger value="results" className="rounded-l-md data-[state=active]:bg-primary/10">
                        <BarChart className="h-4 w-4 mr-2" />
                        Results
                      </TabsTrigger>
                      <TabsTrigger value="timeline" className="rounded-r-md data-[state=active]:bg-primary/10">
                        <Clock className="h-4 w-4 mr-2" />
                        Timeline
                      </TabsTrigger>
                    </TabsList>

                    {results && (
                      <ExportButton results={results} scenario={currentScenario} category={currentCategory} />
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TabsContent value="results" className="p-6 m-0">
                        <SimulationResults results={results} category={currentCategory} />
                      </TabsContent>
                      <TabsContent value="timeline" className="p-6 m-0">
                        <SimulationTimeline timeline={results.timeline} />
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {showHelp && <WelcomeModal onClose={() => setShowHelp(false)} />}
      <Toaster />
    </motion.div>
  )
}
