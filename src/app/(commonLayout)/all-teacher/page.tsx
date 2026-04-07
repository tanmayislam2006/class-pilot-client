import { GraduationCap, Mail, Sparkles, UserCheck } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function AllTeacherPage() {
  const dummyTeachers = [
    { name: "Dr. Elena Vance", subject: "Quantum Physics", experience: "12 Years", image: "https://i.pravatar.cc/150?u=elena" },
    { name: "Prof. Gordon Freeman", subject: "Theoretical Physics", experience: "15 Years", image: "https://i.pravatar.cc/150?u=gordon" },
    { name: "Dr. Alyx Vance", subject: "Applied Mechanics", experience: "8 Years", image: "https://i.pravatar.cc/150?u=alyx" },
    { name: "Prof. Isaac Kleiner", subject: "Materials Science", experience: "20 Years", image: "https://i.pravatar.cc/150?u=isaac" },
  ];

  return (
    <div className="mx-auto max-w-7xl py-20 px-6">
      <div className="text-center mb-16">
        <Badge variant="secondary" className="mb-4 py-1.5 px-4 rounded-full font-bold bg-secondary/15 text-secondary border border-secondary/20">
          <Sparkles className="h-3 w-3 mr-2" />
          Meet the Experts
        </Badge>
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Learn from the <span className="text-primary italic">Best Minds</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Access world-class education from experienced educators dedicated to your growth.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {dummyTeachers.map((teacher, idx) => (
          <div key={idx} className="group relative bg-card p-6 rounded-[32px] border border-border/40 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300">
            <div className="relative mb-6 mx-auto w-32 h-32">
                <Image 
                    src={teacher.image} 
                    alt={teacher.name} 
                    fill 
                    className="object-cover rounded-3xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-xl shadow-lg border-2 border-background">
                    <UserCheck className="h-4 w-4" />
                </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-1">{teacher.name}</h3>
              <p className="text-primary font-semibold text-sm mb-4">{teacher.subject}</p>
              
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground flex items-center">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {teacher.experience}
                </span>
              </div>
              
              <button className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-primary/5 text-primary text-sm font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Mail className="h-4 w-4" />
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
