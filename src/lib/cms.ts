import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// Default content — used when DB is not configured or empty
export const defaultContent: Record<string, Record<string, string>> = {
  hero: {
    badge: "ENTERPRISE SOFTWARE COMPANY",
    headline_line1: "We Engineer",
    headline_line2: "Digital",
    headline_line3: "Excellence.",
    subtitle: "Building enterprise software, AI systems, cloud platforms, and digital products that scale globally.",
    button_primary: "Start Your Project",
    button_secondary: "Explore Our Work",
    stat1_num: "50+",
    stat1_label: "Projects Delivered",
    stat2_num: "99%",
    stat2_label: "Client Satisfaction",
    stat3_num: "24/7",
    stat3_label: "Global Support",
  },
  about: {
    badge: "WHO WE ARE",
    headline: "Built by Engineers, for Engineers",
    subtitle: "We are a team of passionate engineers, designers, and strategists who believe great software can change the world.",
    founded: "2020",
    team_size: "25+",
    countries: "12",
  },
  cta: {
    headline: "Ready to Build Something Extraordinary?",
    subtitle: "Join 50+ companies who chose NovaTech to engineer their digital future.",
    button_primary: "Start Your Project",
    button_secondary: "Schedule a Call",
  },
  footer: {
    tagline: "Engineering tomorrow's solutions, today.",
    copyright: `© ${new Date().getFullYear()} NovaTech. All rights reserved.`,
    email: "hello@novatech.io",
    phone: "+1 (555) 000-0000",
  },
};

export type CMSContent = Record<string, Record<string, string>>;

// Server-side fetch (use in server components)
export async function fetchCMSContent(section?: string): Promise<CMSContent> {
  const isConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") &&
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!isConfigured) return defaultContent;

  try {
    let query = supabaseAdmin.from("site_content").select("section, key, value");
    if (section) query = query.eq("section", section);
    const { data } = await query;

    if (!data || data.length === 0) return defaultContent;

    // Build nested object: { section: { key: value } }
    const result: CMSContent = { ...defaultContent };
    for (const row of data) {
      if (!result[row.section]) result[row.section] = {};
      result[row.section][row.key] = row.value;
    }
    return result;
  } catch {
    return defaultContent;
  }
}
