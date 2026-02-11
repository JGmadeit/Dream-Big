"use client"

import { motion } from "framer-motion"

interface ConfidenceMeterProps {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export function ConfidenceMeter({ score, size = "md", showLabel = true }: ConfidenceMeterProps) {
  const getColor = () => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-emerald-500"
    if (score >= 40) return "bg-yellow-500"
    if (score >= 20) return "bg-orange-500"
    return "bg-red-500"
  }

  const getLabel = () => {
    if (score >= 80) return "Highly Feasible"
    if (score >= 60) return "Feasible"
    if (score >= 40) return "Challenging"
    if (score >= 20) return "Difficult"
    return "Very Difficult"
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-2 w-24"
      case "lg":
        return "h-4 w-48"
      default:
        return "h-3 w-36"
    }
  }

  return (
    <div className="space-y-1">
      <div className={`bg-muted rounded-full overflow-hidden ${getSizeClasses()}`}>
        <motion.div
          className={`h-full rounded-full ${getColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
        />
      </div>
      {showLabel && (
        <motion.p
          className="text-xs font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {getLabel()}
        </motion.p>
      )}
    </div>
  )
}
