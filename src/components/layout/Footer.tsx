"use client";

import Link from "next/link";
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Info, 
  Users, 
  LifeBuoy, 
  ArrowUpRight 
} from "lucide-react";

const FOOTER_LINKS = {
  platform: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Teachers", href: "/all-teacher" },
    { label: "Contact", href: "/contact-us" },
  ],
  academic: [
    { label: "Curriculum", href: "#" },
    { label: "Student Portal", href: "/dashboard" },
    { label: "Teacher Portal", href: "/teacher/dashboard" },
    { label: "Resources", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Student FAQ", href: "#" },
  ]
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-border/40 bg-background/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 active:opacity-80">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform hover:scale-110">
                <GraduationCap className="h-7 w-7 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-foreground">
                  Class <span className="text-primary italic">Pilot</span>
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">
                  Academic Hub
                </span>
              </div>
            </Link>
            <p className="mt-6 max-w-xs text-base leading-relaxed text-muted-foreground">
              Empowering the next generation with smarter academic tracking and modern classroom management tools.
            </p>
            <div className="mt-8 flex items-center gap-4">
              {[Globe, Info, Users, LifeBuoy].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border/40 text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Platform</h3>
              <ul className="mt-6 space-y-4">
                {FOOTER_LINKS.platform.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="group text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1">
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Academic</h3>
              <ul className="mt-6 space-y-4">
                {FOOTER_LINKS.academic.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="group text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1">
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Connect</h3>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    hello@classpilot.edu
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    +1 (555) 000-0000
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm font-medium text-muted-foreground leading-relaxed">
                    123 Scholar Street, Education District, NY
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border/20 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm font-medium text-muted-foreground">
            © {currentYear} <span className="text-primary font-bold">Class Pilot</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs font-semibold px-4 py-1.5 rounded-full bg-secondary/15 text-secondary border border-secondary/20 uppercase tracking-tight">
              Made for Students
            </span>
            <span className="text-xs font-semibold px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-tight">
              v1.0.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
