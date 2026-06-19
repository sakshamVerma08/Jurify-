import Link from 'next/link'

export function KycSubmittedStatus({ referenceNumber, status }: { referenceNumber: string, status: string }) {
  return (
    <div className="flex min-h-[calc(100vh-68px)] items-center justify-center p-6">
      <div className="w-full max-w-[440px] rounded-2xl border border-white/10 bg-[#0e0d0b] px-6 py-10 text-center shadow-2xl">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-og/30 bg-og/10 shadow-[0_0_40px_rgba(212,133,58,0.2)]">
          {status === 'APPROVED' ? (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <path d="M8 18l6 6 14-14" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : status === 'REJECTED' ? (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <path d="M12 12l12 12m0-12L12 24" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <path d="M8 18l6 6 14-14" stroke="#D4853A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <h2 className="mb-3 font-serif text-[34px] font-light tracking-[-0.5px] text-[var(--t)]">
          Application <em className="italic text-o2">{status.charAt(0) + status.slice(1).toLowerCase()}</em>
        </h2>
        <p className="mb-6 text-sm font-light leading-relaxed text-[var(--tm)]">
          {status === 'APPROVED' 
            ? "Your KYC application has been approved! You now have full access to Jurify's features."
            : status === 'REJECTED'
            ? "Your KYC application was rejected. Please contact support for more details."
            : "Your verification application has been received. The Jurify team will review your documents and activate your Verified badge within 2–3 business days."}
        </p>
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/10 px-4 py-2 text-xs text-success">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5.5" stroke="#4ade80" strokeWidth="1.2" />
            <path d="M4.5 7l2 2 3-3" stroke="#4ade80" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Application ID: {referenceNumber}
        </div>
        <Link
          href="/cases"
          className="btn-gradient-nav mx-auto flex w-fit cursor-pointer items-center justify-center gap-2 rounded-[10px] border-none px-7 py-3.5 font-sans text-sm font-medium text-white no-underline transition-all duration-200 hover:-translate-y-px hover:opacity-92"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
            <path d="M5 5h4M5 7h4M5 9h2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          Browse Cases
        </Link>
      </div>
    </div>
  )
}
