"use client";

import React from "react";
import { User, Mail, Phone, MapPin, Edit, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/providers/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function ProfileInfoForm() {
  const { user } = useAuth();

  // Note: Placeholder logic for UI
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile update requested (UI only)");
  };

  if (!user) return null;

  return (
    <Card className="overflow-hidden border-border/70 bg-card/95 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] backdrop-blur">
      <CardHeader className="border-b border-border/40 bg-muted/5 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          {/* Avatar Section */}
          <div className="group relative h-28 w-28 shrink-0">
            <div className="absolute inset-0 rounded-full border-4 border-primary/10 transition-colors group-hover:border-primary/20" />
            <Avatar className="h-full w-full border-2 border-background/20 shadow-xl transition-all group-hover:scale-105 group-hover:shadow-2xl">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="bg-primary/5 text-primary text-3xl font-bold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <button className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 transition-transform active:scale-95 group-hover:scale-110">
               <Upload className="size-5" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <CardTitle className="text-3xl font-black tracking-tight text-foreground">{user.name}</CardTitle>
              <div className="flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-wider text-primary">
                {user.role}
              </div>
            </div>
            <CardDescription className="text-base font-medium text-muted-foreground flex items-center justify-center md:justify-start gap-2">
              <Mail className="size-4" /> {user.email}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
         <form onSubmit={handleSubmit} className="space-y-8">
           <div className="grid gap-8 md:grid-cols-2">
             {/* Name */}
             <div className="space-y-2">
                <Label className="text-sm font-semibold tracking-tight text-foreground/80">Full Name</Label>
                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none group-focus-within:text-primary transition-colors text-muted-foreground">
                    <User className="size-4" />
                  </div>
                  <Input 
                    placeholder="Enter your full name"
                    defaultValue={user.name}
                    className="h-12 w-full rounded-2xl border-border/60 bg-muted/20 pl-11 transition-all focus:border-primary/40 focus:bg-background focus:ring-4 focus:ring-primary/5"
                  />
                </div>
             </div>

             {/* Phone */}
             <div className="space-y-2">
                <Label className="text-sm font-semibold tracking-tight text-foreground/80">Phone Number (Optional)</Label>
                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none group-focus-within:text-primary transition-colors text-muted-foreground">
                    <Phone className="size-4" />
                  </div>
                  <Input 
                    placeholder="+880 1XXX-XXXXXX"
                    className="h-12 w-full rounded-2xl border-border/60 bg-muted/20 pl-11 transition-all focus:border-primary/40 focus:bg-background focus:ring-4 focus:ring-primary/5"
                  />
                </div>
             </div>

             {/* Location */}
             <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-semibold tracking-tight text-foreground/80">Address (Optional)</Label>
                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none group-focus-within:text-primary transition-colors text-muted-foreground">
                    <MapPin className="size-4" />
                  </div>
                  <Input 
                    placeholder="Enter your current address"
                    className="h-12 w-full rounded-2xl border-border/60 bg-muted/20 pl-11 transition-all focus:border-primary/40 focus:bg-background focus:ring-4 focus:ring-primary/5"
                  />
                </div>
             </div>
           </div>

           <div className="flex items-center justify-end pt-4 border-t border-border/40">
             <Button
                type="submit"
                className="group h-12 rounded-2xl bg-primary px-10 font-bold text-primary-foreground shadow-xl shadow-primary/20 hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all"
             >
               <Edit className="mr-2 size-4 group-hover:animate-bounce" />
               Save Profile
             </Button>
           </div>
         </form>
      </CardContent>
    </Card>
  );
}
