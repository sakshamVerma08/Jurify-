import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, GraduationCap, Award, Briefcase, Plus, Edit, Save, Camera } from "lucide-react"

export default function EditProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
          <p className="text-muted-foreground">Update your professional information and showcase your expertise.</p>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>Your basic profile information that will be visible to other users.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Photo */}
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/lawyer-profile.png" />
                    <AvatarFallback className="text-lg">SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload a professional headshot. JPG or PNG, max 5MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Sarah" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Chen" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input id="title" placeholder="Senior Corporate Lawyer" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell other lawyers about your experience, specializations, and what drives your legal practice..."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="sarah.chen@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="New York, NY" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Professional Information
                </CardTitle>
                <CardDescription>Details about your current position and legal specializations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firm">Current Firm/Organization</Label>
                    <Input id="firm" placeholder="Chen & Associates" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" placeholder="Senior Associate" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="2-5">2-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-15">11-15 years</SelectItem>
                        <SelectItem value="16+">16+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barNumber">Bar Number</Label>
                    <Input id="barNumber" placeholder="NY123456789" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Practice Areas</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary">Corporate Law</Badge>
                    <Badge variant="secondary">M&A</Badge>
                    <Badge variant="secondary">Securities Law</Badge>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Area
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Add your areas of legal expertise and specialization.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages">Languages</Label>
                  <Input id="languages" placeholder="English, Mandarin, Spanish" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Education
                    </CardTitle>
                    <CardDescription>Your educational background and academic achievements.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Law School */}
                <div className="p-4 border border-border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Law School</h4>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lawSchool">School Name</Label>
                      <Input id="lawSchool" placeholder="Harvard Law School" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lawDegree">Degree</Label>
                      <Input id="lawDegree" placeholder="J.D." />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lawYear">Graduation Year</Label>
                      <Input id="lawYear" placeholder="2016" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lawHonors">Honors/GPA</Label>
                      <Input id="lawHonors" placeholder="Magna Cum Laude" />
                    </div>
                  </div>
                </div>

                {/* Undergraduate */}
                <div className="p-4 border border-border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Undergraduate</h4>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="undergrad">School Name</Label>
                      <Input id="undergrad" placeholder="Stanford University" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="undergradDegree">Degree</Label>
                      <Input id="undergradDegree" placeholder="B.A. Economics" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="undergradYear">Graduation Year</Label>
                      <Input id="undergradYear" placeholder="2013" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="undergradHonors">Honors/GPA</Label>
                      <Input id="undergradHonors" placeholder="Phi Beta Kappa" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Certifications & Bar Admissions
                    </CardTitle>
                    <CardDescription>
                      Professional certifications, bar admissions, and specialized credentials.
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Certification
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Bar Admission */}
                <div className="p-4 border border-border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">New York State Bar</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Verified</Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Issuing Authority</Label>
                      <Input placeholder="NY State Bar Association" />
                    </div>
                    <div className="space-y-2">
                      <Label>Year Admitted</Label>
                      <Input placeholder="2016" />
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Active" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Professional Certification */}
                <div className="p-4 border border-border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Securities Law Certification</h4>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Issuing Organization</Label>
                      <Input placeholder="American Bar Association" />
                    </div>
                    <div className="space-y-2">
                      <Label>Year Obtained</Label>
                      <Input placeholder="2018" />
                    </div>
                    <div className="space-y-2">
                      <Label>Expiration</Label>
                      <Input placeholder="2025" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end pt-6">
          <Button size="lg">
            <Save className="h-4 w-4 mr-2" />
            Save Profile
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
