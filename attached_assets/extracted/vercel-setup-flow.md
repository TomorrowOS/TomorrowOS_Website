# Vercel Setup 2026 — cleaned extraction

Source: attached_assets/Vercel_Setup_2026_1785129488344.docx
NOTE: This docx is a rough draft. The pasted spec (Pasted-Extend-the-existing-TomorrowOS-onboarding-MVP-by-adding_1785129430701.txt) OVERRIDES it wherever they conflict. Known docx items the spec overrides:
- "3–5 minutes" build-time promise → do NOT promise a precise build time; use "The first build may take several minutes…"
- "Depending on credits used during build, you may be asked to upgrade…" → replaced by the spec's plan-based credit messaging (section 18), inside a "Plans and usage" expandable.
- Supabase "(recommended)" hard-coded → recommendation must come from config `recommendedVercelDatabase` (default none until engineering confirms).
- Typos: "SUpbase", "Cloundinary", "recommdned" — obviously corrected.
- "Paste the SUPABASE_URL in" → do not hard-code variable names; use EnvironmentVariableMapping config with {{CONFIRMED_TOMORROWOS_DATABASE_VARIABLE}} placeholders.

## Original draft flow (context only)
1. Sign up with Vercel at vercel.com or log in via v0.app
2. Paste prompt: "Follow @tomorrowos/sdk VERCEL_SETUP.md and set up my TomorrowOS CMS" into the v0 prompt area [screenshot]
3. Connect Supabase Postgres or Neon Postgres (click-through for Supabase key; setup guide needed for Neon)
4. Paste the database URL variable (see override note above)
5. Select Cloudinary or Vercel Blob [screenshot] — show Cloudinary steps
6. Brand your experience — add as much as you need or skip [screenshot]
7. Platform builds and prepares the CMS (several minutes; complex build)
8. Credit/plan note (see override)
9. CMS sample dashboard ready — publish and test (follow steps similar to Replit: publish CMS, etc.)

Three embedded screenshots exist in the docx (v0 prompt area, storage selection, branding) — real captures may later replace VERCEL-02, VERCEL-03C/05x, VERCEL-03E placeholders.
