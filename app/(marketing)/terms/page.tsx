// FILE: app/(marketing)/terms/page.tsx
// TYPE: Server Component
// RENDERING: Static — export const dynamic = 'force-static'

import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { TermsNavActions } from '@/components/terms/TermsNavActions'
import { TermsSidebar } from '@/components/terms/TermsSidebar'
import { TermsInteractiveController } from '@/components/terms/TermsInteractiveController'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Terms & Conditions — Jurify',
  description:
    'Read the terms and conditions governing the use of the Jurify platform, including the AI Legal Assistant, pro bono guidelines, user roles, data privacy, and dispute resolution.',
}

export default function TermsPage() {
  return (
    <div id="terms-page-root" className="min-h-screen bg-[var(--bg)] text-[var(--t)] font-sans antialiased">
      <TermsInteractiveController />

      {/* NAV */}
      <Navbar rightSlot={<TermsNavActions />} />

      {/* HERO BAND */}
      <div className="relative z-10 border-b border-white/[0.06] bg-gradient-to-b from-[rgba(212,133,58,0.04)] to-transparent px-6 pt-28 pb-14 sm:px-12" id="top">
        <div className="mx-auto max-w-[860px]">
          <div className="mb-4.5 inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.05] px-3 py-1 text-[11px] tracking-[0.5px] text-[rgba(245,240,234,0.45)]">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1" />
              <line x1="3" y1="4" x2="8" y2="4" stroke="currentColor" strokeWidth="0.8" />
              <line x1="3" y1="6" x2="8" y2="6" stroke="currentColor" strokeWidth="0.8" />
            </svg>
            Legal Document
          </div>
          <h1 className="mb-3.5 font-serif text-[clamp(36px,4.5vw,54px)] font-light leading-[1.06] tracking-[-1px] text-[var(--t)]">
            Terms &amp; <em className="font-serif italic text-[var(--o2)]">Conditions</em>
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-xs text-[rgba(245,240,234,0.38)]">
            <div className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1" />
                <path d="M6.5 4v2.5l1.5 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              Last updated: 23 May 2026
            </div>
            <div className="hidden h-3.5 w-[1px] bg-white/10 sm:block" />
            <div className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <rect x="1.5" y="2.5" width="10" height="8" rx="1.2" stroke="currentColor" strokeWidth="1" />
                <path d="M4 2.5V1.5M9 2.5V1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <line x1="1.5" y1="5" x2="11.5" y2="5" stroke="currentColor" strokeWidth="1" />
              </svg>
              Version 2.1
            </div>
            <div className="hidden h-3.5 w-[1px] bg-white/10 sm:block" />
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(212,133,58,0.2)] bg-[rgba(212,133,58,0.08)] px-3 py-1 text-[11.5px] text-[rgba(212,133,58,0.85)]">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M5.5 1C3.5 1 2 2.5 2 4.5c0 3 3.5 5.5 3.5 5.5S9 7.5 9 4.5C9 2.5 7.5 1 5.5 1z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
              </svg>
              Jurisdiction: Republic of India
            </div>
          </div>
        </div>
      </div>

      {/* PAGE LAYOUT */}
      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 gap-0 px-6 sm:px-12 md:grid-cols-[240px_1fr] min-h-[80vh]">
        {/* SIDEBAR TOC */}
        <TermsSidebar />

        {/* MAIN CONTENT */}
        <main className="max-w-[912px] py-12 pl-0 md:pl-12">
          {/* PREAMBLE */}
          <div className="mb-10 flex items-start gap-3.5 rounded-xl border border-[rgba(212,133,58,0.2)] bg-[rgba(212,133,58,0.07)] p-5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(212,133,58,0.12)] text-[var(--og)]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                <line x1="8" y1="6" x2="8" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="8" cy="11" r="0.7" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-semibold text-[var(--o2)] mb-1">Please Read Carefully</div>
              <p className="text-[13px] font-light leading-relaxed text-[rgba(245,240,234,0.5)]">
                These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the Jurify platform, including its website, mobile application, AI assistant, and all related services. By registering on or using Jurify, you agree to be bound by these Terms in their entirety. If you do not agree, you must immediately cease use of the platform.
              </p>
            </div>
          </div>

          {/* S1: DEFINITIONS */}
          <section className="tc-section mb-16 scroll-mt-24" id="s1">
            <div className="mb-6">
              <div className="mb-2 text-[10px] font-medium uppercase tracking-[1.5px] text-[var(--og)]">
                Section 01
              </div>
              <h2 className="mb-2 font-serif text-3.5xl font-normal leading-tight tracking-tight text-[var(--t)]">
                Definitions &amp; <em className="font-serif italic text-[var(--o2)]">Interpretation</em>
              </h2>
              <p className="border-l-2 border-[rgba(212,133,58,0.3)] pl-3.5 text-md font-light leading-relaxed text-[var(--tm)]">
                The following definitions apply throughout these Terms unless the context requires otherwise.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="mb-5 w-full border-collapse text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/[0.07]">
                    <th className="py-2.5 px-3.5 text-left text-[10px] font-medium uppercase tracking-wider text-[rgba(245,240,234,0.3)]">
                      Term
                    </th>
                    <th className="py-2.5 px-3.5 text-left text-[10px] font-medium uppercase tracking-wider text-[rgba(245,240,234,0.3)]">
                      Meaning
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { term: '"Platform"', meaning: 'The Jurify website, mobile application, desktop application, API, and all associated services and tools, including the AI Legal Assistant.' },
                    { term: '"Jurify" / "We" / "Us"', meaning: 'Jurify Technologies Private Limited, a company incorporated under the Companies Act, 2013, having its registered office in India.' },
                    { term: '"User" / "You"', meaning: 'Any natural person or legal entity that accesses, registers on, or uses the Platform in any capacity.' },
                    { term: '"Lawyer User"', meaning: 'A User who has registered as a legal professional and has completed or is undergoing the KYC verification process on the Platform.' },
                    { term: '"Client User"', meaning: 'A User who registers seeking legal assistance, information, or to post cases for pro bono representation.' },
                    { term: '"AI Assistant"', meaning: 'The artificial intelligence-powered legal information tool embedded in the Platform that uses Retrieval-Augmented Generation (RAG) and large language model technologies.' },
                    { term: '"Pro Bono Case"', meaning: 'A legal matter listed on the Platform by a Client User seeking free or reduced-fee legal representation or assistance.' },
                    { term: '"KYC"', meaning: 'Know Your Client/Customer — the verification process through which Lawyer Users submit identity and professional credentials for validation.' },
                    { term: '"Content"', meaning: 'Any text, documents, images, data, legal submissions, case descriptions, messages, or other materials submitted to or generated on the Platform.' },
                    { term: '"Personal Data"', meaning: 'Any information that relates to an identified or identifiable natural person as defined under the Digital Personal Data Protection Act, 2023.' },
                  ].map((row, i) => (
                    <tr key={i} className="group border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-3.5 font-medium text-[var(--t)] align-top whitespace-nowrap pr-5 w-[160px]">
                        {row.term}
                      </td>
                      <td className="py-3 px-3.5 font-light leading-relaxed text-[rgba(245,240,234,0.55)] align-top">
                        {row.meaning}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              References to any statute or statutory provision include references to that statute or provision as amended or re-enacted from time to time and include all subordinate legislation made under it. The singular includes the plural and vice versa. Headings are for convenience only and shall not affect interpretation.
            </p>
          </section>
          <div className="mb-16 h-[1px] bg-gradient-to-r from-[rgba(212,133,58,0.15)] via-white/[0.04] to-transparent" />

          {/* S2: ACCEPTANCE */}
          <section className="tc-section mb-16 scroll-mt-24" id="s2">
            <div className="mb-6">
              <div className="mb-2 text-[10px] font-medium uppercase tracking-[1.5px] text-[var(--og)]">
                Section 02
              </div>
              <h2 className="mb-2 font-serif text-3.5xl font-normal leading-tight tracking-tight text-[var(--t)]">
                Acceptance of <em className="font-serif italic text-[var(--o2)]">Terms</em>
              </h2>
              <p className="border-l-2 border-[rgba(212,133,58,0.3)] pl-3.5 text-md font-light leading-relaxed text-[var(--tm)]">
                Your access to and use of the Platform constitutes acceptance of these Terms and our Privacy Policy.
              </p>
            </div>

            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              By clicking &quot;Create Account&quot;, &quot;Register&quot;, &quot;I Agree&quot;, or by otherwise accessing or using the Platform, you confirm that:
            </p>
            <ul className="mb-4 flex flex-col gap-2 pl-0 list-none">
              {[
                <>You have read, understood, and agree to be bound by these Terms and our <a href="#" className="border-b border-[rgba(212,133,58,0.25)] text-[var(--og)] no-underline transition-colors hover:border-[rgba(232,164,74,0.5)] hover:text-[var(--o2)]">Privacy Policy</a>;</>,
                <>You are at least 18 years of age or the age of majority in your jurisdiction, whichever is higher;</>,
                <>You have the legal capacity and authority to enter into a binding agreement;</>,
                <>If registering on behalf of a legal entity, you are duly authorised to bind that entity to these Terms;</>,
                <>You are not barred from using the Platform under applicable law, including any order or direction of a competent court or regulatory authority.</>,
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.6)]">
                  <span className="mt-2 h-1.2 w-1.2 shrink-0 rounded-full bg-[var(--og)] opacity-80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 mb-5 flex items-start gap-3.5 rounded-xl border border-[rgba(240,100,100,0.2)] bg-[rgba(240,100,100,0.07)] p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(240,100,100,0.12)] text-[#f4a0a0]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 3L14 13H2L8 3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  <line x1="8" y1="7" x2="8" y2="9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="8" cy="11.2" r="0.65" fill="currentColor" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#f4a0a0] mb-1">Minor Users</div>
                <p className="text-[13px] font-light leading-relaxed text-[rgba(245,240,234,0.5)]">
                  The Platform is not intended for use by persons under 18 years of age. If you are a parent or guardian and believe a minor has registered on the Platform, please contact us immediately at{' '}
                  <a href="mailto:legal@jurify.in" className="text-[var(--o2)] no-underline hover:underline">
                    legal@jurify.in
                  </a>{' '}
                  so we can take appropriate action.
                </p>
              </div>
            </div>

            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mt-5">
              These Terms constitute the entire agreement between you and Jurify with respect to the Platform and supersede all prior or contemporaneous understandings, negotiations, representations, or agreements, whether oral or written. In the event of any conflict between these Terms and any other agreement you may have with Jurify, these Terms shall prevail unless expressly stated otherwise in writing by Jurify.
            </p>
          </section>
          <div className="mb-16 h-[1px] bg-gradient-to-r from-[rgba(212,133,58,0.15)] via-white/[0.04] to-transparent" />

          {/* S3: USER ROLES */}
          <section className="tc-section mb-16 scroll-mt-24" id="s3">
            <div className="mb-6">
              <div className="mb-2 text-[10px] font-medium uppercase tracking-[1.5px] text-[var(--og)]">
                Section 03
              </div>
              <h2 className="mb-2 font-serif text-3.5xl font-normal leading-tight tracking-tight text-[var(--t)]">
                User Roles &amp; <em className="font-serif italic text-[var(--o2)]">Eligibility</em>
              </h2>
              <p className="border-l-2 border-[rgba(212,133,58,0.3)] pl-3.5 text-md font-light leading-relaxed text-[var(--tm)]">
                The Platform serves two primary categories of Users, each with distinct rights, responsibilities, and obligations.
              </p>
            </div>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">3.1 Lawyer Users</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              To register as a Lawyer User you must:
            </p>
            <ul className="mb-4 flex flex-col gap-2 pl-0 list-none">
              {[
                <>Be a person enrolled as an advocate under the <strong>Advocates Act, 1961</strong> and holding a valid certificate of practice issued by a State Bar Council or the Bar Council of India;</>,
                <>Provide accurate and complete KYC documentation including, without limitation, a valid Aadhaar Card, PAN Card, and Bar Council Enrollment Certificate;</>,
                <>Not be under suspension, disbarment, or any disciplinary proceeding that prohibits the practice of law at the time of registration or at any time during use of the Platform;</>,
                <>Maintain and promptly update your profile to reflect any change in your enrolment status, practice areas, or disciplinary standing.</>,
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.6)]">
                  <span className="mt-2 h-1.2 w-1.2 shrink-0 rounded-full bg-[var(--og)] opacity-80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Lawyer Users are solely responsible for ensuring that any legal advice, guidance, or representation provided through the Platform complies with all applicable professional conduct rules, including the <strong>Bar Council of India Rules</strong> framed under the Advocates Act, 1961. Jurify is not a law firm and does not supervise, direct, or assume responsibility for the legal services provided by Lawyer Users.
            </p>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              <strong>Solicitation:</strong> Lawyer Users must not solicit clients or cases through the Platform in a manner that contravenes Rule 36 of the Bar Council of India Rules or any applicable professional conduct regulation. Jurify&apos;s case-matching and pro bono listing features are information services only and do not constitute a referral fee arrangement.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">3.2 Client Users</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              To register as a Client User you must:
            </p>
            <ul className="mb-4 flex flex-col gap-2 pl-0 list-none">
              {[
                <>Provide truthful and accurate information when creating a case listing or user profile;</>,
                <>Use the Platform solely for lawful purposes and in good faith;</>,
                <>Not misrepresent your financial situation, the nature of your legal matter, or any material facts when seeking pro bono assistance;</>,
                <>Understand and acknowledge that the AI Assistant is not a substitute for qualified legal advice and that Jurify does not guarantee the accuracy, completeness, or applicability of any AI-generated output to your specific legal situation.</>,
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.6)]">
                  <span className="mt-2 h-1.2 w-1.2 shrink-0 rounded-full bg-[var(--og)] opacity-80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">3.3 Account Security</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must notify Jurify immediately at{' '}
              <a href="mailto:security@jurify.in" className="border-b border-[rgba(212,133,58,0.25)] text-[var(--og)] no-underline transition-colors hover:border-[rgba(232,164,74,0.5)] hover:text-[var(--o2)]">
                security@jurify.in
              </a>{' '}
              if you suspect any unauthorised access to or use of your account. Jurify shall not be liable for any loss or damage arising from your failure to safeguard your credentials.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">3.4 Prohibited Conduct</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              All Users are strictly prohibited from:
            </p>
            <ul className="mb-4 flex flex-col gap-2 pl-0 list-none">
              {[
                <>Impersonating any person or entity, or falsely claiming affiliation with any Bar Council, law firm, judicial body, or government authority;</>,
                <>Uploading, transmitting, or distributing Content that is unlawful, defamatory, fraudulent, obscene, or otherwise objectionable;</>,
                <>Using the Platform to facilitate money laundering, bribery, corruption, or any offence under the <strong>Prevention of Money Laundering Act, 2002</strong> or any other applicable statute;</>,
                <>Reverse-engineering, scraping, crawling, or otherwise extracting data from the Platform without express written consent;</>,
                <>Using automated scripts, bots, or other non-human means to access or use the Platform;</>,
                <>Attempting to circumvent any security, authentication, or access-control mechanism of the Platform;</>,
                <>Sharing, reselling, or sublicensing access to the Platform to any third party.</>,
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.6)]">
                  <span className="mt-2 h-1.2 w-1.2 shrink-0 rounded-full bg-[var(--og)] opacity-80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <div className="mb-16 h-[1px] bg-gradient-to-r from-[rgba(212,133,58,0.15)] via-white/[0.04] to-transparent" />

          {/* S4: AI ASSISTANT */}
          <section className="tc-section mb-16 scroll-mt-24" id="s4">
            <div className="mb-6">
              <div className="mb-2 text-[10px] font-medium uppercase tracking-[1.5px] text-[var(--og)]">
                Section 04
              </div>
              <h2 className="mb-2 font-serif text-3.5xl font-normal leading-tight tracking-tight text-[var(--t)]">
                AI Assistant <em className="font-serif italic text-[var(--o2)]">Usage</em>
              </h2>
              <p className="border-l-2 border-[rgba(212,133,58,0.3)] pl-3.5 text-md font-light leading-relaxed text-[var(--tm)]">
                The Jurify AI Legal Assistant is a technology tool designed to help Users understand legal documents and access general legal information. It is not a lawyer and does not constitute legal advice.
              </p>
            </div>

            <div className="mb-5 flex items-start gap-3.5 rounded-xl border border-[rgba(240,100,100,0.2)] bg-[rgba(240,100,100,0.07)] p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(240,100,100,0.12)] text-[#f4a0a0]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 3L14 13H2L8 3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  <line x1="8" y1="7" x2="8" y2="9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="8" cy="11.2" r="0.65" fill="currentColor" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-[#f4a0a0] mb-1">Not Legal Advice — Important Disclaimer</div>
                <p className="text-[13px] font-light leading-relaxed text-[rgba(245,240,234,0.5)]">
                  All outputs generated by the AI Assistant constitute <strong>general legal information only</strong> and do not constitute legal advice, create an attorney-client relationship, or substitute for the advice of a qualified legal professional. No reliance should be placed on AI-generated content for making legal decisions without independent professional verification.
                </p>
              </div>
            </div>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">4.1 Nature of the Service</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              The AI Assistant operates using Retrieval-Augmented Generation (RAG) technology. When a User uploads a document, the AI processes and analyses the content of that specific document to generate responses. While the AI is designed to ground its responses in the uploaded document, Jurify does not warrant that all AI outputs are accurate, current, complete, or applicable to your specific circumstances.
            </p>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              The AI Assistant is designed to assist with understanding Indian legal documents across domains including but not limited to property law, family law, labour law, consumer protection, and criminal law. It does not provide representation, does not file documents on your behalf, and cannot appear before any court or tribunal.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">4.2 User Obligations When Using AI</h3>
            <ul className="mb-4 flex flex-col gap-2 pl-0 list-none">
              {[
                <>You must not upload documents containing classified information, documents subject to legal professional privilege belonging to a third party, or documents obtained unlawfully;</>,
                <>You must not attempt to use the AI Assistant to generate advice intended for use in criminal activity or to evade legal obligations;</>,
                <>You acknowledge that the AI may occasionally produce inaccurate, outdated, or incomplete responses (&quot;hallucinations&quot;) and that you bear sole responsibility for verifying any AI output before acting on it;</>,
                <>You must not represent AI-generated content as advice received from a qualified advocate.</>,
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.6)]">
                  <span className="mt-2 h-1.2 w-1.2 shrink-0 rounded-full bg-[var(--og)] opacity-80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">4.3 Data Processing by AI</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Documents uploaded to the AI Assistant are processed to generate responses and are not permanently stored beyond the session unless you explicitly save a conversation within the Platform. For details on how document data is handled, please refer to our <a href="#" className="border-b border-[rgba(212,133,58,0.25)] text-[var(--og)] no-underline transition-colors hover:border-[rgba(232,164,74,0.5)] hover:text-[var(--o2)]">Privacy Policy</a>. Jurify implements industry-standard encryption and access controls for all document data. However, you should not upload documents containing highly sensitive personal data — such as complete financial account numbers, medical records of third parties, or national security information — unless absolutely necessary.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">4.4 Third-Party AI Providers</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              The AI capabilities on the Platform may be powered in whole or in part by third-party large language model providers. Jurify selects providers that comply with applicable data protection laws and implements contractual safeguards. However, Jurify does not warrant the performance or output quality of any underlying third-party model.
            </p>
          </section>
          <div className="mb-16 h-[1px] bg-gradient-to-r from-[rgba(212,133,58,0.15)] via-white/[0.04] to-transparent" />

          {/* S5: DATA PRIVACY */}
          <section className="tc-section mb-16 scroll-mt-24" id="s5">
            <div className="mb-6">
              <div className="mb-2 text-[10px] font-medium uppercase tracking-[1.5px] text-[var(--og)]">
                Section 05
              </div>
              <h2 className="mb-2 font-serif text-3.5xl font-normal leading-tight tracking-tight text-[var(--t)]">
                Data Privacy &amp; <em className="font-serif italic text-[var(--o2)]">Protection</em>
              </h2>
              <p className="border-l-2 border-[rgba(212,133,58,0.3)] pl-3.5 text-md font-light leading-relaxed text-[var(--tm)]">
                Jurify is committed to protecting your personal data in accordance with applicable Indian and international data protection law.
              </p>
            </div>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">5.1 Applicable Law</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              The collection, storage, use, and disclosure of Personal Data by Jurify is governed by the <strong>Digital Personal Data Protection Act, 2023 (DPDPA)</strong> and the rules framed thereunder, the <strong>Information Technology Act, 2000</strong> and the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>. Our comprehensive data practices are set out in our <a href="#" className="border-b border-[rgba(212,133,58,0.25)] text-[var(--og)] no-underline transition-colors hover:border-[rgba(232,164,74,0.5)] hover:text-[var(--o2)]">Privacy Policy</a>, which forms an integral part of these Terms.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">5.2 Data We Collect</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              We collect the following categories of data:
            </p>
            <ul className="mb-4 flex flex-col gap-2 pl-0 list-none">
              {[
                <><strong>Registration Data:</strong> Full name, email address, mobile number, password (stored in hashed form), and role selection;</>,
                <><strong>Professional Data (Lawyer Users):</strong> Bar Council enrollment number, state of enrolment, year of enrolment, degree, university, practice areas, and professional bio;</>,
                <><strong>Identity Documents (Lawyer Users):</strong> Aadhaar Card, PAN Card, and Bar Council Certificate (processed for KYC verification and stored with AES-256 encryption);</>,
                <><strong>Case Data:</strong> Information submitted in case listings, including descriptions, parties, locations, and deadlines;</>,
                <><strong>Usage Data:</strong> IP addresses, browser type, device identifiers, pages visited, features used, and session duration, collected via cookies and similar technologies;</>,
                <><strong>AI Interaction Data:</strong> Document content and queries submitted to the AI Assistant within a session.</>,
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.6)]">
                  <span className="mt-2 h-1.2 w-1.2 shrink-0 rounded-full bg-[var(--og)] opacity-80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">5.3 Purposes of Processing</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Your Personal Data is processed for the following lawful purposes:
            </p>
            <ul className="mb-4 flex flex-col gap-2 pl-0 list-none">
              {[
                <>Performance of a contract — to provide and maintain your account and the services you request;</>,
                <>Legal obligation — to comply with KYC requirements and obligations under applicable law;</>,
                <>Legitimate interests — to improve Platform safety, prevent fraud, conduct analytics, and develop new features;</>,
                <>Consent — for marketing communications, where you have expressly opted in. You may withdraw consent at any time.</>,
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.6)]">
                  <span className="mt-2 text-[12px] font-semibold text-[var(--og)] shrink-0 min-w-[16px]">{String.fromCharCode(97 + idx)}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">5.4 Sharing of Data</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Jurify does not sell your Personal Data. We may share your data with:
            </p>
            <ul className="mb-4 flex flex-col gap-2 pl-0 list-none">
              {[
                <><strong>Verification Partners:</strong> Third-party agencies for Bar Council and identity verification (Lawyer Users only);</>,
                <><strong>Technology Providers:</strong> Cloud hosting, AI model providers, analytics, and customer support tools, under data processing agreements ensuring equivalent protections;</>,
                <><strong>Regulatory Authorities:</strong> Where required by a court order, statutory obligation, or lawful direction of a competent authority;</>,
                <><strong>Other Users:</strong> Your public profile information (name, practice areas, location, bio) is visible to other registered Users. Contact details are disclosed to matched parties only after mutual acceptance of a case engagement.</>,
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.6)]">
                  <span className="mt-2 h-1.2 w-1.2 shrink-0 rounded-full bg-[var(--og)] opacity-80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">5.5 Your Rights</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Under the DPDPA and applicable law, you have the right to:
            </p>
            <ul className="mb-4 flex flex-col gap-2 pl-0 list-none">
              {[
                <>Access and obtain a copy of your Personal Data held by Jurify;</>,
                <>Correct inaccurate or incomplete Personal Data;</>,
                <>Request erasure of your Personal Data, subject to our legal retention obligations;</>,
                <>Withdraw consent to data processing where processing is based solely on consent;</>,
                <>Nominate a person to exercise your data rights on your behalf in the event of your death or incapacity;</>,
                <>Lodge a complaint with the Data Protection Board of India.</>,
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.6)]">
                  <span className="mt-2 h-1.2 w-1.2 shrink-0 rounded-full bg-[var(--og)] opacity-80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              To exercise your rights, please contact our Grievance Officer as specified in Section 13 of these Terms.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">5.6 Data Retention</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              We retain your Personal Data for as long as your account remains active or as necessary to fulfil the purposes described herein, comply with legal obligations, resolve disputes, and enforce our agreements. Identity documents submitted for KYC are retained for a minimum of <strong>five (5) years</strong> following account closure in accordance with anti-money laundering and professional verification obligations. Upon valid erasure request, non-legally-required data will be deleted or anonymised within <strong>30 calendar days</strong>.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">5.7 Data Security</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Jurify implements appropriate technical and organisational measures including AES-256 encryption at rest, TLS 1.3 encryption in transit, role-based access controls, regular security audits, and multi-factor authentication for administrative access. Notwithstanding these measures, no transmission over the internet is completely secure, and Jurify cannot guarantee the absolute security of your data.
            </p>
          </section>
          <div className="mb-16 h-[1px] bg-gradient-to-r from-[rgba(212,133,58,0.15)] via-white/[0.04] to-transparent" />

          {/* S6: PRO BONO */}
          <section className="tc-section mb-16 scroll-mt-24" id="s6">
            <div className="mb-6">
              <div className="mb-2 text-[10px] font-medium uppercase tracking-[1.5px] text-[var(--og)]">
                Section 06
              </div>
              <h2 className="mb-2 font-serif text-3.5xl font-normal leading-tight tracking-tight text-[var(--t)]">
                Pro Bono <em className="font-serif italic text-[var(--o2)]">Guidelines</em>
              </h2>
              <p className="border-l-2 border-[rgba(212,133,58,0.3)] pl-3.5 text-md font-light leading-relaxed text-[var(--tm)]">
                Jurify&apos;s pro bono case board facilitates connections between lawyers willing to provide free or reduced-fee legal services and individuals who genuinely require such assistance.
              </p>
            </div>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">6.1 Nature of the Platform&apos;s Role</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Jurify operates solely as an <strong>intermediary information technology platform</strong> within the meaning of Section 2(1)(w) of the Information Technology Act, 2000. Jurify is not a party to any legal services agreement, retainer, or engagement formed between a Lawyer User and a Client User. The Platform does not supervise, quality-assure, or guarantee the legal services provided through it.
            </p>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Accordingly, any attorney-client relationship, duty of confidentiality, duty of care, or professional obligation is created solely between the respective Lawyer User and Client User and governed by applicable professional conduct rules and general law.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">6.2 Obligations of Client Users Posting Cases</h3>
            <ul className="mb-4 flex flex-col gap-2 pl-0 list-none">
              {[
                <>All information in a case listing must be accurate, truthful, and complete to the best of your knowledge;</>,
                <>You must genuinely require pro bono assistance and must not misrepresent financial need or the nature of the legal matter;</>,
                <>You must not post the same case on multiple platforms in a manner designed to artificially inflate applicant numbers;</>,
                <>Upon accepting a lawyer&apos;s application, you agree to engage in good faith, respond promptly to communications, and provide all documents and information requested by the lawyer;</>,
                <>You may close a case at any time; however, you must notify any Lawyer User whose application was accepted with reasonable advance notice.</>,
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.6)]">
                  <span className="mt-2 h-1.2 w-1.2 shrink-0 rounded-full bg-[var(--og)] opacity-80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">6.3 Obligations of Lawyer Users Applying to Cases</h3>
            <ul className="mb-4 flex flex-col gap-2 pl-0 list-none">
              {[
                <>You must apply only to cases that fall within your competence, practice area, and capacity to handle;</>,
                <>Upon acceptance of a case, you undertake to provide diligent, professional, and ethical representation in accordance with the Bar Council of India Rules;</>,
                <>You must not convert a pro bono engagement into a fee-paying retainer without the free, prior, and informed consent of the client, and must disclose any change in the fee arrangement;</>,
                <>You must maintain client confidentiality in accordance with Section 126 of the Indian Evidence Act, 1872 and applicable professional conduct rules;</>,
                <>You must not accept a case if you have an existing conflict of interest with any party to the matter.</>,
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.6)]">
                  <span className="mt-2 h-1.2 w-1.2 shrink-0 rounded-full bg-[var(--og)] opacity-80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">6.4 No Fee Guarantee</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Jurify does not guarantee that cases listed as pro bono will remain without charge throughout the engagement. The pro bono or reduced-fee nature of any engagement is a matter agreed solely between the Lawyer User and the Client User. Jurify does not hold any fees in escrow or facilitate payment of any kind between Users.
            </p>

            <div className="mt-5 mb-5 flex items-start gap-3.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-[rgba(245,240,234,0.35)]">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.1" />
                  <line x1="7.5" y1="5.5" x2="7.5" y2="8.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                  <circle cx="7.5" cy="10.5" r="0.6" fill="currentColor" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-[var(--tm)] mb-1">Bar Council Compliance</div>
                <p className="text-[13px] font-light leading-relaxed text-[rgba(245,240,234,0.5)]">
                  Lawyer Users are reminded that Rule 46 of the Bar Council of India Rules mandates that advocates shall not do anything by way of touting or advertising or soliciting work or person with power of attorney on behalf of a person entitled to appear as a party before any Court, Tribunal, or Authority. Listings and applications on Jurify&apos;s pro bono board must be used in strict compliance with this Rule.
                </p>
              </div>
            </div>
          </section>
          <div className="mb-16 h-[1px] bg-gradient-to-r from-[rgba(212,133,58,0.15)] via-white/[0.04] to-transparent" />

          {/* S7: DISPUTE RESOLUTION */}
          <section className="tc-section mb-16 scroll-mt-24" id="s7">
            <div className="mb-6">
              <div className="mb-2 text-[10px] font-medium uppercase tracking-[1.5px] text-[var(--og)]">
                Section 07
              </div>
              <h2 className="mb-2 font-serif text-3.5xl font-normal leading-tight tracking-tight text-[var(--t)]">
                Dispute <em className="font-serif italic text-[var(--o2)]">Resolution</em>
              </h2>
              <p className="border-l-2 border-[rgba(212,133,58,0.3)] pl-3.5 text-md font-light leading-relaxed text-[var(--tm)]">
                Any dispute, controversy, or claim arising out of or relating to these Terms, the Platform, or any services provided through it shall be resolved as set out in this Section.
              </p>
            </div>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">7.1 Good-Faith Negotiation</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              In the event of any dispute between a User and Jurify, the parties shall first attempt to resolve the matter through good-faith negotiation. You must submit a written notice of the dispute to{' '}
              <a href="mailto:legal@jurify.in" className="border-b border-[rgba(212,133,58,0.25)] text-[var(--og)] no-underline transition-colors hover:border-[rgba(232,164,74,0.5)] hover:text-[var(--o2)]">
                legal@jurify.in
              </a>
              , describing the nature of the dispute and the relief sought. Jurify will respond within <strong>15 business days</strong> of receipt. The parties agree to negotiate in good faith for a period of <strong>30 days</strong> from the date of Jurify&apos;s response before initiating any formal proceedings.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">7.2 Arbitration</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              If the dispute is not resolved through negotiation under Clause 7.1, it shall be referred to and finally resolved by binding arbitration administered in accordance with the <strong>Arbitration and Conciliation Act, 1996</strong>, as amended. The arbitration shall be conducted by a sole arbitrator appointed by mutual agreement of the parties, failing which the arbitrator shall be appointed in accordance with the said Act. The seat and venue of arbitration shall be <strong>New Delhi, India</strong>. The proceedings shall be conducted in the English language.
            </p>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              The arbitral award shall be final and binding on the parties and may be enforced in any court of competent jurisdiction. Each party shall bear its own costs of arbitration unless the arbitral tribunal expressly directs otherwise.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">7.3 Disputes Between Users</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Jurify is not responsible for and shall not be required to mediate any dispute arising between a Lawyer User and a Client User in connection with a case engagement. Such disputes are solely a matter for the parties concerned and, if unresolved, may be referred to the relevant Bar Council, consumer forum, or court of competent jurisdiction. Jurify may, at its sole discretion, suspend or terminate the accounts of Users who engage in improper conduct in the course of a dispute.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">7.4 Consumer Forum</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Nothing in this Section shall limit your right, as a consumer within the meaning of the <strong>Consumer Protection Act, 2019</strong>, to approach the appropriate Consumer Disputes Redressal Commission. Jurify&apos;s Internal Grievressal mechanism is described in Section 13.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">7.5 Class Action Waiver</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              To the maximum extent permitted by applicable law, you agree that any proceedings to resolve or litigate any dispute arising in connection with the Platform shall be conducted on an individual basis only and not as part of any class, consolidated, or representative action. Nothing in this clause restricts any right you may have under mandatory consumer protection legislation.
            </p>
          </section>
          <div className="mb-16 h-[1px] bg-gradient-to-r from-[rgba(212,133,58,0.15)] via-white/[0.04] to-transparent" />

          {/* S8: INTELLECTUAL PROPERTY */}
          <section className="tc-section mb-16 scroll-mt-24" id="s8">
            <div className="mb-6">
              <div className="mb-2 text-[10px] font-medium uppercase tracking-[1.5px] text-[var(--og)]">
                Section 08
              </div>
              <h2 className="mb-2 font-serif text-3.5xl font-normal leading-tight tracking-tight text-[var(--t)]">
                Intellectual <em className="font-serif italic text-[var(--o2)]">Property</em>
              </h2>
              <p className="border-l-2 border-[rgba(212,133,58,0.3)] pl-3.5 text-md font-light leading-relaxed text-[var(--tm)]">
                All intellectual property rights in and to the Platform and its underlying technology are owned by or licensed to Jurify.
              </p>
            </div>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">8.1 Jurify&apos;s Intellectual Property</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              All intellectual property rights — including but not limited to trademarks, service marks, trade names, logos, software, source code, databases, domain names, designs, and platform documentation — in and to the Platform are and shall remain the exclusive property of Jurify Technologies Private Limited or its licensors. These Terms do not transfer any intellectual property rights to you, and all rights not expressly granted herein are reserved.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">8.2 Licence to Use</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Subject to your compliance with these Terms, Jurify grants you a limited, revocable, non-exclusive, non-transferable, non-sublicensable licence to access and use the Platform for your personal or professional use in accordance with these Terms. You must not reproduce, distribute, modify, adapt, translate, create derivative works of, or exploit any part of the Platform for commercial purposes without Jurify&apos;s prior written consent.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">8.3 User Content Licence</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              By submitting Content to the Platform (including case descriptions, profile information, and messages), you grant Jurify a worldwide, royalty-free, non-exclusive licence to host, store, reproduce, display, and process such Content solely to the extent necessary to provide the Platform&apos;s services. You represent and warrant that you hold all rights necessary to grant this licence and that your Content does not infringe the intellectual property or other rights of any third party.
            </p>
          </section>
          <div className="mb-16 h-[1px] bg-gradient-to-r from-[rgba(212,133,58,0.15)] via-white/[0.04] to-transparent" />

          {/* S9: LIABILITY */}
          <section className="tc-section mb-16 scroll-mt-24" id="s9">
            <div className="mb-6">
              <div className="mb-2 text-[10px] font-medium uppercase tracking-[1.5px] text-[var(--og)]">
                Section 09
              </div>
              <h2 className="mb-2 font-serif text-3.5xl font-normal leading-tight tracking-tight text-[var(--t)]">
                Limitation of <em className="font-serif italic text-[var(--o2)]">Liability</em>
              </h2>
              <p className="border-l-2 border-[rgba(212,133,58,0.3)] pl-3.5 text-md font-light leading-relaxed text-[var(--tm)]">
                This Section sets out the limits and exclusions of Jurify&apos;s liability in connection with the Platform.
              </p>
            </div>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">9.1 No Warranties</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              The Platform is provided on an &quot;as is&quot; and &quot;as available&quot; basis. To the maximum extent permitted by applicable law, Jurify expressly disclaims all warranties, whether express, implied, statutory, or otherwise, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, and any warranties arising from course of dealing or trade usage.
            </p>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              In particular, Jurify makes no warranty that: (a) the Platform will be uninterrupted, error-free, or secure; (b) any defects will be corrected; (c) AI-generated outputs will be accurate, complete, or legally correct; or (d) the Platform will meet your specific requirements.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">9.2 Limitation of Liability</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              To the fullest extent permitted by applicable law, Jurify&apos;s total aggregate liability to you for all claims arising out of or in connection with these Terms or the Platform — whether in contract, tort (including negligence), breach of statutory duty, or otherwise — shall not exceed the greater of: (a) the amount paid by you to Jurify in the <strong>twelve (12) months</strong> preceding the claim; or (b) <strong>₹5,000 (Indian Rupees Five Thousand Only)</strong>.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">9.3 Exclusion of Consequential Loss</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              To the fullest extent permitted by applicable law, Jurify shall not be liable for any: indirect, incidental, special, punitive, exemplary, or consequential loss or damage; loss of profits, revenue, goodwill, or data; loss arising from reliance on AI-generated legal information; loss arising from any act or omission of a Lawyer User or Client User; or loss caused by events beyond Jurify&apos;s reasonable control.
            </p>

            <div className="mt-5 mb-5 flex items-start gap-3.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-[rgba(245,240,234,0.35)]">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.1" />
                  <line x1="7.5" y1="5.5" x2="7.5" y2="8.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                  <circle cx="7.5" cy="10.5" r="0.6" fill="currentColor" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-[var(--tm)] mb-1">Mandatory Consumer Rights</div>
                <p className="text-[13px] font-light leading-relaxed text-[rgba(245,240,234,0.5)]">
                  Nothing in this Section 9 shall exclude or limit Jurify&apos;s liability for fraud, wilful default, personal injury or death caused by Jurify&apos;s negligence, or any liability that cannot be excluded or limited by law, including under the Consumer Protection Act, 2019.
                </p>
              </div>
            </div>
          </section>
          <div className="mb-16 h-[1px] bg-gradient-to-r from-[rgba(212,133,58,0.15)] via-white/[0.04] to-transparent" />

          {/* S10: TERMINATION */}
          <section className="tc-section mb-16 scroll-mt-24" id="s10">
            <div className="mb-6">
              <div className="mb-2 text-[10px] font-medium uppercase tracking-[1.5px] text-[var(--og)]">
                Section 10
              </div>
              <h2 className="mb-2 font-serif text-3.5xl font-normal leading-tight tracking-tight text-[var(--t)]">
                <em className="font-serif italic text-[var(--o2)]">Termination</em>
              </h2>
              <p className="border-l-2 border-[rgba(212,133,58,0.3)] pl-3.5 text-md font-light leading-relaxed text-[var(--tm)]">
                Either party may terminate the user relationship in the circumstances described below.
              </p>
            </div>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">10.1 Termination by You</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              You may close your account at any time by accessing account settings and selecting the account deletion option, or by sending a written request to{' '}
              <a href="mailto:accounts@jurify.in" className="border-b border-[rgba(212,133,58,0.25)] text-[var(--og)] no-underline transition-colors hover:border-[rgba(232,164,74,0.5)] hover:text-[var(--o2)]">
                accounts@jurify.in
              </a>
              . Closure of your account will result in the deletion of your profile and its associated data, subject to Jurify&apos;s legal retention obligations and any ongoing case engagements you are a party to. You remain responsible for any obligations incurred prior to account closure.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">10.2 Termination or Suspension by Jurify</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Jurify reserves the right to suspend or permanently terminate your account, with or without prior notice, in the following circumstances:
            </p>
            <ul className="mb-4 flex flex-col gap-2 pl-0 list-none">
              {[
                <>Breach of any provision of these Terms, including the prohibited conduct provisions in Section 3.4;</>,
                <>Fraudulent, deceptive, or materially inaccurate information provided during registration or KYC;</>,
                <>Disciplinary suspension or disbarment of a Lawyer User by any Bar Council;</>,
                <>Conduct that, in Jurify&apos;s reasonable judgment, poses a risk of harm to other Users, third parties, or Jurify;</>,
                <>Direction of a competent court, regulatory body, or law enforcement authority;</>,
                <>Extended inactivity (no login for more than 24 consecutive months), following 30-days notice by email.</>,
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.6)]">
                  <span className="mt-2 h-1.2 w-1.2 shrink-0 rounded-full bg-[var(--og)] opacity-80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Where practical, Jurify will provide advance written notice and an opportunity to remedy the breach before termination.
            </p>

            <h3 className="text-[15.5px] font-semibold text-[var(--t)] mb-2.5 mt-6">10.3 Effect of Termination</h3>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Upon termination: (a) your licence to use the Platform ceases immediately; (b) any active case engagements should be transitioned appropriately with proper notice to the other party; (c) Sections 1, 5 (data retention obligations), 8, 9, 10.3, 11, and 12 shall survive termination.
            </p>
          </section>
          <div className="mb-16 h-[1px] bg-gradient-to-r from-[rgba(212,133,58,0.15)] via-white/[0.04] to-transparent" />

          {/* S11: GOVERNING LAW */}
          <section className="tc-section mb-16 scroll-mt-24" id="s11">
            <div className="mb-6">
              <div className="mb-2 text-[10px] font-medium uppercase tracking-[1.5px] text-[var(--og)]">
                Section 11
              </div>
              <h2 className="mb-2 font-serif text-3.5xl font-normal leading-tight tracking-tight text-[var(--t)]">
                Governing <em className="font-serif italic text-[var(--o2)]">Law</em>
              </h2>
            </div>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              These Terms and any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with them or their subject matter or formation shall be governed by and construed in accordance with the laws of the <strong>Republic of India</strong>, without regard to its conflict of law principles.
            </p>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Subject to the arbitration clause in Section 7.2, the courts of <strong>New Delhi, India</strong> shall have exclusive jurisdiction to settle any dispute or claim (including non-contractual disputes or claims) that falls outside the scope of the arbitration agreement or that requires interim injunctive relief.
            </p>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              If any provision of these Terms is held to be invalid, unenforceable, or in conflict with the law of any jurisdiction, that provision shall be deemed modified to the minimum extent necessary to make it valid, legal, and enforceable, and the remaining provisions shall continue in full force and effect.
            </p>
          </section>
          <div className="mb-16 h-[1px] bg-gradient-to-r from-[rgba(212,133,58,0.15)] via-white/[0.04] to-transparent" />

          {/* S12: AMENDMENTS */}
          <section className="tc-section mb-16 scroll-mt-24" id="s12">
            <div className="mb-6">
              <div className="mb-2 text-[10px] font-medium uppercase tracking-[1.5px] text-[var(--og)]">
                Section 12
              </div>
              <h2 className="mb-2 font-serif text-3.5xl font-normal leading-tight tracking-tight text-[var(--t)]">
                <em className="font-serif italic text-[var(--o2)]">Amendments</em>
              </h2>
            </div>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Jurify reserves the right to modify, update, or replace these Terms at any time. We will provide notice of material changes by:
            </p>
            <ul className="mb-4 flex flex-col gap-2 pl-0 list-none">
              {[
                <>Posting the updated Terms on the Platform with a revised &quot;Last Updated&quot; date;</>,
                <>Sending an email notification to the registered email address on your account; and/or</>,
                <>Displaying a prominent notice within the Platform interface for a period of at least 14 days prior to the changes taking effect.</>,
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.6)]">
                  <span className="mt-2 h-1.2 w-1.2 shrink-0 rounded-full bg-[var(--og)] opacity-80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              Changes will take effect <strong>14 calendar days</strong> after notice is posted or sent. Your continued use of the Platform after that date constitutes acceptance of the revised Terms. If you do not agree to the revised Terms, you must cease using the Platform before the effective date and may request account closure in accordance with Section 10.1. We will maintain an archive of prior versions of these Terms, accessible upon written request.
            </p>
          </section>
          <div className="mb-16 h-[1px] bg-gradient-to-r from-[rgba(212,133,58,0.15)] via-white/[0.04] to-transparent" />

          {/* S13: CONTACT */}
          <section className="tc-section mb-16 scroll-mt-24" id="s13">
            <div className="mb-6">
              <div className="mb-2 text-[10px] font-medium uppercase tracking-[1.5px] text-[var(--og)]">
                Section 13
              </div>
              <h2 className="mb-2 font-serif text-3.5xl font-normal leading-tight tracking-tight text-[var(--t)]">
                Contact &amp; <em className="font-serif italic text-[var(--o2)]">Grievances</em>
              </h2>
              <p className="border-l-2 border-[rgba(212,133,58,0.3)] pl-3.5 text-md font-light leading-relaxed text-[var(--tm)]">
                Jurify has appointed a Grievance Officer in accordance with Rule 3(11) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
              </p>
            </div>

            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mb-4">
              If you have any queries, concerns, or complaints regarding these Terms, your data, the Platform, or any services provided through it, please contact:
            </p>

            <div className="grid grid-cols-1 gap-5 rounded-2xl border border-white/[0.08] bg-[rgba(14,13,11,0.8)] p-7 sm:grid-cols-3">
              <div className="flex flex-col gap-1">
                <div className="text-[10.5px] font-medium uppercase tracking-[1px] text-[rgba(245,240,234,0.28)]">
                  Grievance Officer
                </div>
                <div className="text-[14px] text-[var(--t)] font-normal">To be designated</div>
                <div className="text-[12px] text-[rgba(245,240,234,0.22)] mt-0.5">
                  Jurify Technologies Pvt. Ltd.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[10.5px] font-medium uppercase tracking-[1px] text-[rgba(245,240,234,0.28)]">
                  Email
                </div>
                <div className="text-[14px] text-[var(--t)] font-normal">
                  <a href="mailto:legal@jurify.in" className="text-[var(--og)] no-underline hover:text-[var(--o2)] hover:underline">
                    legal@jurify.in
                  </a>
                </div>
                <div className="text-[10.5px] font-medium uppercase tracking-[1px] text-[rgba(245,240,234,0.28)] mt-1.5">
                  General Support
                </div>
                <div className="text-[14px] text-[var(--t)] font-normal">
                  <a href="mailto:support@jurify.in" className="text-[var(--og)] no-underline hover:text-[var(--o2)] hover:underline">
                    support@jurify.in
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[10.5px] font-medium uppercase tracking-[1px] text-[rgba(245,240,234,0.28)]">
                  Response Time
                </div>
                <div className="text-[14px] text-[var(--t)] font-normal">Within 24 hours</div>
                <div className="text-[12px] text-[rgba(245,240,234,0.22)] mt-0.5">
                  Grievance resolution within 30 days of receipt
                </div>
              </div>
            </div>

            <p className="text-[14px] font-light leading-relaxed text-[rgba(245,240,234,0.62)] mt-6">
              Complaints relating to data privacy should be addressed specifically to our Grievance Officer by email, clearly marked &quot;DATA PRIVACY COMPLAINT&quot;. Users who are not satisfied with the resolution of a grievance may escalate the matter to the <strong>Data Protection Board of India</strong> (once constituted and operational under the DPDPA) or approach an appropriate consumer forum.
            </p>

            <div className="mt-5 mb-5 flex items-start gap-3.5 rounded-xl border border-[rgba(212,133,58,0.2)] bg-[rgba(212,133,58,0.07)] p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(212,133,58,0.12)] text-[var(--og)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="8" y1="6" x2="8" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="8" cy="11" r="0.7" fill="currentColor" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-[var(--t)] mb-1">Acknowledgement</div>
                <p className="text-[13px] font-light leading-relaxed text-[rgba(245,240,234,0.5)]">
                  By using the Jurify Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions in their entirety. These Terms were last reviewed and updated on <strong>23 May 2026</strong>. The version currently in effect is <strong>Version 2.1</strong>.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
