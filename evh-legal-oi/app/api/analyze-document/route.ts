import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { z } from "zod"

export const maxDuration = 60

const NDAAnalysisSchema = z.object({
  party_disclosing: z.string().optional(),
  party_receiving: z.string().optional(),
  effective_date: z.string().optional(),
  definitions: z.string().optional(),
  confidential_information: z.string().optional(),
  exclusions: z.string().optional(),
  obligations: z.string().optional(),
  term: z.string().optional(),
  return_of_materials: z.string().optional(),
  remedies: z.string().optional(),
  governing_law: z.string().optional(),
  miscellaneous: z.string().optional(),
  risk_assessment: z
    .object({
      priority: z.enum(["critical", "high", "medium", "low"]),
      issues: z.array(z.string()),
      recommendations: z.array(z.string()),
    })
    .optional(),
})

export async function POST(req: NextRequest) {
  try {
    const { fileData, fileName, schema } = await req.json()

    if (!fileData || !fileName) {
      return NextResponse.json({ error: "Missing file data or name" }, { status: 400 })
    }

    // Extract text from PDF (simplified - in production you'd use a proper PDF parser)
    const documentText = `Sample NDA document content for ${fileName}. This would be extracted from the actual PDF.`

    const result = await generateObject({
      model: "openai/gpt-4o",
      schema: NDAAnalysisSchema,
      prompt: `Analyze this NDA document and extract key information according to the nda_anatomy schema.

Document: ${documentText}

Please identify:
1. The disclosing and receiving parties
2. Effective date and term
3. Definitions of confidential information
4. Exclusions from confidentiality
5. Key obligations of the receiving party
6. Return of materials requirements
7. Remedies for breach
8. Governing law
9. Risk assessment with priority level and specific issues
10. Recommendations for improvement

Provide a comprehensive analysis focusing on legal risks and compliance requirements.`,
      abortSignal: req.signal,
    })

    return NextResponse.json({
      analysis: result.object,
      fileName,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Document analysis failed:", error)
    return NextResponse.json({ error: "Failed to analyze document" }, { status: 500 })
  }
}
