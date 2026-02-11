"use client"

import { forwardRef } from "react"
import type { SimulationResult } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ConfidenceMeter } from "@/components/confidence-meter"
import { CategoryIcon } from "@/components/category-icon"
import { CheckCircle2, AlertTriangle, ArrowRight, Clock, Coins } from "lucide-react"
import { motion } from "framer-motion"
import { staggerContainer, staggerItem } from "@/lib/animations"

interface SimulationResultsProps {
  results: SimulationResult
  category: string
}

export const SimulationResults = forwardRef<HTMLDivElement, SimulationResultsProps>(({ results, category }, ref) => {
  return (
    <motion.div className="space-y-6" variants={staggerContainer} initial="hidden" animate="visible" ref={ref}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <CategoryIcon category={category} className="text-primary" />
          </motion.div>
          <h3 className="text-xl font-semibold">Simulation Summary</h3>
        </div>
        <Badge variant="outline" className="ml-2">
          AI-Generated
        </Badge>
      </div>
      <motion.p className="text-muted-foreground" variants={staggerItem}>
        {results.summary}
      </motion.p>

      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" variants={staggerContainer}>
        <motion.div variants={staggerItem}>
          <Card className="overflow-hidden">
            <CardHeader className="pb-2 bg-muted/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-1 rounded-full bg-background">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                Feasibility
              </CardTitle>
              <CardDescription>Overall likelihood of success</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <motion.span
                  className="text-2xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {results.feasibility}%
                </motion.span>
                <ConfidenceMeter score={results.feasibility} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card className="overflow-hidden">
            <CardHeader className="pb-2 bg-muted/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-1 rounded-full bg-background">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                Time to Achieve
              </CardTitle>
              <CardDescription>Estimated timeline</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <motion.p
                className="text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {results.timeToAchieve}
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card className="overflow-hidden">
            <CardHeader className="pb-2 bg-muted/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-1 rounded-full bg-background">
                  <Coins className="h-4 w-4 text-primary" />
                </div>
                Financial Impact
              </CardTitle>
              <CardDescription>Projected financial change</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <motion.p
                className="text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {results.financialImpact}
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={staggerContainer}>
        <motion.div variants={staggerItem}>
          <Card className="overflow-hidden h-full">
            <CardHeader className="pb-2 bg-muted/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-1 rounded-full bg-background">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
                Key Advantages
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <motion.ul className="space-y-2" variants={staggerContainer} initial="hidden" animate="visible">
                {results.advantages.map((advantage, index) => (
                  <motion.li key={index} className="flex items-start gap-2" variants={staggerItem}>
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{advantage}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card className="overflow-hidden h-full">
            <CardHeader className="pb-2 bg-muted/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-1 rounded-full bg-background">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                </div>
                Potential Challenges
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <motion.ul className="space-y-2" variants={staggerContainer} initial="hidden" animate="visible">
                {results.challenges.map((challenge, index) => (
                  <motion.li key={index} className="flex items-start gap-2" variants={staggerItem}>
                    <span className="text-orange-500 mt-1">!</span>
                    <span>{challenge}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card className="overflow-hidden">
          <CardHeader className="pb-2 bg-muted/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="p-1 rounded-full bg-background">
                <ArrowRight className="h-4 w-4 text-primary" />
              </div>
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <motion.ul
              className="space-y-2 grid md:grid-cols-2 gap-x-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {results.recommendations.map((recommendation, index) => (
                <motion.li key={index} className="flex items-start gap-2" variants={staggerItem}>
                  <span className="text-primary mt-1">→</span>
                  <span>{recommendation}</span>
                </motion.li>
              ))}
            </motion.ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
})

SimulationResults.displayName = "SimulationResults"
