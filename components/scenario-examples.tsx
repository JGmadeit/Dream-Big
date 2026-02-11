"use client"

import { Button } from "@/components/ui/button"
import { CategoryIcon } from "@/components/category-icon"
import { motion } from "framer-motion"
import { staggerContainer, staggerItem } from "@/lib/animations"

interface ScenarioExamplesProps {
  category: string
  onSelectExample: (example: string) => void
}

const examples = {
  career: [
    "What if I quit my corporate job to become a professional photographer?",
    "What if I transition from marketing to software development?",
    "What if I take a sabbatical year to explore different career paths?",
  ],
  business: [
    "What if I start a food truck business in my city?",
    "What if I launch an online course teaching my hobby skills?",
    "What if I open a coworking space in my neighborhood?",
  ],
  education: [
    "What if I go back to school for a master's degree in a different field?",
    "What if I learn a new language and move to a country where it's spoken?",
    "What if I take a year off to focus on self-education and skill building?",
  ],
  travel: [
    "What if I become a digital nomad and travel while working remotely?",
    "What if I move to a different country for a year?",
    "What if I sell my house and live in an RV traveling across the country?",
  ],
  lifestyle: [
    "What if I downsize to a tiny house and embrace minimalism?",
    "What if I move from the city to a rural homestead?",
    "What if I adopt a zero-waste lifestyle and start a sustainability blog?",
  ],
  other: [
    "What if I dedicate a year to volunteering for different causes?",
    "What if I pursue my childhood dream that I never followed?",
    "What if I completely reinvent myself at this stage in my life?",
  ],
}

export function ScenarioExamples({ category, onSelectExample }: ScenarioExamplesProps) {
  if (!category) return null

  const categoryExamples = examples[category as keyof typeof examples] || examples.other

  return (
    <motion.div
      className="mt-2 space-y-2"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-sm text-muted-foreground">Need inspiration? Try one of these:</p>
      <motion.div className="flex flex-wrap gap-2" variants={staggerContainer} initial="hidden" animate="visible">
        {categoryExamples.map((example, index) => (
          <motion.div key={index} variants={staggerItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="text-xs text-left justify-start h-auto py-1 px-2"
              onClick={() => onSelectExample(example)}
            >
              <CategoryIcon category={category} size={14} className="mr-1 flex-shrink-0" />
              <span className="truncate">{example}</span>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
