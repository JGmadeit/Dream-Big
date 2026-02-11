export interface Scenario {
  scenario: string
  category: string
  currentSituation: string
  timeframe: string
  riskTolerance: number
}

export interface TimelineEvent {
  title: string
  timeframe: string
  description: string
  milestones?: string[]
}

export interface SimulationResult {
  summary: string
  feasibility: number
  timeToAchieve: string
  financialImpact: string
  advantages: string[]
  challenges: string[]
  recommendations: string[]
  timeline: TimelineEvent[]
}
