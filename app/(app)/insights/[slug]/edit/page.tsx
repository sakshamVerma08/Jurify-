import { InsightsWriteView } from '@/components/insights/InsightsWriteView'

export default async function InsightsEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <InsightsWriteView slug={slug} isEditMode={true} />
}
