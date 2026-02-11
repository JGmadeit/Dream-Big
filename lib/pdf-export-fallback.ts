import type { SimulationResult } from "@/lib/types"
import { jsPDF } from "jspdf"
import "jspdf-autotable"

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export async function exportToPDF(results: SimulationResult, scenario: string, category: string): Promise<boolean> {
  try {
    // Create a new PDF document
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // Set document properties
    pdf.setProperties({
      title: "Dream Scenario Simulation",
      subject: scenario,
      author: "Dream Scenario Simulator",
      keywords: "simulation, AI, scenario",
      creator: "Dream Scenario Simulator",
    })

    // Helper function to add wrapped text
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const lines = pdf.splitTextToSize(text, maxWidth)
      pdf.text(lines, x, y)
      return y + lineHeight * lines.length
    }

    // Create header
    pdf.setFillColor(0, 0, 0) // Black
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 40, "F")

    // Add title
    pdf.setFontSize(24)
    pdf.setTextColor(255, 255, 255) // White
    pdf.text("Dream Scenario Simulation", 105, 20, { align: "center" })

    // Add scenario
    pdf.setFontSize(14)
    pdf.setTextColor(255, 255, 255) // White
    let y = 30
    y = addWrappedText(scenario, 105, y, 180, 7) + 5

    // Add date
    pdf.setFontSize(10)
    pdf.setTextColor(200, 200, 200) // Light gray
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 105, y, { align: "center" })
    y += 15

    // Add summary section
    pdf.setFontSize(18)
    pdf.setTextColor(0, 0, 0) // Black
    pdf.text("Summary", 20, y)
    y += 2

    // Add underline for section header
    pdf.setDrawColor(0, 0, 0) // Black
    pdf.setLineWidth(0.5)
    pdf.line(20, y, 190, y)
    y += 8

    // Add summary box
    pdf.setDrawColor(0, 0, 0) // Black
    pdf.rect(20, y, 170, 25, "S")

    pdf.setFontSize(12)
    pdf.setTextColor(0, 0, 0) // Black
    y = addWrappedText(results.summary, 25, y + 5, 160, 6) + 10

    // Add key metrics section
    pdf.setFontSize(18)
    pdf.setTextColor(0, 0, 0) // Black
    pdf.text("Key Metrics", 20, y)
    y += 2

    // Add underline for section header
    pdf.setDrawColor(0, 0, 0) // Black
    pdf.setLineWidth(0.5)
    pdf.line(20, y, 190, y)
    y += 8

    // Create metrics table
    pdf.autoTable({
      startY: y,
      head: [["Feasibility", "Time to Achieve", "Financial Impact"]],
      body: [[`${results.feasibility}%`, results.timeToAchieve, results.financialImpact]],
      theme: "grid",
      styles: {
        fontSize: 12,
        cellPadding: 8,
        lineColor: [0, 0, 0],
        lineWidth: 0.5,
      },
      headStyles: {
        fillColor: [249, 249, 249],
        textColor: [0, 0, 0],
        fontStyle: "bold",
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
    })

    y = (pdf as any).lastAutoTable.finalY + 10

    // Add advantages and challenges section
    pdf.setFontSize(18)
    pdf.setTextColor(0, 0, 0) // Black
    pdf.text("Key Advantages & Challenges", 20, y)
    y += 2

    // Add underline for section header
    pdf.setDrawColor(0, 0, 0) // Black
    pdf.setLineWidth(0.5)
    pdf.line(20, y, 190, y)
    y += 8

    // Create two columns for advantages and challenges
    const columnWidth = 80
    const columnGap = 10

    // Advantages column
    pdf.setDrawColor(0, 0, 0) // Black
    pdf.rect(20, y, columnWidth, 80, "S")

    pdf.setFontSize(14)
    pdf.setTextColor(0, 0, 0) // Black
    pdf.text("Key Advantages", 25, y + 7)

    // Add underline for column header
    pdf.setDrawColor(0, 0, 0) // Black
    pdf.setLineWidth(0.3)
    pdf.line(25, y + 10, 95, y + 10)

    pdf.setFontSize(10)
    pdf.setTextColor(0, 0, 0) // Black
    let advantageY = y + 15
    results.advantages.forEach((advantage) => {
      advantageY = addWrappedText(`• ${advantage}`, 25, advantageY, columnWidth - 10, 5)
    })

    // Challenges column
    pdf.setDrawColor(0, 0, 0) // Black
    pdf.rect(20 + columnWidth + columnGap, y, columnWidth, 80, "S")

    pdf.setFontSize(14)
    pdf.setTextColor(0, 0, 0) // Black
    pdf.text("Potential Challenges", 25 + columnWidth + columnGap, y + 7)

    // Add underline for column header
    pdf.setDrawColor(0, 0, 0) // Black
    pdf.setLineWidth(0.3)
    pdf.line(25 + columnWidth + columnGap, y + 10, 95 + columnWidth + columnGap, y + 10)

    pdf.setFontSize(10)
    pdf.setTextColor(0, 0, 0) // Black
    let challengeY = y + 15
    results.challenges.forEach((challenge) => {
      challengeY = addWrappedText(`• ${challenge}`, 25 + columnWidth + columnGap, challengeY, columnWidth - 10, 5)
    })

    y += 90

    // Add recommendations section
    pdf.setFontSize(18)
    pdf.setTextColor(0, 0, 0) // Black
    pdf.text("Recommendations", 20, y)
    y += 2

    // Add underline for section header
    pdf.setDrawColor(0, 0, 0) // Black
    pdf.setLineWidth(0.5)
    pdf.line(20, y, 190, y)
    y += 8

    // Add recommendations box
    pdf.setDrawColor(0, 0, 0) // Black
    pdf.rect(20, y, 170, 50, "S")

    pdf.setFontSize(10)
    pdf.setTextColor(0, 0, 0) // Black
    let recY = y + 5
    results.recommendations.forEach((recommendation) => {
      recY = addWrappedText(`• ${recommendation}`, 25, recY, 160, 5)
    })

    y += 60

    // Check if we need a new page for timeline
    if (y > 230) {
      pdf.addPage()
      y = 20
    }

    // Add timeline section
    pdf.setFontSize(18)
    pdf.setTextColor(0, 0, 0) // Black
    pdf.text("Journey Timeline", 20, y)
    y += 2

    // Add underline for section header
    pdf.setDrawColor(0, 0, 0) // Black
    pdf.setLineWidth(0.5)
    pdf.line(20, y, 190, y)
    y += 8

    // Add each timeline event
    results.timeline.forEach((event, index) => {
      // Check if we need a new page
      if (y > 230) {
        pdf.addPage()
        y = 20
      }

      // Create a box for the timeline event
      pdf.setDrawColor(0, 0, 0) // Black
      pdf.rect(20, y, 170, 40, "S")

      // Event period
      pdf.setFillColor(0, 0, 0) // Black
      pdf.rect(25, y + 5, 50, 7, "F")
      pdf.setFontSize(9)
      pdf.setTextColor(255, 255, 255) // White
      pdf.text(event.timeframe, 50, y + 9.5, { align: "center" })

      // Event title
      pdf.setFontSize(12)
      pdf.setTextColor(0, 0, 0) // Black
      pdf.text(`${index + 1}. ${event.title}`, 25, y + 18)

      // Event description
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0) // Black
      const descY = addWrappedText(event.description, 25, y + 24, 160, 5)

      // Event milestones if they exist
      if (event.milestones && event.milestones.length > 0) {
        pdf.setFontSize(10)
        pdf.setTextColor(0, 0, 0) // Black
        pdf.text("Key Milestones:", 25, descY + 5)

        pdf.setFontSize(9)
        let milestoneY = descY + 10
        event.milestones.forEach((milestone) => {
          milestoneY = addWrappedText(`• ${milestone}`, 30, milestoneY, 155, 4)
        })

        // Adjust the height of the event box to fit milestones
        const boxHeight = milestoneY - y + 5
        pdf.setDrawColor(0, 0, 0) // Black
        pdf.rect(20, y, 170, boxHeight, "S")

        y = milestoneY + 15
      } else {
        y += 50
      }
    })

    // Add footer to all pages
    const pageCount = pdf.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i)
      pdf.setFontSize(8)
      pdf.setTextColor(100, 100, 100) // Gray
      pdf.text("Generated by Dream Scenario Simulator • Powered by AI", 105, pdf.internal.pageSize.height - 10, {
        align: "center",
      })
      pdf.text(`Page ${i} of ${pageCount}`, 190, pdf.internal.pageSize.height - 10, { align: "right" })
    }

    // Save the PDF
    pdf.save(`dream-scenario-${category}-${new Date().getTime()}.pdf`)
    return true
  } catch (error) {
    console.error("Error generating PDF:", error)
    return false
  }
}
