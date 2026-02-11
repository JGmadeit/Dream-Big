"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { CategoryIcon } from "@/components/category-icon"
import { ScenarioExamples } from "@/components/scenario-examples"
import { Sparkles } from "lucide-react"
import type { Scenario } from "@/lib/types"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer, staggerItem, pulse } from "@/lib/animations"

const formSchema = z.object({
  scenario: z.string().min(10, {
    message: "Scenario must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  currentSituation: z.string().min(10, {
    message: "Current situation must be at least 10 characters.",
  }),
  timeframe: z.string({
    required_error: "Please select a timeframe.",
  }),
  riskTolerance: z.number().min(1).max(10),
})

interface SimulationFormProps {
  onSubmit: (values: Scenario) => void
  isLoading: boolean
}

export function SimulationForm({ onSubmit, isLoading }: SimulationFormProps) {
  const [sliderValue, setSliderValue] = useState(5)
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scenario: "",
      currentSituation: "",
      riskTolerance: 5,
    },
  })

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values as Scenario)
  }

  function handleExampleSelect(example: string) {
    form.setValue("scenario", example)
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <Card className="border-2 border-primary/10 overflow-hidden">
        <CardHeader className="bg-muted/50">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div animate={pulse}>
              <Sparkles className="h-6 w-6 text-primary" />
            </motion.div>
            <CardTitle>Dream Scenario Simulator</CardTitle>
          </motion.div>
          <CardDescription>
            Tell us about your "what if" scenario and we'll simulate a realistic path forward.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent className="space-y-6 pt-6">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div variants={staggerItem}>
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            setSelectedCategory(value)
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="career" className="flex items-center gap-2">
                              <div className="flex items-center gap-2">
                                <CategoryIcon category="career" size={16} />
                                <span>Career Change</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="business">
                              <div className="flex items-center gap-2">
                                <CategoryIcon category="business" size={16} />
                                <span>Business Venture</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="lifestyle">
                              <div className="flex items-center gap-2">
                                <CategoryIcon category="lifestyle" size={16} />
                                <span>Lifestyle Change</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="education">
                              <div className="flex items-center gap-2">
                                <CategoryIcon category="education" size={16} />
                                <span>Education</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="travel">
                              <div className="flex items-center gap-2">
                                <CategoryIcon category="travel" size={16} />
                                <span>Travel/Relocation</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="other">
                              <div className="flex items-center gap-2">
                                <CategoryIcon category="other" size={16} />
                                <span>Other</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Choose a category to help frame your scenario.</FormDescription>
                        <FormMessage />
                        {selectedCategory && (
                          <ScenarioExamples category={selectedCategory} onSelectExample={handleExampleSelect} />
                        )}
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={staggerItem}>
                  <FormField
                    control={form.control}
                    name="scenario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What's your dream scenario?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="E.g., What if I quit my job to become a professional sandcastle builder?"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Be specific about what you want to achieve.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={staggerItem}>
                    <FormField
                      control={form.control}
                      name="timeframe"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timeframe</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a timeframe" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="6months">6 Months</SelectItem>
                              <SelectItem value="1year">1 Year</SelectItem>
                              <SelectItem value="2years">2 Years</SelectItem>
                              <SelectItem value="5years">5 Years</SelectItem>
                              <SelectItem value="10years">10+ Years</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={staggerItem}>
                    <FormField
                      control={form.control}
                      name="riskTolerance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Risk Tolerance (1-10)</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Slider
                                min={1}
                                max={10}
                                step={1}
                                value={[field.value]}
                                onValueChange={(value) => {
                                  setSliderValue(value[0])
                                  field.onChange(value[0])
                                }}
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Conservative</span>
                                <span className="font-medium">{sliderValue}</span>
                                <span>Adventurous</span>
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>
                            How comfortable are you with uncertainty and potential setbacks?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </div>

                <motion.div variants={staggerItem}>
                  <FormField
                    control={form.control}
                    name="currentSituation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Current Situation</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your current job, skills, financial situation, etc."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>This helps us create a more accurate simulation.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </motion.div>
            </CardContent>
            <CardFooter className="bg-muted/50 flex flex-col gap-2">
              <motion.div
                className="w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      <span>Generating AI Simulation...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span>Simulate My Dream Scenario</span>
                    </div>
                  )}
                </Button>
              </motion.div>
              <p className="text-xs text-center text-muted-foreground">
                Powered by AI to create realistic simulations of your dream scenarios
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </motion.div>
  )
}
