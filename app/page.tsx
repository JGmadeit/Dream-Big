import { Simulator } from "@/components/simulator"
import { WelcomeProvider } from "@/components/welcome-provider"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <WelcomeProvider>
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Dream Scenario Simulator</h1>
            <p className="text-xl text-muted-foreground">
              Turn your wildest "what if" scenarios into realistic simulations
            </p>
            <p className="text-sm text-muted-foreground">Powered by Groq AI</p>
          </div>
          <Simulator />
        </div>
      </WelcomeProvider>
    </main>
  )
}
