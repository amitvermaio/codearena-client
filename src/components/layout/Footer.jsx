import React from "react";
import { Logo } from "../shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  platform: [
    { label: "Problems", href: "/problems" },
    { label: "Contests", href: "/contests" },
    { label: "Tools", href: "/tools" },
    { label: "Leaderboard", href: "#" },
  ],
  community: [
    { label: "Connections", href: "/connections" },
    { label: "Discussions", href: "#" },
    { label: "Events", href: "#" },
    { label: "Become a Mentor", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-muted/20 border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-6">
            <a href="/" className="inline-block">
              <Logo />
            </a>
            <p className="max-w-xs text-sm text-muted-foreground">
              The ultimate platform for coders to grow, connect, and showcase
              their skills.
            </p>
            <div className="flex flex-col gap-2 max-w-sm">
              <p className="text-sm font-semibold">Stay up to date</p>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="bg-background" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <p className="font-semibold text-foreground">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CodeArena.&nbsp;All rights
            reserved.
          </p>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Github"
                className="text-muted-foreground hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Linkedin"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
