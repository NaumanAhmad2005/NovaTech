import { ReactNode } from "react";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalTopbar from "@/components/portal/PortalTopbar";

export const metadata = {
  title: "Client Portal | NovaTech Enterprise",
  description: "Your secure digital workspace — track projects, review designs, manage invoices, and collaborate with your NovaTech team.",
  keywords: "client portal, project management, NovaTech, workspace",
};

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#050816] text-slate-300 font-sans overflow-hidden selection:bg-blue-500/30">
      {/* Sidebar */}
      <PortalSidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 min-h-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.05),transparent)]">
        {/* Sticky topbar */}
        <PortalTopbar />

        {/* Scrollable page content */}
        <main
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 scrollbar-thin"
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="max-w-[1400px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
