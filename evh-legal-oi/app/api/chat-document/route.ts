import type { NextRequest } from "next/server"
import { streamText, convertToModelMessages } from "ai"
import { openai } from "@ai-sdk/openai"

export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const { message, analysis, context } = await req.json()

    if (!message || !analysis) {
      return new Response("Missing message or analysis data", { status: 400 })
    }

    const systemPrompt = `You are an expert legal AI assistant specializing in NDA analysis. You have analyzed a document with the following details:

Document Analysis:
- Disclosing Party: ${analysis.party_disclosing || "Not specified"}
- Receiving Party: ${analysis.party_receiving || "Not specified"}
- Term: ${analysis.term || "Not specified"}
- Effective Date: ${analysis.effective_date || "Not specified"}
- Risk Level: ${analysis.risk_assessment?.priority || "medium"}

Key Sections:
- Definitions: ${analysis.definitions || "Standard definitions"}
- Confidential Information: ${analysis.confidential_information || "Standard clause"}
- Exclusions: ${analysis.exclusions || "Standard exclusions"}
- Obligations: ${analysis.obligations || "Standard obligations"}
- Return of Materials: ${analysis.return_of_materials || "Standard requirements"}
- Remedies: ${analysis.remedies || "Standard remedies"}
- Governing Law: ${analysis.governing_law || "Not specified"}

Risk Assessment:
${
  analysis.risk_assessment
    ? `
- Priority: ${analysis.risk_assessment.priority}
- Issues: ${analysis.risk_assessment.issues.join(", ")}
- Recommendations: ${analysis.risk_assessment.recommendations.join(", ")}
`
    : "Standard risk profile"
}

Please provide detailed, accurate responses about this NDA. Focus on:
1. Legal implications and risks
2. Compliance requirements
3. Practical business impact
4. Specific clause analysis
5. Recommendations for negotiation or improvement

Be precise, professional, and cite specific sections when relevant.`

    const result = streamText({
      model: openai("gpt-4o"),
      messages: convertToModelMessages([
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ]),
      abortSignal: req.signal,
      temperature: 0.3,
      maxOutputTokens: 1000,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat failed:", error)
    return new Response("Chat processing failed", { status: 500 })
  }
}
