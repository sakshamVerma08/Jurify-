import type {
  InsightArticle,
  InsightCategory,
  InsightComment,
  InsightMyPost,
  InsightRelatedPost,
  InsightSortOption,
} from '@/types'

export const INSIGHT_CATEGORIES: InsightCategory[] = [
  'All Topics',
  'Family Law',
  'Criminal Law',
  'Property Law',
  'Civil Rights',
  'Labour Rights',
  'Consumer',
  'Cyber Law',
]

export const INSIGHT_SORT_OPTIONS: { value: InsightSortOption; label: string }[] = [
  { value: 'latest', label: 'Sort: Latest' },
  { value: 'reads', label: 'Sort: Most Read' },
  { value: 'likes', label: 'Sort: Most Liked' },
]

export const INSIGHT_WRITE_CATEGORIES = [
  'Family Law',
  'Criminal Law',
  'Property Law',
  'Civil Rights',
  'Labour Rights',
  'Consumer Protection',
  'Cyber Law',
  'Constitutional Law',
  'Pro Bono',
  'Legal Aid',
] as const

export const INSIGHT_MY_POST_STATS = [
  { label: 'Total Articles', value: '12' },
  { label: 'Total Views', value: '24.8k' },
  { label: 'Total Likes', value: '1,204' },
  { label: 'Comments', value: '342' },
] as const

const FEATURED_CONTENT = `
<p>The moment a police officer approaches you for questioning, a cascade of constitutional protections immediately activates. Understanding these protections is not about obstructing the law — it is about exercising rights that Parliament and the Supreme Court have affirmed repeatedly over seven decades.</p>
<h2>The Constitutional <em>Foundation</em></h2>
<p>Article 20(3) of the Constitution provides the bedrock protection: <strong>"No person accused of any offence shall be compelled to be a witness against himself."</strong> This protection, commonly called the right against self-incrimination, is one of the six rights under Article 20 that cannot be suspended even during a state of national emergency.</p>
<blockquote>The right to remain silent is not a privilege — it is a constitutional guarantee. A suspect who exercises this right is not being uncooperative; they are being constitutionally obedient.</blockquote>
<p>The Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, which replaced the Code of Criminal Procedure, preserves all these protections under Sections 173 and 180. The burden of proof remains entirely on the prosecution, and no adverse inference can be drawn from a person's refusal to speak to police.</p>
<h2>What Police <em>Can</em> Require</h2>
<ul>
<li>Your name and address (non-disclosure is an offence under Section 179 IPC/BNS)</li>
<li>Attend an inquiry in a non-arrested capacity (but you retain the right to silence)</li>
<li>Provide fingerprints or other biometric data in specific circumstances under court order</li>
</ul>
<h2>What Police <em>Cannot</em> Require</h2>
<ul>
<li>Force you to answer questions about the alleged offence</li>
<li>Demand your device passwords (though a court can issue a compulsion order under the DPDPA, 2023)</li>
<li>Threaten you to obtain a statement</li>
</ul>
<div class="citation"><strong>Case Reference:</strong> Nandini Satpathy v. P.L. Dani (1978) — The Supreme Court held that the right against self-incrimination extends not just to accused persons in court but also to witnesses and suspects at the police station stage.</div>
<h3>Practical Steps If You Are Summoned</h3>
<p>If you receive a police summons under Section 91 BNSS, you are legally required to appear, but appearance does not mean cooperation with interrogation. You should immediately consult an advocate. If you cannot afford one, the Legal Services Authority in your district is obligated to provide free legal aid under the Legal Services Authorities Act, 1987.</p>
<p>When you appear, you may state your name and address, present any documents required by the summons, and then respectfully decline to answer further questions, stating that you are exercising your right under Article 20(3). You cannot be arrested merely for exercising this right.</p>
`

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: 'right-to-silence',
    title: 'Your Right to Silence: What Police Can and Cannot Do During Questioning',
    excerpt:
      'The right against self-incrimination is one of the most fundamental protections in Indian criminal law. Under Article 20(3) of the Constitution, no person accused of an offence shall be compelled to be a witness against themselves.',
    subtitle:
      "Understanding Article 20(3) and the right against self-incrimination — what it protects, when it applies, and what to do if you're summoned for questioning.",
    category: 'Civil Rights',
    categoryTab: 'Civil Rights',
    thumbVariant: '',
    featured: true,
    author: {
      name: 'Adv. Priya Mehta',
      initials: 'PM',
      role: 'Delhi HC · Family Law & Civil Rights',
      verified: true,
      profileHref: '/lawyers/priya-mehta',
      articleCount: 12,
      bio: 'Committed to accessible justice through pro bono work. Regularly speaks at legal aid clinics across Delhi NCR and contributes to Jurify Insights.',
    },
    date: 'May 20, 2026',
    readTime: '8 min read',
    views: '3.4k views',
    viewsNum: 3400,
    likes: 248,
    comments: 34,
    tags: ['Civil Rights', 'Criminal Law', 'BNSS 2023', 'Police Powers', 'Article 20', 'Self-Incrimination'],
    contentHtml: FEATURED_CONTENT,
  },
  {
    id: 'section-125-crpc',
    title: 'Section 125 CrPC: Maintenance Rights for Women and Children',
    excerpt:
      'Everything you need to know about claiming maintenance — who qualifies, how to apply, and what courts look for.',
    category: 'Family Law',
    categoryTab: 'Family Law',
    thumbVariant: '',
    author: { name: 'Adv. Priya Mehta', initials: 'PM', role: 'Delhi HC', verified: true, profileHref: '/lawyers/priya-mehta' },
    date: 'May 12, 2026',
    readTime: '8 min',
    views: '2.1k',
    viewsNum: 2100,
    likes: 186,
    comments: 22,
  },
  {
    id: 'model-tenancy-act',
    title: 'Understanding the Model Tenancy Act, 2021: A Guide for Renters',
    excerpt:
      'The Model Tenancy Act attempts to balance landlord and tenant rights. Here is what it means for your rental agreement.',
    category: 'Property Law',
    categoryTab: 'Property Law',
    thumbVariant: 'blue',
    author: { name: 'Adv. Vikram Choudhary', initials: 'VC', role: 'Jaipur · Property Law', verified: true },
    date: 'May 8, 2026',
    readTime: '6 min',
    views: '3.8k',
    viewsNum: 3800,
    likes: 241,
    comments: 31,
  },
  {
    id: 'consumer-complaints',
    title: 'Consumer Complaints: How to Get Justice Without a Lawyer',
    excerpt:
      'A practical step-by-step guide to filing a complaint before the District Consumer Disputes Redressal Commission.',
    category: 'Consumer',
    categoryTab: 'Consumer',
    thumbVariant: 'green',
    author: { name: 'Adv. Lakshmi Iyer', initials: 'LI', role: 'Chennai · Consumer Protection', verified: true },
    date: 'May 3, 2026',
    readTime: '7 min',
    views: '1.9k',
    viewsNum: 1900,
    likes: 157,
    comments: 18,
  },
  {
    id: 'cyber-harassment',
    title: 'Cyber Harassment and the IT Act: What the Law Says in 2026',
    excerpt:
      'From cyberstalking to morphed images — a comprehensive overview of your digital rights and legal remedies.',
    category: 'Cyber Law',
    categoryTab: 'Cyber Law',
    thumbVariant: 'purple',
    author: { name: 'Adv. Siddharth Nair', initials: 'SN', role: 'Bangalore · Cyber Law', verified: true },
    date: 'Apr 28, 2026',
    readTime: '9 min',
    views: '4.2k',
    viewsNum: 4200,
    likes: 312,
    comments: 44,
  },
  {
    id: 'pro-bono-duty',
    title: 'Pro Bono Work in India: Why Every Advocate Has a Duty',
    excerpt:
      'Bar Council Rule 46 and professional ethics aside — why the best advocates see pro bono as core to practice.',
    category: 'Pro Bono',
    categoryTab: 'Civil Rights',
    thumbVariant: '',
    author: { name: 'Adv. Meera Pillai', initials: 'MP', role: 'Kochi · Immigration Law', verified: true },
    date: 'Apr 22, 2026',
    readTime: '5 min',
    views: '1.4k',
    viewsNum: 1400,
    likes: 98,
    comments: 12,
  },
  {
    id: 'gig-workers',
    title: "Labour Rights for Gig Workers: What the Law Does (and Doesn't) Protect",
    excerpt:
      'Platform workers, delivery agents, and freelancers occupy a legal grey zone. This article maps the current landscape.',
    category: 'Labour Rights',
    categoryTab: 'Labour Rights',
    thumbVariant: 'green',
    author: { name: 'Adv. Arjun Gupta', initials: 'AG', role: 'Lucknow · Labour Rights', verified: false },
    date: 'Apr 15, 2026',
    readTime: '10 min',
    views: '2.7k',
    viewsNum: 2700,
    likes: 203,
    comments: 28,
  },
]

export const INSIGHT_COMMENTS: InsightComment[] = [
  {
    id: 'c1',
    authorInitial: 'R',
    authorName: 'Ramesh Chauhan',
    time: '2 days ago',
    text: "This is extremely helpful. I was called for questioning last month and had no idea I could refuse to answer. The police made it seem like I had no choice. I'll share this article with my community.",
    likes: 12,
    replies: [
      {
        id: 'c1-r1',
        authorInitial: 'PM',
        authorName: 'Adv. Priya Mehta ✓',
        authorHighlight: true,
        time: '2 days ago',
        text: 'Thank you, Ramesh. This is exactly why I write these articles. Please note that if you were compelled to answer under duress, any statement obtained may be challengeable as evidence. Feel free to DM me for a free consultation.',
        likes: 0,
      },
    ],
  },
  {
    id: 'c2',
    authorInitial: 'S',
    authorName: 'Suresh Pillai',
    time: '1 day ago',
    text: "Does this apply if you are a witness and not the accused? My neighbour's case has me as a witness and I was asked to come to the station.",
    likes: 8,
  },
]

export const INSIGHT_RELATED: InsightRelatedPost[] = [
  { id: 'bail-guide', title: 'Understanding Bail: Anticipatory vs Regular Bail in India', author: 'Adv. Arjun Gupta', readTime: '6 min' },
  { id: 'fir-guide', title: 'FIR Filing: A Complete Step-by-Step Guide', author: 'Adv. Lakshmi Iyer', readTime: '5 min' },
  { id: 'custody-rights', title: 'What Happens After Arrest: Your Rights in Custody', author: 'Adv. Priya Mehta', readTime: '7 min' },
]

export const INSIGHT_MY_POSTS: InsightMyPost[] = [
  { id: 'mp1', title: 'Your Right to Silence: What Police Can and Cannot Do', category: 'Civil Rights', status: 'published', date: 'May 20, 2026', views: '3.4k', likes: 248, comments: 34 },
  { id: 'mp2', title: 'Section 125 CrPC: Maintenance Rights for Women and Children', category: 'Family Law', status: 'published', date: 'May 12, 2026', views: '2.1k', likes: 186, comments: 22 },
  { id: 'mp3', title: 'Child Custody in India: A Guide for Mothers', category: 'Family Law', status: 'published', date: 'Apr 5, 2026', views: '4.8k', likes: 314, comments: 47 },
  { id: 'mp4', title: 'Pro Bono Duty: Why Every Advocate Must Serve', category: 'Pro Bono', status: 'under-review', date: 'Draft · Updated May 23', views: '—', likes: 0, comments: 0 },
  { id: 'mp5', title: 'Understanding Domestic Violence Laws: A Plain-Language Guide', category: 'Criminal Law', status: 'draft', date: 'Draft · May 21', views: '—', likes: 0, comments: 0 },
]

export function getFeaturedArticle(): InsightArticle {
  return INSIGHT_ARTICLES.find((a) => a.featured) ?? INSIGHT_ARTICLES[0]
}

export function getGridArticles(): InsightArticle[] {
  return INSIGHT_ARTICLES.filter((a) => !a.featured)
}

export function filterInsightArticles(
  articles: InsightArticle[],
  opts: {
    searchQuery: string
    category: InsightCategory
    verifiedOnly: boolean
    sortBy: InsightSortOption
  }
): InsightArticle[] {
  const q = opts.searchQuery.trim().toLowerCase()

  const matchesCategory = (a: InsightArticle) => {
    if (opts.category === 'All Topics') return true
    if (opts.category === 'Consumer') {
      return a.category === 'Consumer' || a.categoryTab === 'Consumer'
    }
    return a.categoryTab === opts.category || a.category === opts.category
  }

  let result = articles.filter((a) => {
    if (!matchesCategory(a)) return false
    if (opts.verifiedOnly && !a.author.verified) return false
    if (q) {
      const match =
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.author.name.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      if (!match) return false
    }
    return true
  })

  result = [...result]
  if (opts.sortBy === 'reads') result.sort((a, b) => b.viewsNum - a.viewsNum)
  else if (opts.sortBy === 'likes') result.sort((a, b) => b.likes - a.likes)
  return result
}
