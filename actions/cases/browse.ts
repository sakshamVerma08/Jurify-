'use server'

import { prisma } from '@/lib/prisma/prisma'

import { formatDistanceToNow } from 'date-fns'

function mapStageToFrontend(stage: string) {
  switch (stage) {
    case 'INITIAL_CONSULTATION': return { stage: 'initial', label: 'Initial Stage' }
    case 'INVESTIGATION': return { stage: 'investigation', label: 'Investigation' }
    case 'PRE_HEARING': return { stage: 'hearing', label: 'Pre-Hearing' }
    case 'TRIAL': return { stage: 'trial', label: 'Trial' }
    case 'VERDICT': return { stage: 'verdict', label: 'Verdict' }
    case 'APPEAL': return { stage: 'appeal', label: 'Appeal' }
    default: return { stage: 'initial', label: 'Initial Stage' }
  }
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0) return 'U'
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

export async function getAllCasesAction() {
  try {
    const cases = await prisma.case.findMany({
      where: {
        status: 'OPEN',
        // Only fetch cases that do NOT have any ACCEPTED applications
        applications: {
          none: {
            status: 'ACCEPTED'
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      include: {
        client: true, // Join to get poster info
      }
    })

    const formattedCases = cases.map((c) => {
      const { stage, label } = mapStageToFrontend(c.stage)
      const posterName = c.client.name || 'Anonymous User'

      return {
        id: c.id,
        title: c.title,
        category: c.category,
        isProBono: c.isProBono,
        stage: stage as any,
        stageLabel: label,
        urgency: c.urgency.toLowerCase() as any, // 'high', 'medium', 'low'
        location: c.location || 'Not specified',
        incidentDate: c.incidentDate 
          ? c.incidentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          : 'Unknown',
        deadline: c.deadline 
          ? c.deadline.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          : 'None',
        description: c.description,
        opposingParty: c.opposingParty || 'None',
        poster: {
          name: posterName,
          initials: getInitials(posterName),
          role: c.client.role === 'CLIENT' ? 'Client' : c.client.role
        },
        postedAgo: formatDistanceToNow(new Date(c.createdAt), { addSuffix: true }),
      }
    })

    return { success: true, cases: formattedCases }
  } catch (error) {
    console.error('[getAllCasesAction] Error:', error)
    return { success: false, error: 'Failed to load cases feed.' }
  }
}
