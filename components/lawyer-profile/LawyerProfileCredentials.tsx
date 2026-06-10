// FILE: components/lawyer-profile/LawyerProfileCredentials.tsx
// TYPE: Server Component

import { ProfileSectionCard } from '@/components/lawyer-profile/ProfileSectionCard'
import type { LawyerCredential } from '@/types'

interface LawyerProfileCredentialsProps {
  credentials: LawyerCredential[]
  practiceTags: string[]
}

export function LawyerProfileCredentials({ credentials, practiceTags }: LawyerProfileCredentialsProps) {
  return (
    <ProfileSectionCard
      tag="Section 02"
      title={
        <>
          Professional <em className="italic text-o2">Credentials</em>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        {credentials.map((cred) => (
          <div
            key={cred.label}
            className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-[18px] py-4 transition-colors duration-200 hover:border-og/20"
          >
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[1px] text-[rgba(245,240,234,0.28)]">
              {cred.label}
            </p>
            <p className="text-sm text-[var(--t)]">{cred.value}</p>
            <p className="mt-0.5 text-[11.5px] text-[var(--td)]">{cred.sub}</p>
          </div>
        ))}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-[18px] py-4 md:col-span-2">
          <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[1px] text-[rgba(245,240,234,0.28)]">
            Practice Areas
          </p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {practiceTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-og/20 bg-og/10 px-2.5 py-1 text-[11px] text-[rgba(212,133,58,0.85)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ProfileSectionCard>
  )
}
