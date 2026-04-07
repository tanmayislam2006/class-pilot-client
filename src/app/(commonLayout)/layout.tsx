import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex  flex-col">
      <Navbar />
      <main className="flex-1 pt-16 min-h-[calc(100vh-100px)] ">{children}</main>
      <Footer />
    </div>
  );
}
