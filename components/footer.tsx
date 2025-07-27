import Link from "next/link"
import { Code2, Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react"

const navigation = {
  services: [
    { name: "Website Development", href: "/services#website" },
    { name: "Full Stack Development", href: "/services#fullstack" },
    { name: "Mobile App Development", href: "/services#mobile" },
    { name: "UI/UX Design", href: "/services#design" },
    { name: "Cloud Solutions", href: "/services#cloud" },
    { name: "AI & Machine Learning", href: "/services#ai" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  social: [
    { name: "GitHub", href: "https://github.com/rsnecus", icon: Github },
    { name: "Twitter", href: "https://twitter.com/rsnecus", icon: Twitter },
    { name: "LinkedIn", href: "https://linkedin.com/company/rsnecus", icon: Linkedin },
  ],
}

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Code2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-white">RSNecus</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-md">
              India's leading software development company transforming ideas into exceptional digital solutions.
              Serving businesses across Mumbai, Delhi, Bangalore, and globally.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@rsnecus.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© 2024 RSNecus India. All rights reserved.</p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            {navigation.social.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-400 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
