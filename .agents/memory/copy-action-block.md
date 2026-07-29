---
name: CopyActionBlock standard
description: All copyable prompts/commands/URLs/variables in the onboarding site must use the shared CopyActionBlock component.
---

Rule: any copyable prompt, command, URL, variable name, or value in tomorrowos-onboarding must render through the shared `CopyActionBlock` component (dark panel for prompts/commands/code, light for URLs/variables/values), never inline `navigator.clipboard` calls or the legacy `CopyableText`.

**Why:** Spec requires consistent contextual labels ("PROMPT FOR v0"), explicit text copy buttons, destination-specific copied messages, aria-live feedback, a copy-failure fallback message, and Review Mode diagnostics. A stray inline clipboard button in Samsung troubleshooting failed the first architect review.

**How to apply:** New copyable content gets a `CopyActionBlock` with type, contextual `label`, `copiedMessage` naming the destination, `destinationHint`, and a `sourceKey` for Review Mode. `PlaceholderCommand` remains the mechanism for not-yet-real placeholder commands. The v0 trigger string "Follow @tomorrowos/sdk VERCEL_SETUP.md and set up my TomorrowOS CMS." is the maintained SDK trigger — never reword it.
