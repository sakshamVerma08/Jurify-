"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Send,
  Upload,
  FileText,
  MessageSquare,
  Bot,
  User,
  Copy,
  Trash2,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  documentName?: string
  isAnalyzing?: boolean
}

interface ChatSession {
  id: string
  title: string
  lastMessage: Date
  messageCount: number
}

const sampleQuestions = [
  "Explain this contract in simple terms",
  "What are my rights in this agreement?",
  "Are there any concerning clauses?",
  "What does this legal jargon mean?",
  "Summarize the key points",
  "What should I be aware of?",
]

const recentSessions: ChatSession[] = [
  {
    id: "1",
    title: "Employment Contract Analysis",
    lastMessage: new Date(Date.now() - 2 * 60 * 60 * 1000),
    messageCount: 8,
  },
  {
    id: "2",
    title: "Lease Agreement Review",
    lastMessage: new Date(Date.now() - 24 * 60 * 60 * 1000),
    messageCount: 12,
  },
  {
    id: "3",
    title: "Privacy Policy Questions",
    lastMessage: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    messageCount: 5,
  },
]

export default function AILegalChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content:
        "Hello! I'm your AI Legal Assistant. I can help you understand complex legal documents by explaining them in plain English. You can upload a document or paste text, and I'll break down the legal jargon for you.\n\nHow can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [documentText, setDocumentText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !documentText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage || `Please analyze this document: ${documentText.substring(0, 100)}...`,
      timestamp: new Date(),
      documentName: uploadedFile?.name,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI processing
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateAIResponse(inputMessage, documentText),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 2000)
  }

  const generateAIResponse = (question: string, document: string): string => {
    if (document) {
      return `I've analyzed your document${uploadedFile ? ` "${uploadedFile.name}"` : ""}. Here's what I found:

**Key Points:**
• This appears to be a legal document with several important clauses
• The language used is formal legal terminology that can be simplified
• There are specific rights and obligations outlined for all parties

**In Plain English:**
The document essentially establishes an agreement between parties with specific terms and conditions. The legal jargon can be broken down as follows:

• **"Whereas" clauses** - These are just background information explaining why the agreement exists
• **"Party of the first part"** - This is just a formal way of saying "the first person/company in the agreement"
• **"Shall" vs "May"** - "Shall" means required/mandatory, "May" means optional

**Potential Concerns:**
• Look for any clauses that seem one-sided
• Check termination conditions and notice requirements
• Review any penalty or fee structures

Would you like me to explain any specific section in more detail?`
    }

    const responses = [
      "I'd be happy to help you understand legal documents! Could you please share the specific document or text you'd like me to analyze?",
      "Legal documents can be confusing with all their formal language. If you upload or paste the text, I can break it down into plain English for you.",
      "That's a great question about legal matters. To give you the most accurate help, could you provide the specific document or clause you're asking about?",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // Simulate file processing
      setDocumentText(`[Document content from ${file.name} would be extracted here]`)
    }
  }

  const handleSampleQuestion = (question: string) => {
    setInputMessage(question)
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        type: "assistant",
        content: "Hello! I'm your AI Legal Assistant. How can I help you understand legal documents today?",
        timestamp: new Date(),
      },
    ])
    setDocumentText("")
    setUploadedFile(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI Legal Assistant</h1>
              <p className="text-muted-foreground">Understand legal documents in plain English</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Secure & Confidential</span>
            <Separator orientation="vertical" className="h-4" />
            <Sparkles className="h-4 w-4 text-primary" />
            <span>AI-Powered Analysis</span>
            <Separator orientation="vertical" className="h-4" />
            <Clock className="h-4 w-4 text-blue-500" />
            <span>24/7 Available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[700px] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Legal Document Analysis
                    </CardTitle>
                    <CardDescription>Upload documents or ask questions about legal text</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={clearChat}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Chat
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-6">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex gap-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                          </div>
                          <div
                            className={`rounded-lg p-4 ${
                              message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            {message.documentName && (
                              <div className="flex items-center gap-2 mb-2 text-sm opacity-75">
                                <FileText className="h-4 w-4" />
                                <span>{message.documentName}</span>
                              </div>
                            )}
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/20">
                              <span className="text-xs opacity-60">{message.timestamp.toLocaleTimeString()}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyMessage(message.content)}
                                className="h-6 px-2"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex gap-4 justify-start">
                        <div className="flex gap-3 max-w-[80%]">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <Bot className="h-4 w-4" />
                          </div>
                          <div className="bg-muted rounded-lg p-4">
                            <div className="flex items-center gap-2">
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              <span className="text-sm">Analyzing document...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t border-border p-6 space-y-4">
                  {/* Document Upload */}
                  <Tabs defaultValue="text" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="text">Type Message</TabsTrigger>
                      <TabsTrigger value="upload">Upload Document</TabsTrigger>
                    </TabsList>

                    <TabsContent value="text" className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Ask about legal documents or paste text here..."
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendMessage())
                          }
                          className="flex-1"
                        />
                        <Button onClick={handleSendMessage} disabled={isLoading}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="upload" className="space-y-4">
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">Upload a legal document for analysis</p>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="h-4 w-4 mr-2" />
                            Choose File
                          </Button>
                          {uploadedFile && (
                            <div className="mt-2 text-sm text-muted-foreground">Selected: {uploadedFile.name}</div>
                          )}
                        </div>

                        <Textarea
                          placeholder="Or paste document text here..."
                          value={documentText}
                          onChange={(e) => setDocumentText(e.target.value)}
                          className="min-h-[100px]"
                        />

                        <Button
                          onClick={handleSendMessage}
                          disabled={isLoading || (!documentText.trim() && !uploadedFile)}
                          className="w-full"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Analyze Document
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sample Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sample Questions</CardTitle>
                <CardDescription>Try these common legal document questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {sampleQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-3 bg-transparent"
                    onClick={() => handleSampleQuestion(question)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{question}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <h4 className="font-medium text-sm mb-1">{session.title}</h4>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{session.messageCount} messages</span>
                      <span>{session.lastMessage.toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What I Can Help With</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Document Simplification</p>
                    <p className="text-muted-foreground">Convert legal jargon to plain English</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Key Points Summary</p>
                    <p className="text-muted-foreground">Highlight important clauses and terms</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Risk Assessment</p>
                    <p className="text-muted-foreground">Identify potential concerns or red flags</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Q&A Support</p>
                    <p className="text-muted-foreground">Answer specific questions about documents</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium mb-1">Important Notice</p>
                    <p>
                      This AI assistant provides general information only and does not constitute legal advice. For
                      specific legal matters, please consult with a qualified attorney.
                    </p>
                  </div>
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
