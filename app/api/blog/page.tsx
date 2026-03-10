import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Eye, MessageSquare, Heart, Bookmark, TrendingUp, Award, Users, Plus, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock blog posts data
const blogPosts = [
  {
    id: "1",
    title: "Navigating the Complexities of Immigration Law in 2025",
    excerpt:
      "A comprehensive guide to the latest changes in immigration policy and how they affect legal practice. Essential reading for attorneys working with immigrant communities.",
    content:
      "Immigration law continues to evolve rapidly, with significant changes affecting both practitioners and clients...",
    author: {
      name: "Maria Rodriguez",
      title: "Senior Immigration Attorney",
      firm: "NYC Legal Aid Society",
      avatar: "/placeholder.svg?key=maria",
      verified: true,
    },
    publishedAt: "2025-01-15",
    readTime: "8 min read",
    category: "Immigration Law",
    tags: ["Immigration", "Policy", "Practice Tips"],
    views: 1247,
    likes: 89,
    comments: 23,
    featured: true,
    image: "/immigration-law-office.jpg",
  },
  {
    id: "2",
    title: "Pro Bono Work: Building Your Career While Making a Difference",
    excerpt:
      "How young lawyers can leverage pro bono opportunities to gain experience, build networks, and create meaningful impact in their communities.",
    content:
      "Pro bono work offers invaluable opportunities for career development while serving those who need legal help most...",
    author: {
      name: "David Kim",
      title: "Managing Partner",
      firm: "Kim & Associates",
      avatar: "/placeholder.svg?key=david",
      verified: true,
    },
    publishedAt: "2025-01-12",
    readTime: "6 min read",
    category: "Career Development",
    tags: ["Pro Bono", "Career", "Young Lawyers"],
    views: 892,
    likes: 67,
    comments: 18,
    featured: false,
    image: "/lawyers-helping-community.jpg",
  },
  {
    id: "3",
    title: "The Future of Legal Tech: AI and Automation in Law Practice",
    excerpt:
      "Exploring how artificial intelligence and automation are transforming legal practice and what lawyers need to know to stay competitive.",
    content: "The legal industry is experiencing a technological revolution that's changing how we practice law...",
    author: {
      name: "Sarah Chen",
      title: "Legal Technology Consultant",
      firm: "Chen & Associates",
      avatar: "/placeholder.svg?key=sarah",
      verified: true,
    },
    publishedAt: "2025-01-10",
    readTime: "10 min read",
    category: "Legal Technology",
    tags: ["AI", "Technology", "Future of Law"],
    views: 1456,
    likes: 124,
    comments: 31,
    featured: true,
    image: "/legal-technology-ai.jpg",
  },
  {
    id: "4",
    title: "Understanding Client Confidentiality in the Digital Age",
    excerpt:
      "Best practices for maintaining attorney-client privilege and confidentiality when using digital communication tools and cloud services.",
    content:
      "Digital communication has revolutionized legal practice, but it also presents new challenges for maintaining confidentiality...",
    author: {
      name: "Robert Chen",
      title: "Ethics Counsel",
      firm: "State Bar Association",
      avatar: "/placeholder.svg?key=robert",
      verified: true,
    },
    publishedAt: "2025-01-08",
    readTime: "7 min read",
    category: "Legal Ethics",
    tags: ["Ethics", "Confidentiality", "Digital Security"],
    views: 743,
    likes: 52,
    comments: 14,
    featured: false,
    image: "/legal-ethics-digital-security.jpg",
  },
  {
    id: "5",
    title: "Building a Successful Solo Practice: Lessons from the Field",
    excerpt:
      "Practical advice from experienced solo practitioners on starting and growing a successful independent law practice.",
    content:
      "Starting a solo practice can be both exciting and daunting. Here are key insights from lawyers who've made it work...",
    author: {
      name: "Jennifer Walsh",
      title: "Solo Practitioner",
      firm: "Walsh Law Office",
      avatar: "/placeholder.svg?key=jennifer",
      verified: true,
    },
    publishedAt: "2025-01-05",
    readTime: "9 min read",
    category: "Practice Management",
    tags: ["Solo Practice", "Business Development", "Entrepreneurship"],
    views: 1089,
    likes: 78,
    comments: 25,
    featured: false,
    image: "/solo-law-practice-office.jpg",
  },
]

const trendingTopics = [
  { name: "AI in Legal Practice", posts: 23 },
  { name: "Pro Bono Opportunities", posts: 18 },
  { name: "Immigration Law Updates", posts: 15 },
  { name: "Legal Ethics", posts: 12 },
  { name: "Career Development", posts: 10 },
]

const featuredAuthors = [
  {
    name: "Maria Rodriguez",
    title: "Immigration Law Expert",
    posts: 15,
    followers: 2340,
    avatar: "/placeholder.svg?key=maria",
  },
  {
    name: "David Kim",
    title: "Business Law Specialist",
    posts: 12,
    followers: 1890,
    avatar: "/placeholder.svg?key=david",
  },
  {
    name: "Sarah Chen",
    title: "Legal Tech Innovator",
    posts: 18,
    followers: 3120,
    avatar: "/placeholder.svg?key=sarah",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Legal Insights</h1>
              <p className="text-muted-foreground">
                Expert perspectives, industry updates, and professional insights from the legal community
              </p>
            </div>
            <Button asChild>
              <Link href="/blog/write">
                <Plus className="h-4 w-4 mr-2" />
                Write Article
              </Link>
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search articles, authors, or topics..." className="pl-10" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="immigration">Immigration Law</SelectItem>
                    <SelectItem value="corporate">Corporate Law</SelectItem>
                    <SelectItem value="family">Family Law</SelectItem>
                    <SelectItem value="criminal">Criminal Law</SelectItem>
                    <SelectItem value="technology">Legal Technology</SelectItem>
                    <SelectItem value="ethics">Legal Ethics</SelectItem>
                    <SelectItem value="career">Career Development</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="commented">Most Discussed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
                <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                {/* Featured Article */}
                {blogPosts.filter((post) => post.featured)[0] && (
                  <Card className="overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <img
                          src={blogPosts.filter((post) => post.featured)[0].image || "/placeholder.svg"}
                          alt={blogPosts.filter((post) => post.featured)[0].title}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-1/2 p-6">
                        <Badge className="mb-3">Featured Article</Badge>
                        <h2 className="text-2xl font-bold mb-3 leading-tight">
                          <Link
                            href={`/blog/${blogPosts.filter((post) => post.featured)[0].id}`}
                            className="hover:text-primary transition-colors"
                          >
                            {blogPosts.filter((post) => post.featured)[0].title}
                          </Link>
                        </h2>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {blogPosts.filter((post) => post.featured)[0].excerpt}
                        </p>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage
                                src={blogPosts.filter((post) => post.featured)[0].author.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {blogPosts
                                  .filter((post) => post.featured)[0]
                                  .author.name.split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {blogPosts.filter((post) => post.featured)[0].author.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {blogPosts.filter((post) => post.featured)[0].author.title}
                              </p>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {blogPosts.filter((post) => post.featured)[0].readTime}
                          </div>
                        </div>
                        <Button asChild>
                          <Link href={`/blog/${blogPosts.filter((post) => post.featured)[0].id}`}>
                            Read Article
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Article List */}
                <div className="space-y-6">
                  {blogPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{post.category}</Badge>
                              {post.featured && <Badge>Featured</Badge>}
                            </div>

                            <h3 className="text-xl font-semibold mb-2 leading-tight">
                              <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                                {post.title}
                              </Link>
                            </h3>

                            <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                                    <AvatarFallback>
                                      {post.author.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium">{post.author.name}</p>
                                    <p className="text-xs text-muted-foreground">{post.author.firm}</p>
                                  </div>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(post.publishedAt).toLocaleDateString()} • {post.readTime}
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  <span>{post.views}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Heart className="h-4 w-4" />
                                  <span>{post.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>{post.comments}</span>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Bookmark className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {post.image && (
                            <div className="w-32 h-24 flex-shrink-0">
                              <img
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="featured" className="space-y-6">
                <div className="space-y-6">
                  {blogPosts
                    .filter((post) => post.featured)
                    .map((post) => (
                      <Card key={post.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex gap-6">
                            <div className="flex-1">
                              <Badge className="mb-2">Featured</Badge>
                              <h3 className="text-xl font-semibold mb-2">
                                <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                                  {post.title}
                                </Link>
                              </h3>
                              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                                    <AvatarFallback>
                                      {post.author.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium">{post.author.name}</p>
                                    <p className="text-xs text-muted-foreground">{post.readTime}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span>{post.views} views</span>
                                  <span>{post.likes} likes</span>
                                </div>
                              </div>
                            </div>
                            {post.image && (
                              <img
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                className="w-32 h-24 object-cover rounded-lg"
                              />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="following" className="space-y-6">
                <Card>
                  <CardContent className="p-8 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Followed Authors Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Follow legal experts to see their latest articles here.
                    </p>
                    <Button asChild>
                      <Link href="#all">Discover Authors</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookmarked" className="space-y-6">
                <Card>
                  <CardContent className="p-8 text-center">
                    <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Bookmarked Articles</h3>
                    <p className="text-muted-foreground mb-4">Bookmark articles to read them later.</p>
                    <Button asChild>
                      <Link href="#all">Browse Articles</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <Link href="#" className="text-sm hover:text-primary transition-colors">
                      {topic.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">{topic.posts} posts</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Featured Authors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Featured Authors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredAuthors.map((author, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{author.name}</p>
                      <p className="text-xs text-muted-foreground">{author.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{author.posts} posts</span>
                        <span>•</span>
                        <span>{author.followers} followers</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle>Stay Updated</CardTitle>
                <CardDescription>Get the latest legal insights delivered to your inbox</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Enter your email" />
                <Button className="w-full">Subscribe to Newsletter</Button>
                <p className="text-xs text-muted-foreground">Weekly digest of top articles and legal updates</p>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  "Immigration Law",
                  "Corporate Law",
                  "Family Law",
                  "Criminal Law",
                  "Legal Technology",
                  "Ethics & Professional Responsibility",
                  "Career Development",
                  "Practice Management",
                ].map((category) => (
                  <Link
                    key={category}
                    href="#"
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
