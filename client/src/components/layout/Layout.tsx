import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FeedbackModal from "@/components/FeedbackModal";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: window.location.pathname,
        referrer: document.referrer || null,
      }),
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground overflow-x-hidden bg-background relative scroll-smooth">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 space-bg opacity-[0.08]" />
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(0,191,255,0.12),transparent_55%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[24rem] bg-[radial-gradient(circle_at_bottom,rgba(255,150,0,0.07),transparent_60%)]" />
      </div>

      <Header />
      
      <main className="flex-1 relative z-10">
        {children}
      </main>
      
      <Footer />
      <FeedbackModal />
    </div>
  );
}
