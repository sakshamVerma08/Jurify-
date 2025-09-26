import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, documentText } = await request.json()

    // In a real implementation, this would use the AI SDK to process the request
    // For now, we'll return a mock response

    const response = {
      content: generateMockResponse(message, documentText),
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}

function generateMockResponse(message: string, documentText?: string): string {
  if (documentText) {
    return `I've analyzed your document. Here's what I found:

**Key Points:**
• This appears to be a legal document with several important clauses
• The language used is formal legal terminology that can be simplified
• There are specific rights and obligations outlined for all parties

**In Plain English:**
The document essentially establishes an agreement between parties with specific terms and conditions. The legal jargon can be broken down as follows:

• **"Whereas" clauses** - These are just background information explaining why the agreement exists
• **"Party of the first part"** - This is just a formal way of saying "the first person/company in the agreement"
• **"Shall" vs "May"** - "Shall" means required/mandatory, "May" means optional

**Potential Concerns:**
• Look for any clauses that seem one-sided
• Check termination conditions and notice requirements
• Review any penalty or fee structures

Would you like me to explain any specific section in more detail?`
  }

  const responses = [
    "I'd be happy to help you understand legal documents! Could you please share the specific document or text you'd like me to analyze?",
    "Legal documents can be confusing with all their formal language. If you upload or paste the text, I can break it down into plain English for you.",
    "That's a great question about legal matters. To give you the most accurate help, could you provide the specific document or clause you're asking about?",
  ]

  return responses[Math.floor(Math.random() * responses.length)]
}
