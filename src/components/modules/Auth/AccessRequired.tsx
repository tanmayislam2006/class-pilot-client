"use client";

import React from "react";
import { 
  ShieldAlert, 
  Mail, 
  ArrowLeft, 
  MessageSquare, 
  Lock,
  ChevronRight,
  Info
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";

export default function AccessRequired() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="overflow-hidden border border-border/40 bg-background/80 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.15)] backdrop-blur-2xl ring-1 ring-white/10 rounded-[32px]">
        {/* Header Visual */}
        <div className="bg-primary/5 p-6 text-center border-b border-border/40">
           <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-inner mb-4">
              <Lock className="size-10" />
           </div>
           <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-primary/60">
              <ShieldAlert className="h-3 w-3 fill-primary text-primary" />
              Restricted Boarding Zone
          </div>
        </div>
        
        <CardHeader className="p-8 pb-0 text-center">
            <h1 className="text-3xl font-black tracking-tight text-foreground mb-4">Account Creation Restricted</h1>
            <p className="text-muted-foreground font-medium leading-relaxed">
              To maintain system integrity and security, **Class Pilot** does not allow public registration.
            </p>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          <div className="rounded-2xl bg-muted/30 border border-border/60 p-6 space-y-4">
            <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-background flex items-center justify-center text-primary shadow-sm">
                   <Info className="size-5" />
                </div>
                <div className="space-y-1">
                    <p className="font-bold text-sm">How to get access?</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Please contact your institution&apos;s administrator. They will verify your identity and provide your flight credentials via the secure Admin Fleet Manager.
                    </p>
                </div>
            </div>
          </div>

          <div className="grid gap-3">
             <Button 
                variant="outline" 
                className="h-14 rounded-2xl border-border/60 bg-muted/10 font-bold hover:bg-primary/5 hover:text-primary transition-all flex justify-between px-6"
                asChild
             >
                <a href="mailto:support@classpilot.com">
                   <span className="flex items-center gap-3">
                      <Mail className="size-5" />
                      Contact Support
                   </span>
                   <ChevronRight className="size-4 opacity-50" />
                </a>
             </Button>

             <Button 
                variant="outline" 
                className="h-14 rounded-2xl border-border/60 bg-muted/10 font-bold hover:bg-primary/5 hover:text-primary transition-all flex justify-between px-6"
             >
                <span className="flex items-center gap-3">
                   <MessageSquare className="size-5" />
                   Request via Admin Desk
                </span>
                <ChevronRight className="size-4 opacity-50" />
             </Button>
          </div>
        </CardContent>

        <CardFooter className="justify-center border-t border-border/40 bg-muted/20 py-8">
           <Button variant="link" className="text-primary font-bold hover:no-underline flex items-center gap-2" asChild>
              <Link href="/login">
                 <ArrowLeft className="size-4" />
                 Back to Login
              </Link>
           </Button>
        </CardFooter>
      </Card>
      
    </div>
  );
}
