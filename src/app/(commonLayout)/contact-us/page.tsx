import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Phone } from "lucide-react";

export default function ContactUsPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center py-20 px-6 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
        <MessageSquare className="h-8 w-8" />
      </div>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Get in <span className="text-secondary">Touch</span>
      </h1>
      <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
        Have questions about Class Pilot? We&apos;re here to help you navigate your academic journey smoothly.
      </p>

      <div className="grid w-full gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center gap-2 rounded-3xl border border-border/40 bg-card/50 p-8 shadow-sm transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">
          <Phone className="h-6 w-6 text-primary" />
          <h3 className="font-semibold mt-2">Call Us</h3>
          <p className="text-sm text-muted-foreground">+1 (555) 000-0000</p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-3xl border border-border/40 bg-card/50 p-8 shadow-sm transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">
          <Mail className="h-6 w-6 text-primary" />
          <h3 className="font-semibold mt-2">Email Us</h3>
          <p className="text-sm text-muted-foreground">support@classpilot.edu</p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-3xl border border-border/40 bg-card/50 p-8 shadow-sm transition-all hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h3 className="font-semibold mt-2">Support</h3>
          <p className="text-sm text-muted-foreground">24/7 Live Chat</p>
        </div>
      </div>
      
      <Button className="mt-12 h-12 rounded-full bg-primary px-10 text-base font-semibold shadow-xl shadow-primary/20">
        Send us a Message
      </Button>
    </div>
  );
}
