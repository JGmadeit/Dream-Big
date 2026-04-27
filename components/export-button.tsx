"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileDown, Loader2 } from "lucide-react"
import { exportToPDF } from "@/lib/pdf-export"
import { toast } from "@/components/ui/use-toast"
import type { SimulationResult } from "@/lib/types"

interface ExportButtonProps {
  results: SimulationResult
  scenario: string
  category: string
  className?: string
}

export function ExportButton({ results, scenario, category, className = "" }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)

    try {
      const success = await exportToPDF(results, scenario, category)

      if (success) {
        toast({
          title: "Export successful",
          description: "Your simulation has been exported to PDF.",
        })
      } else {
        toast({
          title: "Export failed",
          description: "Could not generate PDF. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("PDF export error:", error)
      toast({
        title: "Export failed",
        description: "An error occurred while generating the PDF.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={`flex items-center gap-1 ${className}`}
      onClick={handleExport}
      disabled={isExporting}
    >
      {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
      <span>{isExporting ? "Exporting..." : "Export to PDF"}</span>
    </Button>
  )
}
