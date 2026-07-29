import fs from "node:fs";

for (const file of ["package-lock.json", "yarn.lock"]) {
  try {
    fs.unlinkSync(file);
  } catch {
    // ignore missing lockfiles
  }
}

const ua = process.env.npm_config_user_agent ?? "";
if (!ua.includes("pnpm/")) {
  console.error("Use pnpm instead");
  process.exit(1);
}
