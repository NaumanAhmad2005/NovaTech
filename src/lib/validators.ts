/**
 * Shared validators & sanitizers — used on BOTH frontend and backend.
 * No external dependencies required.
 */

// ─── Sanitizers ────────────────────────────────────────────────────────────

/** Strip ALL HTML tags and dangerous characters to prevent XSS */
export function sanitizeString(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, "")           // strip HTML tags
    .replace(/[<>"'`]/g, "")           // strip remaining angle/quote chars
    .replace(/javascript:/gi, "")      // strip JS protocol
    .replace(/on\w+\s*=/gi, "")        // strip inline event handlers
    .trim();
}

/** Normalise whitespace — collapse multiple spaces to one */
export function normaliseSpaces(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

// ─── Validators ────────────────────────────────────────────────────────────

/** Valid name: letters (including Unicode), spaces, hyphens, apostrophes — 2–60 chars */
export function validateName(raw: string): { ok: boolean; error?: string } {
  const v = normaliseSpaces(sanitizeString(raw));
  if (!v) return { ok: false, error: "Name is required." };
  if (v.length < 2) return { ok: false, error: "Name must be at least 2 characters." };
  if (v.length > 60) return { ok: false, error: "Name must be 60 characters or fewer." };
  if (!/^[\p{L}\s'\-\.]+$/u.test(v))
    return { ok: false, error: "Name can only contain letters, spaces, hyphens, or apostrophes." };
  return { ok: true };
}

/** Standard email — RFC-5322 simplified */
export function validateEmail(raw: string): { ok: boolean; error?: string } {
  const v = sanitizeString(raw).toLowerCase();
  if (!v) return { ok: false, error: "Email is required." };
  if (v.length > 254) return { ok: false, error: "Email is too long." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
    return { ok: false, error: "Please enter a valid email address." };
  return { ok: true };
}

/**
 * International phone:
 * - Optional leading +
 * - 7–15 digits (ITU-T E.164)
 * - Allows spaces, dashes, parentheses for readability
 */
export function validatePhone(raw: string): { ok: boolean; error?: string } {
  if (!raw || raw.trim() === "") return { ok: true }; // phone is optional
  const v = sanitizeString(raw).replace(/[\s\-().]/g, "");
  const digits = v.replace(/^\+/, "");
  if (!/^\d+$/.test(digits))
    return { ok: false, error: "Phone can only contain digits, spaces, +, -, or parentheses." };
  if (digits.length < 7)
    return { ok: false, error: "Phone number is too short (minimum 7 digits)." };
  if (digits.length > 15)
    return { ok: false, error: "Phone number is too long (maximum 15 digits, ITU E.164)." };
  return { ok: true };
}

/**
 * Company name: letters, digits, spaces, common punctuation — optional field.
 * Max 100 chars.
 */
export function validateCompany(raw: string): { ok: boolean; error?: string } {
  if (!raw || raw.trim() === "") return { ok: true }; // optional
  const v = normaliseSpaces(sanitizeString(raw));
  if (v.length > 100) return { ok: false, error: "Company name must be 100 characters or fewer." };
  if (!/^[\p{L}\p{N}\s&'.\-,()]+$/u.test(v))
    return { ok: false, error: "Company name contains invalid characters." };
  return { ok: true };
}

/** Message / project details */
export function validateMessage(raw: string): { ok: boolean; error?: string } {
  const v = sanitizeString(raw).trim();
  if (!v) return { ok: false, error: "Project details are required." };
  if (v.length < 10) return { ok: false, error: "Please provide at least 10 characters." };
  if (v.length > 5000) return { ok: false, error: "Message must be 5000 characters or fewer." };
  return { ok: true };
}

/** Allowed values for dropdown selects to prevent injection via crafted values */
const ALLOWED_SERVICES = [
  "", "Custom Software Development", "Web Application", "Mobile App",
  "AI / ML Integration", "Cloud & DevOps", "Enterprise ERP/CRM",
  "Cybersecurity Audit", "UI/UX Design", "Other",
];
const ALLOWED_BUDGETS = [
  "", "$10K – $50K", "$50K – $150K", "$150K – $500K", "$500K+",
];

export function validateService(raw: string): { ok: boolean; error?: string } {
  if (ALLOWED_SERVICES.includes(raw)) return { ok: true };
  return { ok: false, error: "Invalid service selection." };
}

export function validateBudget(raw: string): { ok: boolean; error?: string } {
  if (ALLOWED_BUDGETS.includes(raw)) return { ok: true };
  return { ok: false, error: "Invalid budget selection." };
}
