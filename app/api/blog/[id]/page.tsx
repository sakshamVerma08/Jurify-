import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  MessageSquare,
  Bookmark,
  Share2,
  Eye,
  Calendar,
  Clock,
  ArrowLeft,
  Send,
  ThumbsUp,
  Reply,
} from "lucide-react"
import Link from "next/link"

// Mock article data
const article = {
  id: "1",
  title: "Navigating the Complexities of Immigration Law in 2025",
  content: `
    <p>Immigration law continues to evolve rapidly, with significant changes affecting both practitioners and clients. As we navigate through 2025, several key developments are reshaping the landscape of immigration practice.</p>

    <h2>Recent Policy Changes</h2>
    <p>The most significant changes this year include updates to asylum procedures, modifications to family-based immigration processes, and new requirements for employment-based visas. These changes require practitioners to stay current with evolving regulations and adapt their practice accordingly.</p>

    <h3>Asylum Law Updates</h3>
    <p>New guidelines for asylum interviews have been implemented, emphasizing the importance of thorough preparation and documentation. Practitioners must now ensure that clients understand the enhanced evidentiary requirements and the importance of consistency in their testimony.</p>

    <h3>Family-Based Immigration</h3>
    <p>Processing times for family-based petitions have seen both improvements and setbacks depending on the category. The introduction of new forms and documentation requirements means that attention to detail is more critical than ever.</p>

    <h2>Best Practices for Practitioners</h2>
    <p>To effectively serve clients in this changing environment, immigration attorneys should focus on:</p>
    
    <ul>
      <li>Staying updated with the latest policy changes through reliable sources</li>
      <li>Maintaining detailed case documentation and client communication records</li>
      <li>Building relationships with other immigration practitioners for knowledge sharing</li>
      <li>Investing in continuing education and specialized training</li>
    </ul>

    <h2>Technology and Immigration Practice</h2>
    <p>The integration of technology in immigration practice has accelerated, with new case management systems and client communication tools becoming essential. Practitioners who embrace these tools are finding improved efficiency and better client outcomes.</p>

    <h2>Looking Ahead</h2>
    <p>As we move forward, the immigration law landscape will continue to evolve. Practitioners who remain adaptable, continue learning, and maintain a client-centered approach will be best positioned to navigate these changes successfully.</p>

    <p>The key to success in immigration law practice remains the same: thorough preparation, attention to detail, and genuine care for clients who are often facing life-changing situations. By staying informed and maintaining high professional standards, we can continue to serve our clients effectively while contributing to a more just immigration system.</p>
  `,
  author: {
    name: "Maria Rodriguez",
    title: "Senior Immigration Attorney",
    firm: "NYC Legal Aid Society",
    avatar: "/placeholder.svg?key=maria",
    verified: true,
    bio: "Maria has been practicing immigration law for over 12 years, specializing in asylum cases and family reunification. She has successfully handled over 500 cases and is a frequent speaker at immigration law conferences.",
    followers: 2340,
    posts: 15,
  },
  publishedAt: "2025-01-15",
  updatedAt: "2025-01-15",
  readTime: "8 min read",
  category: "Immigration Law",
  tags: ["Immigration", "Policy", "Practice Tips", "2025 Updates"],
  views: 1247,
  likes: 89,
  bookmarks: 34,
  comments: 23,
  featured: true,
  image: "/immigration-law-office.jpg",
}

const comments = [
  {
    id: "1",
    author: {
      name: "David Kim",
      title: "Immigration Attorney",
      avatar: "/placeholder.svg?key=david",
    },
    content:
      "Excellent overview of the current landscape. The section on asylum law updates is particularly helpful. I've been seeing these changes impact my cases directly.",
    publishedAt: "2025-01-16",
    likes: 12,
    replies: [
      {
        id: "1-1",
        author: {
          name: "Maria Rodriguez",
          title: "Senior Immigration Attorney",
          avatar: "/placeholder.svg?key=maria",
        },
        content:
          "Thank you, David! I'm glad you found it useful. The asylum changes have definitely been challenging to navigate.",
        publishedAt: "2025-01-16",
        likes: 5,
      },
    ],
  },
  {
    id: "2",
    author: {
      name: "Jennifer Walsh",
      title: "Solo Practitioner",
      avatar: "/placeholder.svg?key=jennifer",
    },
    content:
      "This is exactly what I needed to read. As a newer practitioner, staying on top of all these changes can be overwhelming. Your practical tips are very actionable.",
    publishedAt: "2025-01-16",
    likes: 8,
    replies: [],
  },
  {
    id: "3",
    author: {
      name: "Robert Chen",
      title: "Legal Aid Attorney",
      avatar: "/placeholder.svg?key=robert",
    },
    content:
      "The technology section resonates with me. We've recently implemented a new case management system and it's made a huge difference in our efficiency.",
    publishedAt: "2025-01-17",
    likes: 6,
    replies: [],
  },
]

const relatedArticles = [
  {
    id: "2",
    title: "Pro Bono Work: Building Your Career While Making a Difference",
    author: "David Kim",
    readTime: "6 min read",
    category: "Career Development",
  },
  {
    id: "3",
    title: "Understanding Client Confidentiality in the Digital Age",
    author: "Robert Chen",
    readTime: "7 min read",
    category: "Legal Ethics",
  },
  {
    id: "4",
    title: "Building a Successful Solo Practice: Lessons from the Field",
    author: "Jennifer Walsh",
    readTime: "9 min read",
    category: "Practice Management",
  },
]

export default function BlogArticlePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Header */}
            <div className="mb-8">
              {article.image && (
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg mb-6"
                />
              )}

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline">{article.category}</Badge>
                {article.featured && <Badge>Featured</Badge>}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight text-balance">{article.title}</h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={article.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {article.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{article.author.name}</p>
                    <p className="text-sm text-muted-foreground">{article.author.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <Clock className="h-4 w-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    {article.likes}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4 mr-2" />
                    {article.bookmarks}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{article.views} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{article.comments} comments</span>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div
                  className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </CardContent>
            </Card>

            {/* Author Bio */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={article.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {article.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{article.author.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {article.author.title} at {article.author.firm}
                        </p>
                      </div>
                      <Button variant="outline">Follow</Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{article.author.bio}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{article.author.posts} articles</span>
                      <span>{article.author.followers} followers</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle>Comments ({article.comments})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add Comment */}
                <div className="space-y-4">
                  <Textarea placeholder="Share your thoughts on this article..." />
                  <div className="flex justify-end">
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="space-y-4">
                      <div className="flex gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {comment.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm">{comment.author.name}</p>
                            <p className="text-xs text-muted-foreground">{comment.author.title}</p>
                            <span className="text-xs text-muted-foreground">•</span>
                            <p className="text-xs text-muted-foreground">
                              {new Date(comment.publishedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-sm mb-3">{comment.content}</p>
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Reply className="h-4 w-4 mr-1" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-14 space-y-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-4">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={reply.author.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {reply.author.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-medium text-sm">{reply.author.name}</p>
                                  <p className="text-xs text-muted-foreground">{reply.author.title}</p>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(reply.publishedAt).toLocaleDateString()}
                                  </p>
                                </div>
                                <p className="text-sm mb-2">{reply.content}</p>
                                <Button variant="ghost" size="sm">
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  {reply.likes}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Article Actions */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Like ({article.likes})
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Bookmark ({article.bookmarks})
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Article
                </Button>
              </CardContent>
            </Card>

            {/* Related Articles */}
            <Card>
              <CardHeader>
                <CardTitle>Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedArticles.map((related) => (
                  <div key={related.id} className="p-3 border border-border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">
                      <Link href={`/blog/${related.id}`} className="hover:text-primary transition-colors">
                        {related.title}
                      </Link>
                    </h4>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>by {related.author}</span>
                      <span>{related.readTime}</span>
                    </div>
                    <Badge variant="outline" className="text-xs mt-2">
                      {related.category}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle>Stay Updated</CardTitle>
                <CardDescription>Get similar articles delivered to your inbox</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">Subscribe to Newsletter</Button>
                <p className="text-xs text-muted-foreground text-center">Weekly digest of legal insights</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
