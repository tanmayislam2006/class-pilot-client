import DashboardLayout from "@/components/layout/DashboardLayout";
import { isUserRole } from "@/lib/authUtils";
import { getCurrentUser } from "@/lib/currentUser";
import AuthHydrator from "@/providers/AuthHydrator";
import { redirect } from "next/navigation";

export default async function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user || !isUserRole(user.role)) {
    redirect("/login");
  }

  return (
    <>
      <AuthHydrator user={user} />
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
}
