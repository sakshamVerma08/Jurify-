import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Clock,
  Building,
  Scale,
  Heart,
  Share2,
  Flag,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

// Mock case data - in real app this would be fetched based on ID
const caseDetails = {
  id: "1",
  title: "Immigration Legal Aid for Refugee Family",
  description:
    "We are seeking a dedicated volunteer attorney to assist a refugee family from Afghanistan who recently arrived in the United States. The family consists of two parents and three children (ages 8, 12, and 16) who are navigating the complex asylum process.\n\nThis case involves comprehensive legal support including document preparation, interview preparation, and potential court representation. The family has already completed their initial screening and has been determined to have a strong case for asylum based on their circumstances in Afghanistan.\n\nThe volunteer will work closely with our experienced immigration team and will receive full support, training, and mentorship throughout the process. This is an excellent opportunity for attorneys looking to gain hands-on immigration law experience while making a meaningful difference in a family's life.",
  organization: "NYC Legal Aid Society",
  location: "New York, NY",
  practiceArea: "Immigration Law",
  urgency: "High",
  timeCommitment: "20-30 hours",
  postedDate: "2 days ago",
  deadline: "March 15, 2025",
  skillsNeeded: ["Immigration Law", "Document Preparation", "Court Representation", "Client Counseling"],
  clientType: "Individual/Family",
  estimatedDuration: "3-6 months",
  supportProvided: "Mentorship, Resources, Training, Case Supervision",
  applicants: 8,
  maxVolunteers: 2,
  requirements: [
    "Licensed attorney in good standing",
    "Interest in immigration law (experience preferred but not required)",
    "Ability to commit 5-8 hours per week",
    "Compassionate approach to client service",
    "Willingness to attend training sessions",
  ],
  responsibilities: [
    "Prepare and file asylum application documents",
    "Conduct client interviews and gather supporting evidence",
    "Prepare clients for asylum interviews",
    "Represent clients in immigration court if necessary",
    "Coordinate with social services and other support organizations",
    "Maintain detailed case records and documentation",
  ],
  benefits: [
    "Hands-on immigration law experience",
    "Mentorship from senior immigration attorneys",
    "Training on asylum law and procedures",
    "Networking opportunities with immigration law community",
    "Continuing legal education credits available",
    "Recognition in annual volunteer appreciation event",
  ],
  poster: {
    name: "Maria Rodriguez",
    title: "Senior Immigration Attorney",
    organization: "NYC Legal Aid Society",
    avatar: "/placeholder.svg?key=maria",
    email: "maria.rodriguez@nyclegal.org",
    phone: "+1 (212) 555-0123",
    bio: "Maria has been practicing immigration law for over 12 years and has successfully handled hundreds of asylum cases. She leads our pro bono volunteer program and is passionate about training new attorneys in immigration law.",
    experience: "12+ years",
    cases: "500+ cases handled",
  },
  timeline: [
    {
      phase: "Application Review",
      duration: "1-2 weeks",
      description: "Review applications and conduct brief interviews with potential volunteers",
    },
    {
      phase: "Training & Orientation",
      duration: "1 week",
      description: "Comprehensive training on asylum law, case procedures, and client interaction",
    },
    {
      phase: "Case Assignment",
      duration: "Immediate",
      description: "Meet with clients and begin case preparation with supervisor support",
    },
    {
      phase: "Active Case Work",
      duration: "3-6 months",
      description: "Document preparation, client meetings, and case progression with ongoing mentorship",
    },
  ],
}

export default function CaseDetailsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/cases">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cases
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Case Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-2">{caseDetails.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        <span>{caseDetails.organization}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{caseDetails.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Posted {caseDetails.postedDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={caseDetails.urgency === "High" ? "destructive" : "default"}>
                      {caseDetails.urgency} Priority
                    </Badge>
                    <Badge variant="outline">{caseDetails.practiceArea}</Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {caseDetails.skillsNeeded.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-6">
                  <div>
                    <span className="text-muted-foreground">Time Commitment:</span>
                    <p className="font-medium">{caseDetails.timeCommitment}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <p className="font-medium">{caseDetails.estimatedDuration}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Application Deadline:</span>
                    <p className="font-medium">{caseDetails.deadline}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Applicants:</span>
                    <p className="font-medium">
                      {caseDetails.applicants}/{caseDetails.maxVolunteers}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">Apply for This Case</Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Case Description */}
            <Card>
              <CardHeader>
                <CardTitle>Case Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {caseDetails.description.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements & Responsibilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {caseDetails.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {caseDetails.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Scale className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Gain</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {caseDetails.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseDetails.timeline.map((phase, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">{index + 1}</span>
                        </div>
                        {index < caseDetails.timeline.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{phase.phase}</h4>
                          <Badge variant="outline" className="text-xs">
                            {phase.duration}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Case Supervisor */}
            <Card>
              <CardHeader>
                <CardTitle>Case Supervisor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={caseDetails.poster.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {caseDetails.poster.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{caseDetails.poster.name}</h4>
                    <p className="text-sm text-muted-foreground">{caseDetails.poster.title}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{caseDetails.poster.bio}</p>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-medium">{caseDetails.poster.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cases Handled:</span>
                    <span className="font-medium">{caseDetails.poster.cases}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Client Type:</span>
                  <span className="font-medium">{caseDetails.clientType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Support Provided:</span>
                  <span className="font-medium">{caseDetails.supportProvided}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Volunteers Needed:</span>
                  <span className="font-medium">{caseDetails.maxVolunteers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Applications:</span>
                  <span className="font-medium">{caseDetails.applicants}</span>
                </div>
              </CardContent>
            </Card>

            {/* Application Deadline */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <span className="font-medium">Application Deadline</span>
                </div>
                <p className="text-2xl font-bold text-primary mb-1">{caseDetails.deadline}</p>
                <p className="text-sm text-muted-foreground">Don't miss this opportunity to make a difference</p>
              </CardContent>
            </Card>

            {/* Similar Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border border-border rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Family Reunification Support</h4>
                  <p className="text-xs text-muted-foreground mb-2">Help families navigate immigration processes</p>
                  <Badge variant="outline" className="text-xs">
                    Immigration Law
                  </Badge>
                </div>
                <div className="p-3 border border-border rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Asylum Interview Preparation</h4>
                  <p className="text-xs text-muted-foreground mb-2">Prepare asylum seekers for critical interviews</p>
                  <Badge variant="outline" className="text-xs">
                    Immigration Law
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
