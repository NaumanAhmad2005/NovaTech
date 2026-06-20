import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder',
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Check if user has portal access
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        // Fetch user profile from your custom table (you'd need to create this in Supabase)
        // e.g., client_profiles
        // For now, redirect everyone to /portal, or just /
        // Based on instructions: "if a new user loged in, he will remain in the main website page"
        // And "The admin will assign which email or user will have its own portal"
        // Let's redirect to /auth/redirect (we'll build it) so we can do client-side checks and show a nice UI.
        return NextResponse.redirect(`${origin}/auth/redirect`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
