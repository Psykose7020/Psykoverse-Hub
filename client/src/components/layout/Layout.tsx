import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FeedbackModal from "@/components/FeedbackModal";
import allianceLogo from "@assets/Design_sans_titre_(2)_1765292527261.png";

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
      <div className="fixed inset-0 space-bg opacity-20 pointer-events-none z-0"></div>
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.02] pointer-events-none z-0">
        <img src={allianceLogo} alt="" className="w-full h-full object-contain animate-[spin_180s_linear_infinite]" />
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
