---
name: Onboarding honesty model
description: TomorrowOS onboarding prototype must never imply real integrations; all statuses are user-confirmed.
---

The TomorrowOS onboarding prototype is a guided instructional journey with **no real integrations** (no Replit, Supabase, Cloudinary, CMS, or device access).

**Rule:** every action/status must be one of: performed in this UI, performed externally by the user, or user-confirmed. Never assert "Connected / Healthy / Verified / Online / Passed" or show automatic success/failure unless a genuine integration verifies it. Status vocabulary: Not started / In progress / You confirmed this step / Needs help.

**Why:** a customer-facing correction spec (July 2026) mandated this after the first build simulated connection tests, publishing, and device pairing.

**How to apply:**
- Never add credential, connection-string, API-key, or pairing-code inputs. Only non-sensitive progress and an optional HTTPS-validated CMS URL may go to localStorage.
- Simulated states are allowed ONLY when Prototype Review Mode is ON, which must show the persistent "Prototype simulation —…" banner; when OFF, only instructional/user-confirmed content.
- Interaction model per step: explain → screenshots/instructions → external link → user does it externally → "I did X" confirmation button.
