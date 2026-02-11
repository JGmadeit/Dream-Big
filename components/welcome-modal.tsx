"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, ArrowRight, Lightbulb, BarChart2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryIcon } from "@/components/category-icon"

interface WelcomeModalProps {
  onClose: () => void
}

export function WelcomeModal({ onClose }: WelcomeModalProps) {
  const [step, setStep] = useState(1)
  const totalSteps = 4

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onClose()
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
              >
                <Sparkles className="h-16 w-16 text-primary" />
              </motion.div>
            </div>
            <h3 className="text-xl font-bold text-center">Welcome to the Dream Scenario Simulator!</h3>
            <p className="text-center text-muted-foreground">
              Turn your wildest "what if" scenarios into realistic simulations powered by AI.
            </p>
            <p className="text-center">
              This tool helps you explore potential life changes and see how they might realistically unfold.
            </p>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex justify-center">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.5 }}
              >
                <Lightbulb className="h-16 w-16 text-yellow-500" />
              </motion.div>
            </div>
            <h3 className="text-xl font-bold text-center">Step 1: Describe Your Scenario</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <p className="font-medium">Choose a category</p>
                </div>
                <p className="text-sm text-muted-foreground">Select the area of life your scenario relates to</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <p className="font-medium">Describe your dream</p>
                </div>
                <p className="text-sm text-muted-foreground">Tell us what you're wondering about</p>
              </div>
            </div>
            <div className="flex justify-center pt-2">
              <div className="flex gap-2 flex-wrap justify-center">
                {["career", "business", "education", "travel", "lifestyle"].map((category) => (
                  <div key={category} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                    <CategoryIcon category={category} size={16} />
                    <span className="text-xs capitalize">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex justify-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <BarChart2 className="h-16 w-16 text-primary" />
              </motion.div>
            </div>
            <h3 className="text-xl font-bold text-center">Step 2: Review Your Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <p className="font-medium">Feasibility Score</p>
                </div>
                <p className="text-sm text-muted-foreground">See how likely your scenario is to succeed</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <p className="font-medium">Advantages & Challenges</p>
                </div>
                <p className="text-sm text-muted-foreground">Understand the pros and cons</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-muted p-2 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-24 bg-background rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-green-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                  <span className="text-xs">75% Feasible</span>
                </div>
              </div>
            </div>
          </motion.div>
        )
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex justify-center">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.5 }}
              >
                <Clock className="h-16 w-16 text-primary" />
              </motion.div>
            </div>
            <h3 className="text-xl font-bold text-center">Step 3: Explore Your Timeline</h3>
            <p className="text-center text-muted-foreground">
              See how your scenario might unfold over time with a detailed timeline.
            </p>
            <div className="flex justify-center">
              <div className="relative pl-6 border-l-2 border-primary/30 py-2 space-y-3">
                <motion.div
                  className="absolute left-0 top-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  1
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <p className="text-sm font-medium">Research & Planning</p>
                  <p className="text-xs text-muted-foreground">First 3 months</p>
                </motion.div>

                <motion.div
                  className="absolute left-0 top-16 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  2
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                  <p className="text-sm font-medium">Implementation</p>
                  <p className="text-xs text-muted-foreground">Months 3-6</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <Card className="border-2 border-primary/10 overflow-hidden">
            <CardHeader className="bg-muted/50 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={onClose}
                aria-label="Close welcome modal"
              >
                <X className="h-4 w-4" />
              </Button>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Dream Scenario Simulator
              </CardTitle>
              <CardDescription>Quick guide to get you started</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pb-2 min-h-[300px] flex flex-col justify-between">
              <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

              <div className="flex justify-between items-center mt-6">
                <div className="flex gap-1">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-6 rounded-full ${
                        i + 1 === step ? "bg-primary" : "bg-primary/20"
                      } transition-colors`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Step {step} of {totalSteps}
                </p>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 flex justify-between">
              <Button variant="outline" onClick={prevStep} disabled={step === 1}>
                Back
              </Button>
              <Button onClick={nextStep}>
                {step === totalSteps ? "Get Started" : "Next"}
                {step !== totalSteps && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
