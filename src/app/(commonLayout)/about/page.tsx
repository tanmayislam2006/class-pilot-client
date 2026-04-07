import { Rocket, Target, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl py-20 px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
          Empowering the <span className="text-primary italic">Next Generation</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Class Pilot is designed to streamline your educational journey, providing the tools you need to succeed in a modern learning environment.
        </p>
      </div>

      <div className="grid gap-12 sm:grid-cols-3">
        <div className="flex flex-col items-center p-8 rounded-3xl bg-secondary/5 border border-secondary/10 hover:shadow-xl hover:shadow-secondary/5 transition-all">
          <Rocket className="h-10 w-10 text-secondary mb-4" />
          <h3 className="text-xl font-bold mb-2">Our Mission</h3>
          <p className="text-center text-muted-foreground leading-relaxed">
            Accelerating student success through innovative tracking and assessment tools.
          </p>
        </div>
        <div className="flex flex-col items-center p-8 rounded-3xl bg-primary/5 border border-primary/10 hover:shadow-xl hover:shadow-primary/5 transition-all">
          <Target className="h-10 w-10 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Our Vision</h3>
          <p className="text-center text-muted-foreground leading-relaxed">
            Becoming the worldwide standard for transparent academic performance monitoring.
          </p>
        </div>
        <div className="flex flex-col items-center p-8 rounded-3xl bg-secondary/5 border border-secondary/10 hover:shadow-xl hover:shadow-secondary/5 transition-all">
          <Users className="h-10 w-10 text-secondary mb-4" />
          <h3 className="text-xl font-bold mb-2">Our Community</h3>
          <p className="text-center text-muted-foreground leading-relaxed">
            Building a bridge between teachers and students for better communication and growth.
          </p>
        </div>
      </div>
    </div>
  );
}
