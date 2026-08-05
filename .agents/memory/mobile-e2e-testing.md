---
name: Mobile e2e testing setup
description: How to run real-browser interaction/overflow tests in this workspace without installed test tooling
---
No Playwright/vitest is installed, but a Nix ungoogled-chromium binary exists in /nix/store; `playwright-core` (installed ad hoc in /tmp) with `executablePath` pointing at it drives real clicks, clipboard, and viewport checks.

**Why:** Screenshot tooling is static-only; copy buttons, clipboard-denied paths, and step-gated journey screens can't be verified without interaction.

/tmp is wiped between sessions — recreate the static server, e2e script, and `npm install playwright-core` in /tmp/pw each time. The static server must honour `_redirects` semantics: status 200 lines are rewrites (serve the target file), 3xx lines are Location redirects; smoke tests fail otherwise.

**How to apply:** Onboarding journey steps are gated by state in localStorage key `tomorrowos_prototype` (e.g. `vercelStep`, `guidedStep`, `samsungGuideStep`, `cmsUrl`) — seed it via `addInitScript` to jump straight to a step. Detect horizontal overflow via `scrollWidth - clientWidth`; past culprits were non-wrapping `flex` button rows and long `<code>` strings in prose.
