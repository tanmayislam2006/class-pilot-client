import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/currentUser";
import { getDefaultDashboardRoute, UserRole } from "@/lib/authUtils";

export const dynamic = "force-dynamic";

export default async function PaymentSuccessPage() {
  const user = await getCurrentUser();
  const dashboardRoute = user ? getDefaultDashboardRoute(user.role as UserRole) : "/login";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center transform transition-all duration-500 hover:scale-[1.02]">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-800 mb-4 animate-slide-up">
          Payment Successful!
        </h1>
        
        <p className="text-slate-600 mb-8 animate-slide-up delay-100">
          Your transaction has been completed successfully. Your account has been updated, and you can now explore all the premium features.
        </p>

        <div className="bg-slate-50 rounded-2xl p-4 mb-8 text-left animate-slide-up delay-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis">Status</span>
            <span className="text-sm font-bold text-green-600 whitespace-nowrap overflow-hidden text-ellipsis">Completed</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis">Transaction Type</span>
            <span className="text-sm font-bold text-slate-700 whitespace-nowrap overflow-hidden text-ellipsis">Subscription</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 animate-slide-up delay-300">
          <Link href={dashboardRoute} className="w-full">
            <Button className="cursor-pointer w-full h-12 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20">
              {user ? "Go to Dashboard" : "Log In to Dashboard"}
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="outline" className="cursor-pointer w-full h-12 text-lg font-semibold rounded-xl border-2 hover:bg-slate-50 transition-all">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mt-8 text-slate-400 text-sm animate-pulse-slow">
        Building your future with Class Pilot
      </div>
    </div>
  );
}


