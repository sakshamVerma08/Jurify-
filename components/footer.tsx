import Link from "next/link"
import { Scale, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Scale className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">LexConnect</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Empowering legal professionals to connect, collaborate, and grow. Join the premier network for lawyers
              seeking meaningful pro bono opportunities and professional development.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cases" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pro Bono Cases
                </Link>
              </li>
              <li>
                <Link href="/network" className="text-muted-foreground hover:text-foreground transition-colors">
                  Legal Network
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Legal Insights
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 LexConnect. All rights reserved. Connecting legal professionals worldwide.
          </p>
        </div>
      </div>
    </footer>
  )
}
