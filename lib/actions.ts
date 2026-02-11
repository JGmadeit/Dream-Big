"use server"

import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import type { Scenario, SimulationResult } from "@/lib/types"

export async function generateSimulationWithGroq(scenario: Scenario): Promise<SimulationResult> {
  try {
    // System prompt to encourage structured JSON output
    const systemPrompt = `You are an expert scenario simulator that analyzes "what if" scenarios and provides realistic projections. 
You ALWAYS respond with valid JSON objects that match the exact structure requested. 
Your responses NEVER include any explanatory text before or after the JSON.`

    // Create a detailed prompt for Groq with stronger JSON formatting instructions
    const prompt = `
Analyze this "what if" scenario and provide a realistic projection:

SCENARIO DETAILS:
- Dream Scenario: ${scenario.scenario}
- Category: ${scenario.category}
- Current Situation: ${scenario.currentSituation}
- Timeframe: ${scenario.timeframe}
- Risk Tolerance (1-10): ${scenario.riskTolerance}

Respond ONLY with a JSON object using this EXACT structure:

{
  "summary": "A 2-3 sentence overview of the simulation results",
  "feasibility": 75,
  "timeToAchieve": "Estimated time to achieve the goal (e.g., '1-2 years')",
  "financialImpact": "Description of the financial implications",
  "advantages": [
    "First advantage",
    "Second advantage",
    "Third advantage",
    "Fourth advantage",
    "Fifth advantage"
  ],
  "challenges": [
    "First challenge",
    "Second challenge",
    "Third challenge",
    "Fourth challenge",
    "Fifth challenge"
  ],
  "recommendations": [
    "First recommendation",
    "Second recommendation",
    "Third recommendation",
    "Fourth recommendation",
    "Fifth recommendation",
    "Sixth recommendation"
  ],
  "timeline": [
    {
      "title": "Phase 1 Title",
      "timeframe": "Timeframe for this phase",
      "description": "Description of what happens in this phase",
      "milestones": [
        "First milestone",
        "Second milestone",
        "Third milestone"
      ]
    },
    {
      "title": "Phase 2 Title",
      "timeframe": "Timeframe for this phase",
      "description": "Description of what happens in this phase",
      "milestones": [
        "First milestone",
        "Second milestone",
        "Third milestone"
      ]
    }
  ]
}

Make your simulation realistic, data-informed, and tailored to the specific scenario. Consider market trends, skill development time, financial implications, and practical challenges.

IMPORTANT: Your response must be ONLY the JSON object with no additional text or explanation.
`

    console.log("Sending request to Groq API...")

    // Generate the simulation using Groq with a model that's definitely available
    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"), // Using the 8B model which is available
      prompt,
      system: systemPrompt,
      temperature: 0.3, // Lower temperature for more deterministic outputs
      maxTokens: 2048,
    })

    console.log("Received response from Groq API")

    // Parse the JSON response with improved error handling
    try {
      // Try to extract JSON from the response if it's not pure JSON
      // First, try to find JSON between curly braces
      let jsonString = text

      // Look for the first { and the last }
      const firstBrace = text.indexOf("{")
      const lastBrace = text.lastIndexOf("}")

      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        jsonString = text.substring(firstBrace, lastBrace + 1)
        console.log("Extracted JSON from response")
      } else {
        console.log("Could not extract JSON, using full response")
      }

      console.log("Attempting to parse JSON response")

      const parsedResponse = JSON.parse(jsonString)
      console.log("Successfully parsed JSON")

      // Create a valid simulation result with fallbacks for missing fields
      const simulationResult: SimulationResult = {
        summary:
          parsedResponse.summary ||
          `Your scenario "${scenario.scenario}" has been analyzed based on your current situation.`,
        feasibility:
          typeof parsedResponse.feasibility === "number"
            ? parsedResponse.feasibility
            : Number.parseInt(parsedResponse.feasibility) || scenario.riskTolerance * 10,
        timeToAchieve: parsedResponse.timeToAchieve || "1-3 years",
        financialImpact: parsedResponse.financialImpact || "Variable impact depending on execution",
        advantages:
          Array.isArray(parsedResponse.advantages) && parsedResponse.advantages.length > 0
            ? parsedResponse.advantages
            : [
                "Personal growth opportunity",
                "Potential for new skills development",
                "Possible increased satisfaction",
                "New networking opportunities",
                "Breaking out of comfort zone",
              ],
        challenges:
          Array.isArray(parsedResponse.challenges) && parsedResponse.challenges.length > 0
            ? parsedResponse.challenges
            : [
                "Initial adjustment period",
                "Potential financial uncertainty",
                "Learning curve",
                "Need for new skills",
                "Possible resistance from others",
              ],
        recommendations:
          Array.isArray(parsedResponse.recommendations) && parsedResponse.recommendations.length > 0
            ? parsedResponse.recommendations
            : [
                "Create a detailed action plan",
                "Build a financial safety net",
                "Connect with others in similar paths",
                "Start with small steps",
                "Develop a fallback plan",
              ],
        timeline:
          Array.isArray(parsedResponse.timeline) && parsedResponse.timeline.length > 0
            ? parsedResponse.timeline.map((event) => ({
                title: event.title || "Phase",
                timeframe: event.timeframe || "TBD",
                description: event.description || "Details to be determined.",
                milestones: Array.isArray(event.milestones)
                  ? event.milestones
                  : ["Plan next steps", "Evaluate progress"],
              }))
            : [
                {
                  title: "Research & Planning",
                  timeframe: "First 3 months",
                  description: "Gather information and create a detailed plan.",
                  milestones: ["Complete research", "Create action plan", "Identify resources needed"],
                },
                {
                  title: "Preparation",
                  timeframe: "Months 3-6",
                  description: "Develop necessary skills and prepare for transition.",
                  milestones: ["Acquire initial skills", "Build network", "Prepare resources"],
                },
                {
                  title: "Initial Implementation",
                  timeframe: "Months 6-12",
                  description: "Begin implementing your plan with first concrete steps.",
                  milestones: ["Take first major step", "Evaluate initial progress", "Make adjustments as needed"],
                },
                {
                  title: "Growth & Stabilization",
                  timeframe: "Year 2",
                  description: "Expand efforts and establish stability.",
                  milestones: ["Reach sustainable level", "Develop consistent systems", "Expand reach"],
                },
                {
                  title: "Mastery",
                  timeframe: "Years 3+",
                  description: "Achieve expertise and optimize for long-term success.",
                  milestones: ["Reach expert level", "Establish reputation", "Achieve target goals"],
                },
              ],
      }

      return simulationResult
    } catch (parseError) {
      console.error("Failed to parse Groq response:", parseError)
      console.error("Raw response:", text)
      // Fall back to the mock simulation if parsing fails
      return fallbackSimulation(scenario)
    }
  } catch (error) {
    console.error("Error generating simulation with Groq:", error)
    // Fall back to the mock simulation if the API call fails
    return fallbackSimulation(scenario)
  }
}

// Fallback simulation in case the Groq API call fails
function fallbackSimulation(scenario: Scenario): SimulationResult {
  const riskFactor = scenario.riskTolerance / 10
  const feasibility = Math.round(50 + riskFactor * 20)

  return {
    summary: `Your scenario "${scenario.scenario}" has been analyzed based on your current situation. This is a fallback simulation as we couldn't process the AI response correctly.`,
    feasibility: feasibility,
    timeToAchieve: "1-3 years",
    financialImpact: "Variable impact depending on execution",
    advantages: [
      "Personal growth opportunity",
      "Potential for new skills development",
      "Possible increased satisfaction",
      "New networking opportunities",
      "Breaking out of comfort zone",
    ],
    challenges: [
      "Initial adjustment period",
      "Potential financial uncertainty",
      "Learning curve",
      "Need for new skills",
      "Possible resistance from others",
    ],
    recommendations: [
      "Create a detailed action plan",
      "Build a financial safety net",
      "Connect with others in similar paths",
      "Start with small steps",
      "Develop a fallback plan",
    ],
    timeline: [
      {
        title: "Research & Planning",
        timeframe: "First 3 months",
        description: "Gather information and create a detailed plan.",
        milestones: ["Complete research", "Create action plan", "Identify resources needed"],
      },
      {
        title: "Preparation",
        timeframe: "Months 3-6",
        description: "Develop necessary skills and prepare for transition.",
        milestones: ["Acquire initial skills", "Build network", "Prepare resources"],
      },
      {
        title: "Initial Implementation",
        timeframe: "Months 6-12",
        description: "Begin implementing your plan with first concrete steps.",
        milestones: ["Take first major step", "Evaluate initial progress", "Make adjustments as needed"],
      },
      {
        title: "Growth & Stabilization",
        timeframe: "Year 2",
        description: "Expand efforts and establish stability.",
        milestones: ["Reach sustainable level", "Develop consistent systems", "Expand reach"],
      },
      {
        title: "Mastery",
        timeframe: "Years 3+",
        description: "Achieve expertise and optimize for long-term success.",
        milestones: ["Reach expert level", "Establish reputation", "Achieve target goals"],
      },
    ],
  }
}
