import { InsightsPostView } from '@/components/insights/InsightsPostView'

export default async function InsightsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <InsightsPostView slug={slug} />
}
