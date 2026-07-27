# Website phase — Figma export extraction notes

Source: attached_assets/extracted/tomorrowos-website/Home.png (2186x7128) and Home@2x.png (4372x14256).
Pre-sliced reference images (1400px wide, 6 vertical slices of Home.png): attached_assets/extracted/tomorrowos-website/home_slice_0.png … home_slice_5.png.
Layout of export: dark rounded frame; LEFT = desktop design (~1440 logical width, page canvas x≈70–746 in slice coords), RIGHT = mobile design (~375 logical width, x≈778–962).

## Desktop sections (top → bottom, legible copy)
1. Header: TomorrowOS wordmark (circle glyph + "Tomorrow" bold + "OS" light), nav: Explore, Get Started; right: "GitHub" outline button, "Start building" black button.
2. Hero: H1 "Build and own your digital signage software." Sub: "Build your own CMS, add screen management to an existing application or create an entirely new digital signage product." Second line: "Open source, self-hosted and free to build on your own infrastructure." CTAs: "Get started" (black), "Explore TomorrowOS" (outline).
3. Architecture diagram: left column three cards — "Build a CMS / Create your own content management system", "Connect an app / Integrate screens into your existing application", "Create a new experience / Build an entirely new digital signage experience" (each with small black icon square) → center card "TomorrowOS / Shared runtime, APIs and device layer" → right column platform logo cards: Samsung Tizen, LG webOS, BrightSign, Android, Windows. Dotted connector lines, subtle dotted-grid background. Caption below: "One shared foundation beneath every screen experience."
4. "Start your way." H2 + sub "Whether you build with AI-assisted tools or write against the SDK directly, you start from the same foundation." Buttons: "View the docs" (outline), "View GitHub >" (text link).
   Left: mini diagram — three cards "AI-assisted / Replit, Lovable, Bubble, Cursor", "SDK / Runtime, APIs, CLI", "Existing product / CMS, SaaS, dashboards, enterprise apps" → "TomorrowOS / Shared foundation" → tablet mockup showing a Welcome screen.
   Right: four rows with rules between: "Connect your product — Add digital signage to any existing CMS, SaaS platform, dashboard or enterprise application." / "Start simple — Use a Node.js capable development platform such as Replit to build a digital signage CMS, connect a screen and publish content in minutes." / "Develop with the SDK — Use the Server SDK, APIs, runtime and CLI to build the full product." / "Deploy on cloud platforms — Run your TomorrowOS server on infrastructure that supports persistent processes and WebSocket connections."
   Below right: "Platforms" card with Render, Fly.io, Northflank logos.
5. "Built to be owned" H2 + sub "Own your product, choose your infrastructure and build without platform lock-in." Three image cards (soft 3D grey illustrations) with eyebrow/title/desc/Learn >:
   - OWNED / "Own your product" / "Your frontend, workflows, users, data and commercial model remain yours."
   - PORTABLE / "Choose your infrastructure" / "Self-host locally, deploy privately or run it in the cloud environment you choose."
   - YOURS / "Support multiple platforms" / "Build against one shared layer across supported screen hardware."
6. "Start from a working pattern." H2 + sub "Start with a proven structure, then shape it around your product." Five small cards (icon + title + desc): Digital menu boards / Directory boards / Retail media networks / Internal communications / Custom signage products. (Descs: "Pricing, promos and scheduling across one or more screens." / "Structured data, layouts and navigation for buildings or campuses." / "Campaigns, inventory, playback and proof-of-play foundations." / "News, dashboards and operational content across managed screens." / "Your frontend and workflows on top of the shared TomorrowOS layer.") Button below: "Knowledge Base >".
7. Final CTA: "Build the signage product only you can build." + "TomorrowOS provides the shared screen layer underneath. You keep control of everything that makes your product different." CTAs: "Get started" (black), "View GitHub" (outline).
8. Footer: wordmark; left "Open-source digital signage foundation."; center "TomorrowOS 2026." (use current year, not hard-coded); right links Privacy Policy, Terms of Service, Cookies Settings.

## Mobile column
Same sections stacked; hero copy differs slightly: "Open source, free to build, test and run on your own infrastructure." CTAs "Start building" / "Explore the docs". Diagram compresses to three small cards (Build SDK / Connect API / Create Custom app) → TomorrowOS card → "Supported platforms" logo card. Hamburger menu in header. Section list rows replace side-by-side layout; "USE CASES" eyebrow above "Start from a working pattern."

## Assets needing extraction/placeholders
- Platform logos (Samsung, LG webOS, BrightSign, Android, Windows) and cloud logos (Render, Fly.io, Northflank): third-party wordmarks — prefer text/simple SVG treatment or crops from Home@2x.png; do NOT invent altered logos.
- Three 3D illustration card images ("Built to be owned") + tablet mockup: crop from Home@2x.png (2x quality) into src assets, or use MissingAssetPlaceholder if crops look poor.
- The full export must NOT ship as a page image (spec §9, §18).

## Spec override / notes
- Spec file: attached_assets/Pasted-Extend-the-existing-TomorrowOS-website-and-onboarding-p_1785131904728.txt (authoritative, 35 acceptance criteria §23).
- The Figma page becomes /quickstart; a NEW restrained placeholder homepage goes at / (spec §7 copy is authoritative for the homepage — do not copy Figma hero verbatim there).
- Header nav labels in Figma: Explore, Get Started, GitHub, Start building — use these exact labels (spec §6 says use final-design labels).
- Footer year: current year via Date, not "2026".
