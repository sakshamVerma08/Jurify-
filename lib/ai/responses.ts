export function guessDocType(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('rent') || n.includes('lease')) return 'Rental / Lease Agreement'
  if (n.includes('land') || n.includes('property')) return 'Property / Land Agreement'
  if (n.includes('employment') || n.includes('contract')) return 'Employment Contract'
  if (n.includes('fir')) return 'First Information Report (FIR)'
  if (n.includes('nda') || n.includes('ndisclosure')) return 'Non-Disclosure Agreement'
  return 'Legal Document'
}

export function formatFileSize(bytes: number): string {
  const mb = bytes / 1024 / 1024
  if (mb < 0.1) return `${(bytes / 1024).toFixed(0)} KB`
  return `${mb.toFixed(1)} MB`
}

export function formatMessageTime(date = new Date()): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

interface AiResponse {
  text: string
  followups: string[]
}

export function generateAiResponse(question: string, hasDocument: boolean): AiResponse {
  const ql = question.toLowerCase()

  if (ql.includes('easement') || ql.includes('right of way')) {
    return {
      text: `In your document, <strong>easement rights</strong> refer to a non-possessory right to use a portion of another party's land for a specific purpose.\n\nSpecifically, <span class="msg-cite">§ 4.2</span> of your agreement states that the neighbouring party retains the right to access the main road via the 3-metre pathway on the western boundary of the property.\n\nKey points:\n• You retain full ownership of the land\n• You cannot obstruct or build on that specific pathway\n• The easement right <strong>transfers automatically to any future buyer</strong> unless specifically extinguished by a registered deed`,
      followups: [
        'Can I sell the land with this easement?',
        'How do I extinguish an easement?',
        'What if the neighbour blocks the pathway?',
      ],
    }
  }

  if (ql.includes('summarize') || ql.includes('summary') || ql.includes('summarise')) {
    return {
      text: `Here is a plain-language summary of your document:\n\n<strong>Type:</strong> Land Purchase Agreement\n<strong>Parties:</strong> Seller (Party A) and Purchaser (Party B)\n<strong>Property:</strong> Agricultural land, approximately 2.4 acres in Jaipur district\n<strong>Consideration:</strong> ₹[Amount] payable in two instalments\n\n<strong>Key Provisions:</strong>\n• <span class="msg-cite">§ 2</span> — Transfer of title on final payment\n• <span class="msg-cite">§ 4</span> — Existing easement obligations\n• <span class="msg-cite">§ 7</span> — Dispute resolution by arbitration in Jaipur\n• <span class="msg-cite">§ 9</span> — Seller warrants clear title, free from encumbrances`,
      followups: [
        'What are the risks in this agreement?',
        'Explain clause 4 in detail',
        "Is the seller's warranty enforceable?",
      ],
    }
  }

  if (ql.includes('risk') || ql.includes('risky') || ql.includes('clause')) {
    return {
      text: `I identified <strong>3 potentially risky clauses</strong> in your document:\n\n⚠️ <strong>1. Indemnity Clause</strong> <span class="msg-cite">§ 6.3</span>\nThe indemnity is one-sided — only Party B (you) provides indemnification. This is unusually broad and may expose you to unlimited liability.\n\n⚠️ <strong>2. Dispute Resolution</strong> <span class="msg-cite">§ 7</span>\nArbitration is mandatory with no interim relief carve-out. If you need urgent injunctive relief (e.g., to stop a sale), you may face procedural delays.\n\n⚠️ <strong>3. Easement Clause</strong> <span class="msg-cite">§ 4.2</span>\nThe easement does not specify a termination condition or mechanism, meaning it could bind the property indefinitely.\n\nI recommend consulting a property lawyer before signing.`,
      followups: [
        'How can I negotiate the indemnity clause?',
        'What is interim relief in arbitration?',
        'Can I add an easement termination condition?',
      ],
    }
  }

  if (ql.includes('fir') || ql.includes('first information')) {
    return {
      text: `An <strong>FIR (First Information Report)</strong> is the first step in the criminal justice process in India.\n\n<strong>How to file:</strong>\n1. Visit the police station with jurisdiction over the area where the offence occurred\n2. Provide a written or oral complaint\n3. The officer in charge must register it under Section 173 BNSS, 2023 (formerly Section 154 CrPC)\n4. You are entitled to a free copy of the FIR immediately\n\n<strong>If police refuse:</strong>\n• Send a written complaint to the Superintendent of Police\n• File a complaint directly before a Magistrate under Section 175 BNSS\n• Approach the High Court under Section 528 BNSS\n\nThe Supreme Court in <em>Lalita Kumari v. Govt. of UP (2013)</em> held that registration of an FIR is mandatory for cognizable offences.`,
      followups: [
        'What is a cognizable offence?',
        'Can I file an FIR online?',
        'What happens after the FIR is filed?',
      ],
    }
  }

  if (ql.includes('tenant') || ql.includes('rent') || ql.includes('landlord')) {
    return {
      text: `Under Indian law, tenants have the following key rights:\n\n• <strong>Right to a written agreement:</strong> Any tenancy above 11 months must be registered\n• <strong>Protection from unlawful eviction:</strong> A landlord cannot evict without a court order or notice as specified in the rent agreement or applicable Rent Control Act\n• <strong>Right to essential services:</strong> The landlord cannot cut off water, electricity, or other utilities to force eviction\n• <strong>Security deposit limits:</strong> Under the Model Tenancy Act, 2021, the deposit is capped at 2 months' rent for residential properties\n• <strong>Habitability:</strong> Premises must be maintained in a habitable condition\n\nApplicable laws vary by state (e.g., Delhi Rent Control Act, Maharashtra Rent Control Act). Which state are you in?`,
      followups: [
        'What notice period must a landlord give?',
        'My landlord cut my water supply — what can I do?',
        'Is my verbal tenancy agreement valid?',
      ],
    }
  }

  return {
    text: `That's a good question. Based on ${hasDocument ? 'your uploaded document and ' : ''}applicable Indian law, here is what I can tell you:\n\nUnder the relevant provisions, ${question.trim().endsWith('?') ? 'the answer depends on several factors specific to your situation.' : 'the key considerations are as follows.'}\n\nFor a definitive answer tailored to your specific circumstances, I recommend consulting a verified advocate on Jurify who specialises in the relevant area of law.\n\nWould you like me to help you find a suitable lawyer, or do you have a follow-up question?`,
    followups: ['Find a lawyer for this', 'Explain more', 'What law applies here?'],
  }
}
