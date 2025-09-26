import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Clock, Heart, Briefcase, Plus, Building, Scale, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock data for pro bono cases
const proBonoCases = [
  {
    id: "1",
    title: "Immigration Legal Aid for Refugee Family",
    description:
      "Seeking assistance for a refugee family navigating the asylum process. Case involves document preparation, interview preparation, and court representation.",
    organization: "NYC Legal Aid Society",
    location: "New York, NY",
    practiceArea: "Immigration Law",
    urgency: "High",
    timeCommitment: "20-30 hours",
    postedDate: "2 days ago",
    deadline: "March 15, 2025",
    skillsNeeded: ["Immigration Law", "Document Preparation", "Court Representation"],
    clientType: "Individual/Family",
    estimatedDuration: "3-6 months",
    supportProvided: "Mentorship, Resources, Training",
    applicants: 8,
    maxVolunteers: 2,
    poster: {
      name: "Maria Rodriguez",
      title: "Senior Immigration Attorney",
      organization: "NYC Legal Aid Society",
      avatar: "/placeholder.svg?key=maria",
    },
  },
  {
    id: "2",
    title: "Small Business Legal Clinic Support",
    description:
      "Help small business owners with contract reviews, business formation, and basic legal compliance. Great opportunity for corporate law experience.",
    organization: "Brooklyn Small Business Legal Clinic",
    location: "Brooklyn, NY",
    practiceArea: "Business Law",
    urgency: "Medium",
    timeCommitment: "10-15 hours/week",
    postedDate: "1 week ago",
    deadline: "March 30, 2025",
    skillsNeeded: ["Contract Law", "Business Formation", "Regulatory Compliance"],
    clientType: "Small Business",
    estimatedDuration: "Ongoing",
    supportProvided: "Training, Supervision, Resources",
    applicants: 12,
    maxVolunteers: 5,
    poster: {
      name: "David Kim",
      title: "Managing Partner",
      organization: "Kim & Associates",
      avatar: "/placeholder.svg?key=david",
    },
  },
  {
    id: "3",
    title: "Domestic Violence Legal Support",
    description:
      "Provide legal assistance to domestic violence survivors including restraining orders, custody matters, and safety planning.",
    organization: "Women's Legal Defense Fund",
    location: "Manhattan, NY",
    practiceArea: "Family Law",
    urgency: "High",
    timeCommitment: "15-25 hours",
    postedDate: "3 days ago",
    deadline: "March 10, 2025",
    skillsNeeded: ["Family Law", "Restraining Orders", "Crisis Support"],
    clientType: "Individual",
    estimatedDuration: "2-4 months",
    supportProvided: "Crisis Training, Mentorship, 24/7 Support",
    applicants: 6,
    maxVolunteers: 3,
    poster: {
      name: "Jennifer Walsh",
      title: "Director of Legal Services",
      organization: "Women's Legal Defense Fund",
      avatar: "/placeholder.svg?key=jennifer",
    },
  },
  {
    id: "4",
    title: "Housing Rights Advocacy",
    description:
      "Assist tenants facing eviction and housing discrimination. Help with tenant rights education and court representation.",
    organization: "Housing Justice Coalition",
    location: "Queens, NY",
    practiceArea: "Housing Law",
    urgency: "Medium",
    timeCommitment: "12-20 hours",
    postedDate: "5 days ago",
    deadline: "April 1, 2025",
    skillsNeeded: ["Housing Law", "Tenant Rights", "Court Advocacy"],
    clientType: "Individual/Family",
    estimatedDuration: "1-3 months",
    supportProvided: "Training Materials, Supervision",
    applicants: 4,
    maxVolunteers: 4,
    poster: {
      name: "Robert Chen",
      title: "Staff Attorney",
      organization: "Housing Justice Coalition",
      avatar: "/placeholder.svg?key=robert",
    },
  },
]

const featuredOpportunities = [
  {
    title: "Legal Clinic Volunteer Program",
    description: "Join our weekly legal clinic serving underserved communities",
    organization: "Community Legal Services",
    volunteers: 25,
    impact: "500+ people helped",
  },
  {
    title: "Veterans Legal Aid Initiative",
    description: "Support veterans with disability claims and benefits",
    organization: "Veterans Legal Network",
    volunteers: 18,
    impact: "200+ veterans served",
  },
  {
    title: "Youth Justice Mentorship",
    description: "Mentor young people in the juvenile justice system",
    organization: "Youth Advocacy Center",
    volunteers: 12,
    impact: "150+ youth supported",
  },
]

export default function ProBonoCasesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Pro Bono Opportunities</h1>
              <p className="text-muted-foreground">Make a difference while gaining valuable legal experience</p>
            </div>
            <Button asChild>
              <Link href="/cases/post">
                <Plus className="h-4 w-4 mr-2" />
                Post Opportunity
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
                  <Input placeholder="Search cases by title, organization, or practice area..." className="pl-10" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Practice Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Areas</SelectItem>
                    <SelectItem value="immigration">Immigration Law</SelectItem>
                    <SelectItem value="family">Family Law</SelectItem>
                    <SelectItem value="housing">Housing Law</SelectItem>
                    <SelectItem value="business">Business Law</SelectItem>
                    <SelectItem value="criminal">Criminal Law</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="manhattan">Manhattan</SelectItem>
                    <SelectItem value="brooklyn">Brooklyn</SelectItem>
                    <SelectItem value="queens">Queens</SelectItem>
                    <SelectItem value="bronx">Bronx</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Urgency</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="browse" className="space-y-6">
              <TabsList>
                <TabsTrigger value="browse">Browse Cases</TabsTrigger>
                <TabsTrigger value="applied">My Applications</TabsTrigger>
                <TabsTrigger value="active">Active Cases</TabsTrigger>
              </TabsList>

              <TabsContent value="browse" className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">{proBonoCases.length} opportunities available</p>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="urgent">Most Urgent</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="deadline">Deadline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-6">
                  {proBonoCases.map((case_) => (
                    <Card key={case_.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-semibold mb-2">
                                  <Link href={`/cases/${case_.id}`} className="hover:text-primary transition-colors">
                                    {case_.title}
                                  </Link>
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                  <div className="flex items-center gap-1">
                                    <Building className="h-4 w-4" />
                                    <span>{case_.organization}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{case_.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{case_.postedDate}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <Badge
                                  variant={
                                    case_.urgency === "High"
                                      ? "destructive"
                                      : case_.urgency === "Medium"
                                        ? "default"
                                        : "secondary"
                                  }
                                >
                                  {case_.urgency} Priority
                                </Badge>
                                <Badge variant="outline">{case_.practiceArea}</Badge>
                              </div>
                            </div>

                            <p className="text-muted-foreground mb-4 leading-relaxed">{case_.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {case_.skillsNeeded.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Time Commitment:</span>
                                <p className="font-medium">{case_.timeCommitment}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Duration:</span>
                                <p className="font-medium">{case_.estimatedDuration}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Deadline:</span>
                                <p className="font-medium">{case_.deadline}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Applicants:</span>
                                <p className="font-medium">
                                  {case_.applicants}/{case_.maxVolunteers}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="lg:w-64 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={case_.poster.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {case_.poster.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{case_.poster.name}</p>
                                <p className="text-xs text-muted-foreground">{case_.poster.title}</p>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <Button asChild>
                                <Link href={`/cases/${case_.id}`}>
                                  View Details
                                  <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                              </Button>
                              <Button variant="outline">
                                <Heart className="h-4 w-4 mr-2" />
                                Save
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="applied" className="space-y-6">
                <Card>
                  <CardContent className="p-8 text-center">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start applying to pro bono opportunities to see them here.
                    </p>
                    <Button asChild>
                      <Link href="#browse">Browse Opportunities</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="active" className="space-y-6">
                <Card>
                  <CardContent className="p-8 text-center">
                    <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Active Cases</h3>
                    <p className="text-muted-foreground mb-4">Your accepted pro bono cases will appear here.</p>
                    <Button asChild>
                      <Link href="#browse">Find Opportunities</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Featured Programs</CardTitle>
                <CardDescription>Long-term volunteer opportunities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredOpportunities.map((opportunity, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">{opportunity.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{opportunity.description}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{opportunity.volunteers} volunteers</span>
                      <span>{opportunity.impact}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Cases Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Hours Contributed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">People Helped</div>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pro Bono Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="#" className="block text-sm text-primary hover:underline">
                  Pro Bono Best Practices Guide
                </Link>
                <Link href="#" className="block text-sm text-primary hover:underline">
                  Legal Ethics Guidelines
                </Link>
                <Link href="#" className="block text-sm text-primary hover:underline">
                  Volunteer Training Materials
                </Link>
                <Link href="#" className="block text-sm text-primary hover:underline">
                  Impact Measurement Tools
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
