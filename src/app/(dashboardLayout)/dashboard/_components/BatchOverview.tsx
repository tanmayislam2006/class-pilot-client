"use client";

import { Calendar, Clock, GraduationCap, Phone, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { StudentProfile } from "@/types/student.types";

interface BatchOverviewProps {
  student: StudentProfile;
}

export default function BatchOverview({ student }: BatchOverviewProps) {
  const { batch } = student;
  const teacher = batch.teacher;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Batch Information Card */}
      <Card className="border-border/70 bg-card/50 shadow-sm transition-all hover:border-border">
        <CardHeader className="pb-3 text-sm">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="font-mono text-[10px] tracking-widest uppercase">My Active Batch</Badge>
            <GraduationCap className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-xl font-bold tracking-tight">{batch.name}</CardTitle>
          <CardDescription className="line-clamp-2 text-xs leading-relaxed">
            {batch.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-background/40 p-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Clock className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Class Schedule</p>
              <p className="truncate text-sm font-semibold">{batch.schedule}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Starts: {format(new Date(batch.startDate), "MMM dd")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Ends: {format(new Date(batch.endDate), "MMM dd, yyyy")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teacher/Mentor Information Card */}
      <Card className="border-border/70 bg-card/50 shadow-sm transition-all hover:border-border">
        <CardHeader className="pb-3 text-sm">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="font-mono text-[10px] tracking-widest uppercase">Assigned Teacher</Badge>
            <UserIcon className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-xl font-bold tracking-tight">Meet your Teacher</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-background shadow-lg ring-1 ring-primary/20">
              {teacher?.user.image ? (
                <Image
                  src={teacher.user.image}
                  alt={teacher.user.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                  <UserIcon className="h-6 w-6" />
                </div>
              )}
            </div>
            <div className="min-w-0 space-y-1">
              <p className="text-base font-bold leading-none">{teacher?.user.name}</p>
              <p className="text-xs font-medium text-primary uppercase tracking-wider">{teacher?.subject}</p>
              <div className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground">
                <Phone className="h-3 w-3" />
                <span>{teacher?.phone}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 rounded-xl border border-dashed border-primary/20 bg-primary/5 p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Mentorship Note</p>
            <p className="text-xs italic leading-snug text-muted-foreground">
              &quot;Dedicated to helping you master {teacher?.subject} with hands-on practice and clear concepts.&quot;
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
