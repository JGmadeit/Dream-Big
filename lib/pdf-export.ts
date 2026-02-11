import type { SimulationResult } from "@/lib/types"
import "jspdf-autotable"

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export async function exportToPDF(results: SimulationResult, scenario: string, category: string): Promise<boolean> {
  try {
    // Dynamically import html2pdf to avoid SSR issues
    const html2pdf = (await import("html2pdf.js")).default

    // Format the current date
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Generate advantages list items HTML
    const advantagesListHTML = results.advantages.map((advantage) => `<li>${advantage}</li>`).join("")

    // Generate challenges list items HTML
    const challengesListHTML = results.challenges.map((challenge) => `<li>${challenge}</li>`).join("")

    // Generate recommendations list items HTML
    const recommendationsListHTML = results.recommendations
      .map((recommendation) => `<li>${recommendation}</li>`)
      .join("")

    // Generate timeline phases HTML
    const timelinePhasesHTML = results.timeline
      .map(
        (event, index) => `
      <div class="timeline-box">
        <div class="phase-period">${event.timeframe}</div>
        <div class="phase-title">${index + 1}. ${event.title}</div>
        <div class="phase-description">${event.description}</div>
        ${
          event.milestones && event.milestones.length > 0
            ? `
          <div class="milestones">
            <h4>Key Milestones:</h4>
            <ul>
              ${event.milestones.map((milestone) => `<li>${milestone}</li>`).join("")}
            </ul>
          </div>
        `
            : ""
        }
      </div>
    `,
      )
      .join("")

    // Generate HTML content using the template
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dream Scenario Simulation</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            body {
                color: #000;
                background-color: #fff;
                line-height: 1.6;
                word-wrap: break-word;
                overflow-wrap: break-word;
            }
            
            .container {
                max-width: 1000px;
                margin: 0 auto;
                padding: 20px;
            }
            
            header {
                background-color: #000;
                color: #fff;
                padding: 30px 15px;
                text-align: center;
                margin-bottom: 30px;
            }
            
            h1 {
                font-size: 2.5rem;
                margin-bottom: 15px;
                word-wrap: break-word;
            }
            
            h2 {
                font-size: 1.8rem;
                padding-bottom: 8px;
                margin: 25px 0 15px 0;
                border-bottom: 2px solid #000;
                word-wrap: break-word;
            }
            
            .dream-title {
                font-size: 1.5rem;
                font-style: italic;
                margin: 15px 0;
                word-wrap: break-word;
            }
            
            .date {
                font-size: 0.9rem;
                margin-top: 15px;
                color: #ccc;
            }
            
            .section {
                margin-bottom: 30px;
            }
            
            .content-box {
                border: 1px solid #000;
                padding: 20px;
                margin-bottom: 25px;
            }
            
            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 25px;
                table-layout: fixed;
            }
            
            th, td {
                border: 1px solid #000;
                padding: 12px;
                text-align: left;
                vertical-align: top;
                word-wrap: break-word;
            }
            
            th {
                background-color: #f9f9f9;
                font-weight: bold;
            }
            
            .two-column {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            
            @media (min-width: 768px) {
                .two-column {
                    flex-direction: row;
                }
                
                .column-box {
                    flex: 1;
                }
            }
            
            .column-box {
                border: 1px solid #000;
                padding: 20px;
            }
            
            .column-box h3 {
                font-size: 1.3rem;
                margin-bottom: 15px;
                padding-bottom: 5px;
                border-bottom: 1px solid #000;
            }
            
            ul {
                padding-left: 25px;
                margin-bottom: 15px;
            }
            
            li {
                margin-bottom: 10px;
                word-wrap: break-word;
            }
            
            .timeline-box {
                border: 1px solid #000;
                padding: 20px;
                margin-bottom: 15px;
            }
            
            .phase-title {
                font-size: 1.2rem;
                font-weight: bold;
                margin-bottom: 10px;
            }
            
            .phase-period {
                display: inline-block;
                background-color: #000;
                color: #fff;
                padding: 5px 15px;
                margin-bottom: 15px;
            }
            
            .phase-description {
                margin-bottom: 15px;
            }
            
            .milestones {
                margin-top: 15px;
            }
            
            footer {
                text-align: center;
                margin-top: 40px;
                padding: 15px 0;
                border-top: 1px solid #000;
                font-size: 0.8rem;
                color: #555;
            }
            
            p {
                margin-bottom: 15px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <header>
                <h1>Dream Scenario Simulation</h1>
                <div class="dream-title">${scenario}</div>
                <div class="date">Generated on ${currentDate}</div>
            </header>
            
            <section class="section">
                <h2>Summary</h2>
                <div class="content-box">
                    <p>${results.summary}</p>
                </div>
            </section>
            
            <section class="section">
                <h2>Key Metrics</h2>
                <table>
                    <tr>
                        <th>Feasibility</th>
                        <th>Time to Achieve</th>
                        <th>Financial Impact</th>
                    </tr>
                    <tr>
                        <td>${results.feasibility}%</td>
                        <td>${results.timeToAchieve}</td>
                        <td>${results.financialImpact}</td>
                    </tr>
                </table>
            </section>
            
            <section class="section">
                <h2>Key Advantages & Challenges</h2>
                <div class="two-column">
                    <div class="column-box">
                        <h3>Key Advantages</h3>
                        <ul>
                            ${advantagesListHTML}
                        </ul>
                    </div>
                    
                    <div class="column-box">
                        <h3>Potential Challenges</h3>
                        <ul>
                            ${challengesListHTML}
                        </ul>
                    </div>
                </div>
            </section>
            
            <section class="section">
                <h2>Recommendations</h2>
                <div class="content-box">
                    <ul>
                        ${recommendationsListHTML}
                    </ul>
                </div>
            </section>
            
            <section class="section">
                <h2>Journey Timeline</h2>
                
                ${timelinePhasesHTML}
                
            </section>
            
            <footer>
                Generated by Dream Scenario Simulator • Powered by AI
            </footer>
        </div>
    </body>
    </html>
    `

    // Create a temporary container for the HTML content
    const element = document.createElement("div")
    element.innerHTML = htmlContent

    // Configure html2pdf options
    const options = {
      margin: 10,
      filename: `dream-scenario-${category}-${new Date().getTime()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    }

    // Generate PDF
    await html2pdf().set(options).from(element).save()

    return true
  } catch (error) {
    console.error("Error generating PDF:", error)
    return false
  }
}
