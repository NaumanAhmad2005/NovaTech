import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SmoothScroll from "@/components/ui/SmoothScroll";
import NoiseOverlay from "@/components/ui/NoiseOverlay";

export const metadata: Metadata = {
  title: "NovaTech — Engineering Tomorrow",
  description: "NovaTech is a premium software engineering company building enterprise-grade custom software, AI systems, cloud platforms, and digital products that scale globally.",
  keywords: ["software engineering", "AI development", "cloud solutions", "enterprise software", "web development", "mobile apps", "digital transformation"],
  openGraph: {
    title: "NovaTech — Engineering Tomorrow",
    description: "Premium software engineering company building enterprise-grade solutions that scale globally.",
    type: "website",
    siteName: "NovaTech",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaTech — Engineering Tomorrow",
    description: "Premium software engineering company building enterprise-grade solutions that scale globally.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#050816" />
      </head>
      <body>
        <NoiseOverlay />
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
