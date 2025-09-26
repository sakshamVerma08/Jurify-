import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Users,
  MessageSquare,
  Star,
  CheckCircle,
  Building,
  Scale,
  FileText,
  TrendingUp,
} from "lucide-react"

// Mock data - in real app this would come from database
const lawyerProfile = {
  id: "1",
  name: "Sarah Chen",
  title: "Senior Corporate Lawyer",
  firm: "Chen & Associates",
  location: "New York, NY",
  email: "sarah.chen@example.com",
  phone: "+1 (555) 123-4567",
  joinDate: "2022-03-15",
  avatar: "/professional-lawyer-headshot.jpg",
  verified: true,
  rating: 4.9,
  totalCases: 47,
  proBonoCases: 12,
  yearsExperience: 8,
  specializations: ["Corporate Law", "Mergers & Acquisitions", "Securities Law", "Contract Law"],
  bio: "Experienced corporate lawyer with a passion for helping startups navigate complex legal landscapes. Dedicated to providing pro bono services to underserved communities and mentoring new lawyers.",
  education: [
    {
      degree: "J.D.",
      school: "Harvard Law School",
      year: "2016",
      honors: "Magna Cum Laude",
    },
    {
      degree: "B.A. Economics",
      school: "Stanford University",
      year: "2013",
      honors: "Phi Beta Kappa",
    },
  ],
  certifications: [
    {
      name: "New York State Bar",
      issuer: "NY State Bar Association",
      year: "2016",
      verified: true,
    },
    {
      name: "Securities Law Certification",
      issuer: "American Bar Association",
      year: "2018",
      verified: true,
    },
    {
      name: "Corporate Governance Certificate",
      issuer: "Georgetown Law",
      year: "2020",
      verified: true,
    },
  ],
  experience: [
    {
      position: "Senior Associate",
      company: "Skadden, Arps, Slate, Meagher & Flom",
      duration: "2018 - 2022",
      description: "Led M&A transactions worth over $2B, advised Fortune 500 companies on corporate governance.",
    },
    {
      position: "Associate",
      company: "Cravath, Swaine & Moore",
      duration: "2016 - 2018",
      description: "Specialized in securities offerings and regulatory compliance for public companies.",
    },
  ],
  recentCases: [
    {
      title: "Immigration Legal Aid",
      type: "Pro Bono",
      status: "Completed",
      impact: "Helped 15 families obtain legal status",
    },
    {
      title: "Small Business Legal Clinic",
      type: "Pro Bono",
      status: "Ongoing",
      impact: "Providing ongoing legal support to 8 startups",
    },
    {
      title: "Tech Startup M&A",
      type: "Commercial",
      status: "Completed",
      impact: "$50M acquisition successfully closed",
    },
  ],
  skills: [
    { name: "Contract Negotiation", level: 95 },
    { name: "Due Diligence", level: 90 },
    { name: "Regulatory Compliance", level: 88 },
    { name: "Client Relations", level: 92 },
    { name: "Legal Research", level: 85 },
  ],
  endorsements: [
    {
      name: "Michael Rodriguez",
      title: "Partner at Goldman Sachs",
      text: "Sarah's expertise in M&A law is exceptional. She guided us through a complex acquisition with professionalism and attention to detail.",
    },
    {
      name: "Jennifer Liu",
      title: "CEO at TechStart Inc",
      text: "Outstanding pro bono work. Sarah helped our nonprofit navigate legal challenges and made a real difference in our community.",
    },
  ],
}

export default function LawyerProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex flex-col items-center lg:items-start">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src={lawyerProfile.avatar || "/placeholder.svg"} alt={lawyerProfile.name} />
                  <AvatarFallback className="text-2xl">
                    {lawyerProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{lawyerProfile.rating}</span>
                  <span className="text-muted-foreground">({lawyerProfile.totalCases} cases)</span>
                </div>
                {lawyerProfile.verified && (
                  <Badge variant="secondary" className="mb-4">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Verified Lawyer
                  </Badge>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{lawyerProfile.name}</h1>
                    <p className="text-xl text-muted-foreground mb-2">{lawyerProfile.title}</p>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <Building className="h-4 w-4" />
                      <span>{lawyerProfile.firm}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{lawyerProfile.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{lawyerProfile.yearsExperience} years experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{lawyerProfile.totalCases} total cases</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Scale className="h-4 w-4 text-muted-foreground" />
                    <span>{lawyerProfile.proBonoCases} pro bono cases</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {lawyerProfile.specializations.map((spec) => (
                    <Badge key={spec} variant="outline">
                      {spec}
                    </Badge>
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">{lawyerProfile.bio}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="cases">Cases</TabsTrigger>
            <TabsTrigger value="endorsements">Endorsements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Skills & Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lawyerProfile.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lawyerProfile.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{cert.name}</h4>
                          {cert.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        <p className="text-sm text-muted-foreground">{cert.year}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Professional Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {lawyerProfile.experience.map((exp, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{exp.position}</h4>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mb-2">{exp.duration}</p>
                      <p className="text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {lawyerProfile.education.map((edu, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{edu.degree}</h4>
                      <p className="text-primary font-medium">{edu.school}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{edu.year}</span>
                        {edu.honors && <Badge variant="outline">{edu.honors}</Badge>}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cases" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Cases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lawyerProfile.recentCases.map((case_, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border border-border rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Scale className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{case_.title}</h4>
                        <Badge variant={case_.type === "Pro Bono" ? "secondary" : "outline"}>{case_.type}</Badge>
                        <Badge variant={case_.status === "Completed" ? "default" : "secondary"}>{case_.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{case_.impact}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="endorsements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Professional Endorsements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {lawyerProfile.endorsements.map((endorsement, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback>
                          {endorsement.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="mb-2">
                          <h4 className="font-medium">{endorsement.name}</h4>
                          <p className="text-sm text-muted-foreground">{endorsement.title}</p>
                        </div>
                        <p className="text-sm leading-relaxed italic">"{endorsement.text}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
