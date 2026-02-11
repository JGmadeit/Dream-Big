"use client"

import { forwardRef } from "react"
import type { TimelineEvent } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { motion } from "framer-motion"
import { staggerContainer, staggerItem } from "@/lib/animations"

interface SimulationTimelineProps {
  timeline: TimelineEvent[]
}

export const SimulationTimeline = forwardRef<HTMLDivElement, SimulationTimelineProps>(({ timeline }, ref) => {
  return (
    <motion.div className="space-y-6" variants={staggerContainer} initial="hidden" animate="visible" ref={ref}>
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ rotate: -10, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Clock className="h-5 w-5 text-primary" />
        </motion.div>
        <h3 className="text-xl font-semibold">Journey Timeline</h3>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />
        <motion.div className="space-y-8" variants={staggerContainer}>
          {timeline.map((event, index) => (
            <motion.div key={index} variants={staggerItem} custom={index}>
              <Card className="relative pl-10 border-primary/10 overflow-hidden">
                <motion.div
                  className="absolute left-0 top-6 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium"
                  initial={{ scale: 0, x: -10 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1 * index,
                  }}
                >
                  {index + 1}
                </motion.div>
                <CardHeader className="pb-2 bg-muted/50">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{event.timeframe}</p>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4">{event.description}</p>
                  {event.milestones && event.milestones.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium mb-2">Key Milestones:</h5>
                      <motion.ul
                        className="text-sm space-y-2 pl-1"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        {event.milestones.map((milestone, i) => (
                          <motion.li key={i} className="flex items-start gap-2" variants={staggerItem}>
                            <span className="text-primary mt-0.5">•</span>
                            <span>{milestone}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
})

SimulationTimeline.displayName = "SimulationTimeline"
