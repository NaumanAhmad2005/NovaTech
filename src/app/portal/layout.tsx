import { ReactNode } from "react";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalTopbar from "@/components/portal/PortalTopbar";

export const metadata = {
  title: "Client Portal | NovaTech Enterprise",
  description: "Secure client workspace for project tracking and collaboration.",
};

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#050816] text-slate-300 font-sans overflow-hidden selection:bg-blue-500/30">
      <PortalSidebar />
      <div className="flex flex-col flex-1 min-w-0 min-h-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/5 via-[#050816] to-[#050816]">
        <PortalTopbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <div className="max-w-[1400px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
