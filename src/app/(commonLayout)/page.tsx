import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Rocket, 
  Users, 
  GraduationCap, 
  ChevronRight,
  ShieldCheck,
  Zap,
  PieChart,
  Star,
  Check,
  Cloud,
  Command
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-background selection:bg-primary/20 leading-relaxed">
      {/* 🚀 1. Hero Section: The Takeoff */}
      <section className="relative pt-16 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-1/2 -z-10 h-[800px] w-full -translate-x-1/2 bg-[radial-gradient(circle_at_top,rgba(99,57,166,0.15)_0%,transparent_60%)]" />
        <div className="absolute -top-40 -left-40 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] animate-pulse" />
        <div className="absolute top-1/4 -right-40 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px] animate-pulse delay-700" />
        
        <div className="container mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col items-center text-center">
            <Badge variant="outline" className="mb-8 pl-1 pr-4 py-2 rounded-full border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full mr-2 leading-none">New</span>
              Class Pilot v1.0.0 — Landing Now
            </Badge>
            
            <h1 className="mb-6 text-6xl font-extrabold tracking-tight lg:text-[100px] leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-700">
              Your Academic <br />
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent italic leading-[1.1] sm:leading-[0.9]">Flight Controller</span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg lg:text-xl text-muted-foreground/80 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-700 delay-150">
              The only academic CRM built on transparency. From first-year flight training to advanced graduation landing, pilot your education with precision data and seamless sync.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-700 delay-300">
              <Button asChild size="lg" className="h-16 rounded-[24px] bg-primary px-12 text-lg font-bold shadow-[0_20px_50px_-20px_rgba(99,57,166,0.6)] hover:scale-105 active:scale-95 transition-all">
                <Link href="/login">
                  Open Your Cockpit <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="h-16 rounded-[24px] border border-border/40 bg-card/40 px-10 text-lg font-bold backdrop-blur-xl transition-all hover:bg-primary/5 hover:text-primary">
                <Link href="/contact-us">Join the Crew</Link>
              </Button>
            </div>
          </div>

          {/* Hero Dashboard Reveal */}
          <div className="relative mx-auto mt-20 max-w-[1200px] animate-in fade-in zoom-in-95 duration-1000 delay-500">
            <div className="group relative rounded-[40px] border border-border bg-card/50 p-2 shadow-[0_0_100px_-30px_rgba(0,0,0,0.15)] ring-1 ring-primary/10">
              <div className="overflow-hidden rounded-[32px] bg-background">
                <Image 
                  src="/hero-dashboard.png" 
                  alt="Student Dashboard" 
                  width={2400} 
                  height={1300} 
                  className="w-full h-auto object-cover opacity-98 transition-transform duration-1000 group-hover:scale-[1.01]" 
                  priority
                />
              </div>
              
              {/* Floating "Pilot Data" HUD Cards */}
              <div className="absolute -left-12 top-1/4 hidden xl:block animate-bounce-slow ">
                <div className="rounded-3xl border border-border/70 bg-card/90 p-5 shadow-2xl backdrop-blur-2xl">
                    <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <PieChart className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-extrabold leading-none">Course Progress</p>
                            <p className="text-xl font-black mt-1">94.2%</p>
                        </div>
                    </div>
                </div>
              </div>

               <div className="absolute -right-8 bottom-1/4 hidden xl:block animate-bounce-slow" style={{ animationDelay: '1s' }}>
                <div className="rounded-3xl border border-border/70 bg-card/90 p-5 shadow-2xl backdrop-blur-2xl">
                    <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                            <Zap className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-extrabold leading-none">Global Sync</p>
                            <p className="text-xl font-black mt-1">Active Now</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏗️ 2. Solutions Hub: The Core Features */}
      <section className="py-32 bg-[#F8F7FC] dark:bg-card/20 relative">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
                <Badge className="bg-secondary/15 text-secondary border-none mb-4 py-1.5 px-4 rounded-full font-bold">Solutions Hub</Badge>
                <h2 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-6">Designed for Every <br /> <span className="text-primary italic">Seat in the Cockpit</span></h2>
                <p className="text-xl text-muted-foreground leading-relaxed italic">Unlike generic learning systems, Class Pilot provides specialized instruments for students, instructors, and captains.</p>
            </div>
            <Link href="/login" className="group flex items-center gap-3 text-primary font-bold text-lg hover:underline transition-all">
                Explore All Features <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {/* 👨‍🎓 For Students: The Pilot Deck */}
            <div className="relative group p-10 rounded-[40px] bg-background border border-border transition-all hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 transition-transform group-hover:scale-110">
                    <GraduationCap className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-extrabold mb-4">The Pilot Deck</h3>
                <p className="text-muted-foreground leading-relaxed mb-10 italic truncate-3-lines">
                    &ldquo;Track your flight path from day one. View submission history, monitor grades in real-time, and never miss an assignment alert.&rdquo;
                </p>
                
                <ul className="space-y-4">
                    {[
                        "Submission History Radar", 
                        "In-Flight Grade Metrics", 
                        "Interactive Resource Library",
                        "Direct instructor Sync"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                            <CheckCircle2 className="h-5 w-5 text-primary" /> {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* 👩‍🏫 For Teachers: The Instructor Panel */}
            <div className="relative group p-10 rounded-[40px] bg-background border border-border transition-all hover:border-secondary/20 hover:shadow-2xl hover:shadow-secondary/5">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary text-secondary-foreground shadow-xl shadow-secondary/20 transition-transform group-hover:scale-110">
                    <Users className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-extrabold mb-4">The Instructor Panel</h3>
                <p className="text-muted-foreground leading-relaxed mb-10 italic truncate-3-lines">
                    &ldquo;Guide your squadron with ease. Manage enrollments, deploy assignments across classes, and provide instant pilot feedback.&rdquo;
                </p>
                
                <ul className="space-y-4">
                    {[
                        "Squadron Enrollment Control", 
                        "Assignment Deployment", 
                        "Real-time Pilot Monitoring",
                        "Automated Grading Flow"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                            <CheckCircle2 className="h-5 w-5 text-secondary" /> {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* 🏛️ For Admins: The Flight Control Center */}
            <div className="relative group p-10 rounded-[40px] bg-background border border-border transition-all hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-extrabold mb-4">Flight Control Center</h3>
                <p className="text-muted-foreground leading-relaxed mb-10 italic truncate-3-lines">
                    &ldquo;Full visibility over the entire institution. Manage faculty, monitor institutional health, and secure all flight data.&rdquo;
                </p>
                
                <ul className="space-y-4">
                    {[
                        "Global Institution Oversight", 
                        "Instructor Validation", 
                        "Big-Data Academic Insights",
                        "Enterprise Identity Control"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                            <CheckCircle2 className="h-5 w-5 text-primary" /> {item}
                        </li>
                    ))}
                </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ⭐ 3. Pricing Cockpit: Choose Your Level */}
      <section className="py-32 px-6 lg:px-12 bg-background relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
           <div className="text-center mb-24">
                <Badge className="mb-4 bg-primary/10 text-primary border-none px-4 rounded-full font-bold">Pricing Cockpit</Badge>
                <h2 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-6 leading-tight">Plans for Every <br /> <span className="text-primary italic">Academy Type</span></h2>
                <p className="text-xl text-muted-foreground/80 lowercase italic font-medium leading-none">Transparent pricing for top-tier flight training.</p>
           </div>

           <div className="grid gap-8 md:grid-cols-3">
              {[
                { 
                    name: "Basic Pilot", 
                    price: "$0", 
                    desc: "Perfect for independent learners starting their flight path.",
                    features: ["Access to 3 Classes", "Public Resource Library", "Basic Progress Chart", "Email Support"],
                    button: "Start Free",
                    popular: false
                },
                { 
                    name: "Pro Instructor", 
                    price: "$29", 
                    desc: "Advanced instruments for serious educators managing multiple squadrons.",
                    features: ["Unlimited Classes", "Private Dashboard", "Priority grading flow", "Custom Assignment Builder", "24/7 Ground Support"],
                    button: "Take Flight",
                    popular: true
                },
                { 
                    name: "Enterprise Academy", 
                    price: "Custom", 
                    desc: "Full institution-wide flight control with dedicated server infrastructure.",
                    features: ["Institutional Oversight", "Instructor Validation", "Advanced API Access", "dedicated Success Manager", "Enterprise Level Encryption"],
                    button: "Contact Crew",
                    popular: false
                }
              ].map((plan, i) => (
                  <div key={i} className={cn(
                    "relative flex flex-col p-8 rounded-[40px] border transition-all duration-300",
                    plan.popular 
                        ? "bg-[#151121] text-white border-primary shadow-[0_32px_80px_-40px_rgba(99,57,166,0.8)] scale-105 z-10" 
                        : "bg-background border-border hover:border-primary/20"
                  )}>
                    {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-linear-to-r from-primary to-secondary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest leading-none">
                            Most Selected
                        </div>
                    )}
                    <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                        {plan.price !== "Custom" && <span className="text-sm font-bold opacity-60">/mo</span>}
                    </div>
                    <p className="text-sm mb-10 leading-relaxed font-medium opacity-70 italic">{plan.desc}</p>
                    
                    <div className="space-y-4 mb-12 flex-1">
                        {plan.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-sm font-semibold">
                                <div className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full", plan.popular ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary")}>
                                    <Check className="h-3 w-3 " strokeWidth={4} />
                                </div>
                                {feature}
                            </div>
                        ))}
                    </div>

                    <Button className={cn(
                        "h-14 rounded-2xl text-base font-black shadow-lg transition-all",
                        plan.popular ? "bg-primary text-white hover:bg-primary/90" : "bg-background border border-border text-foreground hover:bg-muted"
                    )}>
                        {plan.button}
                    </Button>
                  </div>
              ))}
           </div>
        </div>
      </section>

      {/* 🎙️ 4. Pilot Testimonials: Success Stories */}
      <section className="py-32 px-6 lg:px-12 bg-[#F8F7FC] dark:bg-card/10">
        <div className="container mx-auto max-w-7xl">
           <div className="text-center mb-24">
                <Badge className="mb-4 bg-primary/10 text-primary border-none px-4 rounded-full font-bold uppercase tracking-widest text-[10px]">Testimonials</Badge>
                <h2 className="text-4xl font-extrabold tracking-tight lg:text-6xl leading-tight">Hear from the <br /> <span className="text-primary italic">Academy Elite</span></h2>
           </div>

           <div className="grid gap-8 md:grid-cols-3">
                {[
                    { 
                        quote: "Class Pilot has completely stabilized our academic workflow. I finally have a heads-up display for my students' progress.", 
                        author: "Sarah L.", 
                        role: "Student Pilot", 
                        avatar: "https://i.pravatar.cc/100?u=sarah"
                    },
                    { 
                        quote: "The Instructor Panel is the finest teaching tool I've used in 15 years. It’s not just a CRM; it’s a mission control for education.", 
                        author: "Dr. James Aris", 
                        role: "Lead Instructor", 
                        avatar: "https://i.pravatar.cc/100?u=james"
                    },
                    { 
                        quote: "Institutional oversight was our biggest hurdle. Now, with the Control Center, we manage 500+ instructors with total transparency.", 
                        author: "Markus V.", 
                        role: "Academy Dean", 
                        avatar: "https://i.pravatar.cc/100?u=markus"
                    }
                ].map((testimonial, i) => (
                    <div key={i} className="p-10 rounded-[40px] bg-background border border-border shadow-sm hover:shadow-xl transition-all">
                        <div className="flex gap-1 mb-8">
                            {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-secondary text-secondary" />)}
                        </div>
                        <p className="text-lg font-medium leading-relaxed mb-10 italic text-muted-foreground/90 leading-tight">
                            &ldquo;{testimonial.quote}&rdquo;
                        </p>
                        <div className="flex items-center gap-4">
                            <Image src={testimonial.avatar} alt={testimonial.author} width={50} height={50} className="rounded-2xl border border-border shadow-sm" />
                            <div>
                                <p className="font-bold text-base leading-none mb-1">{testimonial.author}</p>
                                <p className="text-xs font-bold text-primary uppercase tracking-widest leading-none">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
           </div>
        </div>
      </section>

      {/* 🚀 5. CTA: Ready for Takeoff */}
      <section className="py-24 px-6 lg:px-12 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="relative rounded-[56px] overflow-hidden bg-[#151121] px-10 py-24 lg:py-40 text-center text-white shadow-2xl isolate">
            <div className="absolute top-0 right-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top_right,rgba(99,57,166,0.25)_0%,transparent_50%)]" />
            <div className="absolute bottom-0 left-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(238,158,33,0.1)_0%,transparent_50%)]" />
            
            <div className="max-w-3xl mx-auto flex flex-col items-center">
                 <div className="flex h-16 w-16 mb-8 items-center justify-center rounded-3xl bg-primary/20 border border-primary/40 text-primary backdrop-blur-sm shadow-2xl shadow-primary/20 transition-transform hover:scale-110">
                    <Rocket className="h-8 w-8 animate-pulse" />
                </div>
                <h2 className="text-5xl font-black lg:text-[110px] mb-8 tracking-tighter leading-[0.8]">Start Your <br /> Mission Today.</h2>
                <p className="text-xl text-white/60 mb-14 max-w-xl mx-auto italic">Join the most advanced squadron in digital education. Your flight plan starts here.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
                    <Button asChild size="lg" className="h-16 w-full sm:w-80 rounded-[28px] bg-primary text-xl font-black shadow-[0_20px_40px_-15px_rgba(99,57,166,0.5)] hover:scale-[1.03] active:scale-95 transition-all outline-none ring-primary/20 hover:ring-2">
                        <Link href="/register">Join the Squadron</Link>
                    </Button>
                    <Button asChild variant="outline" className="h-16 w-full sm:w-80 rounded-[28px] border-white/20 bg-white/5 text-xl font-black hover:bg-white hover:text-black hover:scale-[1.03] active:scale-95 transition-all backdrop-blur-md outline-none">
                        <Link href="/login">Pilot Login</Link>
                    </Button>
                </div>
                <div className="mt-16 flex flex-wrap justify-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="flex items-center gap-2"><Cloud className="h-6 w-6" /><span className="font-bold uppercase tracking-[0.2em] text-xs">Cloud Native</span></div>
                    <div className="flex items-center gap-2"><Command className="h-6 w-6" /><span className="font-bold uppercase tracking-[0.2em] text-xs">Full Control</span></div>
                    <div className="flex items-center gap-2"><LockIcon className="h-6 w-6" /><span className="font-bold uppercase tracking-[0.2em] text-xs">Secure Landing</span></div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckCircle2({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
        </svg>
    )
}

function LockIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
    )
}

function cn(...inputs: (string | boolean | undefined | null)[]) {
    return inputs.filter(Boolean).join(" ");
}
