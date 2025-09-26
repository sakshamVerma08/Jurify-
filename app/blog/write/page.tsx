"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, X, Save, Send, Eye, ImageIcon, Bold, Italic, List, Link2, Quote } from "lucide-react"
import { useState } from "react"

export default function WriteArticlePage() {
  const [tags, setTags] = useState<string[]>(["Immigration"])
  const [newTag, setNewTag] = useState("")

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Write Article</h1>
          <p className="text-muted-foreground">Share your legal expertise and insights with the LexConnect community</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="write" className="space-y-6">
              <TabsList>
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="write" className="space-y-6">
                {/* Article Header */}
                <Card>
                  <CardHeader>
                    <CardTitle>Article Details</CardTitle>
                    <CardDescription>Basic information about your article</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Article Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter a compelling title for your article..."
                        className="text-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Article Summary *</Label>
                      <Textarea
                        id="excerpt"
                        placeholder="Write a brief summary that will appear in article listings..."
                        className="min-h-[80px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immigration">Immigration Law</SelectItem>
                            <SelectItem value="corporate">Corporate Law</SelectItem>
                            <SelectItem value="family">Family Law</SelectItem>
                            <SelectItem value="criminal">Criminal Law</SelectItem>
                            <SelectItem value="technology">Legal Technology</SelectItem>
                            <SelectItem value="ethics">Legal Ethics</SelectItem>
                            <SelectItem value="career">Career Development</SelectItem>
                            <SelectItem value="practice">Practice Management</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="readTime">Estimated Read Time</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select read time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2 min read</SelectItem>
                            <SelectItem value="5">5 min read</SelectItem>
                            <SelectItem value="8">8 min read</SelectItem>
                            <SelectItem value="10">10 min read</SelectItem>
                            <SelectItem value="15">15+ min read</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a tag"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        />
                        <Button type="button" variant="outline" onClick={addTag}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coverImage">Cover Image (Optional)</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">Upload a cover image for your article</p>
                        <Button variant="outline">Choose Image</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Content Editor */}
                <Card>
                  <CardHeader>
                    <CardTitle>Article Content</CardTitle>
                    <CardDescription>Write your article content using the editor below</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Toolbar */}
                    <div className="flex items-center gap-2 p-2 border border-border rounded-lg">
                      <Button variant="ghost" size="sm">
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <List className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Link2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Quote className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Content Area */}
                    <Textarea
                      placeholder="Start writing your article here... 

You can use markdown formatting:
- **bold text**
- *italic text*
- # Headings
- [links](url)
- > blockquotes
- - bullet points

Share your expertise, insights, and experiences to help fellow legal professionals."
                      className="min-h-[500px] font-mono text-sm"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview" className="space-y-6">
                <Card>
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <Badge variant="outline" className="mb-4">
                        Immigration Law
                      </Badge>
                      <h1 className="text-3xl font-bold mb-4">Your Article Title Will Appear Here</h1>
                      <p className="text-muted-foreground mb-6">Your article summary will appear here...</p>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-muted rounded-full"></div>
                        <div>
                          <p className="font-medium">Your Name</p>
                          <p className="text-sm text-muted-foreground">Your Title</p>
                        </div>
                      </div>
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-muted-foreground">
                        Your article content will be rendered here as you write it. Switch back to the Write tab to add
                        content.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publishing Options */}
            <Card>
              <CardHeader>
                <CardTitle>Publishing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select defaultValue="public">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="unlisted">Unlisted</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publishDate">Publish Date</Label>
                  <Input type="datetime-local" />
                </div>

                <div className="flex flex-col gap-2">
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Publish Article
                  </Button>
                  <Button variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Writing Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Writing Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium mb-1">Engaging Headlines</h4>
                  <p className="text-muted-foreground">
                    Use clear, specific titles that tell readers exactly what they'll learn.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Structure Your Content</h4>
                  <p className="text-muted-foreground">
                    Use headings, bullet points, and short paragraphs for better readability.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Add Value</h4>
                  <p className="text-muted-foreground">
                    Share practical insights, real examples, and actionable advice.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Professional Tone</h4>
                  <p className="text-muted-foreground">Maintain a professional yet accessible writing style.</p>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Immigration",
                    "Pro Bono",
                    "Legal Tech",
                    "Ethics",
                    "Career Tips",
                    "Practice Management",
                    "Client Relations",
                    "Court Procedures",
                  ].map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary"
                      onClick={() => !tags.includes(tag) && setTags([...tags, tag])}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Maintain professional standards</p>
                <p>• Respect client confidentiality</p>
                <p>• Provide accurate information</p>
                <p>• Be respectful in discussions</p>
                <p>• Avoid self-promotion</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
