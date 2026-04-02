"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Save, Send } from "lucide-react"
import { useState } from "react"

export default function PostCasePage() {
  const [skills, setSkills] = useState<string[]>(["Immigration Law"])
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Post Pro Bono Opportunity</h1>
          <p className="text-muted-foreground">Share a meaningful legal opportunity with the LexConnect community</p>
        </div>

        <form className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Provide the essential details about your pro bono opportunity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Case Title *</Label>
                <Input id="title" placeholder="e.g., Immigration Legal Aid for Refugee Family" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Explain what happened in Chronological Order *</Label>
                <Textarea
                  id="description"
                  placeholder="Replace me..."
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization *</Label>
                  <Input id="organization" placeholder="NYC Legal Aid Society" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input id="location" placeholder="New York, NY" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select practice area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immigration">Immigration Law</SelectItem>
                      <SelectItem value="family">Family Law</SelectItem>
                      <SelectItem value="housing">Housing Law</SelectItem>
                      <SelectItem value="business">Business Law</SelectItem>
                      <SelectItem value="criminal">Criminal Law</SelectItem>
                      <SelectItem value="employment">Employment Law</SelectItem>
                      <SelectItem value="civil-rights">Civil Rights</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientType">Client Type *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="small-business">Small Business</SelectItem>
                      <SelectItem value="nonprofit">Nonprofit Organization</SelectItem>
                      <SelectItem value="community">Community Group</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Case Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Case Requirements</CardTitle>
              <CardDescription>Specify the skills, experience, and commitment needed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Required Skills & Expertise</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill or area of expertise"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" variant="outline" onClick={addSkill}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeCommitment">Time Commitment *</Label>
                  <Input id="timeCommitment" placeholder="e.g., 20-30 hours" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Estimated Duration *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                      <SelectItem value="1-month">1 month</SelectItem>
                      <SelectItem value="2-3-months">2-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="6-12-months">6-12 months</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="urgency">Priority Level *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxVolunteers">Number of Volunteers Needed *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 volunteer</SelectItem>
                      <SelectItem value="2">2 volunteers</SelectItem>
                      <SelectItem value="3">3 volunteers</SelectItem>
                      <SelectItem value="4">4 volunteers</SelectItem>
                      <SelectItem value="5+">5+ volunteers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline *</Label>
                  <Input id="deadline" type="date" required />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support & Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Support & Benefits</CardTitle>
              <CardDescription>What support will you provide to volunteers?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="supportProvided">Support Provided to Volunteers</Label>
                <Textarea
                  id="supportProvided"
                  placeholder="Describe the mentorship, training, resources, and supervision you'll provide..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-4">
                <Label>Benefits for Volunteers (check all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="mentorship" />
                    <Label htmlFor="mentorship">One-on-one mentorship</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="training" />
                    <Label htmlFor="training">Specialized training</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cle" />
                    <Label htmlFor="cle">CLE credits available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="networking" />
                    <Label htmlFor="networking">Networking opportunities</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="recognition" />
                    <Label htmlFor="recognition">Public recognition</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="reference" />
                    <Label htmlFor="reference">Professional references</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How should interested volunteers contact you?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Person *</Label>
                  <Input id="contactName" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactTitle">Title *</Label>
                  <Input id="contactTitle" placeholder="Your title/position" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email *</Label>
                  <Input id="contactEmail" type="email" placeholder="your.email@organization.org" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone (Optional)</Label>
                  <Input id="contactPhone" placeholder="+1 (555) 123-4567" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button variant="outline" type="button">
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button type="submit">
              <Send className="h-4 w-4 mr-2" />
              Post Opportunity
            </Button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
