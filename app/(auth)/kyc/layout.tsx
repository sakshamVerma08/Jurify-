import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lawyer Verification — Jurify',
  description: 'Complete your lawyer KYC verification on Jurify — upload documents, set up your profile, and get verified.',
}

export default function KycLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
