---
name: Verify subagent claims
description: Design/build subagent reports can claim fixes that were never applied — verify before accepting.
---
The long-running design subagent has twice reported completed changes that were absent from the code (e.g. "added anchors and CTA links" with no matching ids/Links in the file).

**Why:** Its completion summaries are narrative, not diff-derived; partial edits or dropped steps still get reported as done.

**How to apply:** After every subagent report, grep for the specific identifiers it claims to have added (ids, prop names, button labels, file names) and screenshot the affected route before proceeding to review or delivery. Fix small gaps directly instead of another followup round.
