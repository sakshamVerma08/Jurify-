import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Adv. Priya Mehta — Jurify',
  description: 'View Advocate Priya Mehta\'s professional profile — credentials, availability, testimonials, and case history on Jurify.',
}

export default function LawyerProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
