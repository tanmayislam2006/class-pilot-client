import LoginForm from "@/components/modules/Auth/LoginForm";
import { GraduationCap, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden py-12 px-6 lg:px-12">
      {/* 🚀 Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -z-10 h-[800px] w-full -translate-x-1/2 bg-[radial-gradient(circle_at_top,rgba(99,57,166,0.12)_0%,transparent_60%)]" />
      <div className="absolute -top-20 -right-20 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[100px] animate-pulse" />
      <div className="absolute -bottom-20 -left-20 -z-10 h-96 w-96 rounded-full bg-secondary/5 blur-[100px] animate-pulse" />

      <div className="mx-auto w-full max-w-xl">
        <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Link href="/" className="inline-flex items-center gap-3 active:opacity-80 group">
             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                <GraduationCap className="h-7 w-7 text-primary" />
             </div>
             <div className="flex flex-col text-left">
                <span className="text-xl font-bold tracking-tight text-foreground">
                  Class <span className="text-primary italic">Pilot</span>
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">
                  Academic Mission Control
                </span>
             </div>
          </Link>
          
          <div className="mt-8">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Welcome <span className="text-primary">Back</span></h1>
            <p className="mt-3 text-muted-foreground font-medium flex items-center justify-center gap-2">
                Select your role to board the mission.
            </p>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
           <LoginForm />
        </div>
      </div>
    </div>
  );
}