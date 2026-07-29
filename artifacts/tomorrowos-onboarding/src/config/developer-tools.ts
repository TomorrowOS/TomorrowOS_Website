/**
 * Central configuration for the developer-tools strip shown on Terminal
 * Step 1 ("Before you begin"). Informational only — these are examples of
 * coding tools developers may already use locally; they are not selectable,
 * not stored, and do not affect the onboarding flow.
 *
 * logoPath is relative to the app base; prefix with import.meta.env.BASE_URL
 * when rendering.
 */
export interface DeveloperTool {
  id: string;
  label: string;
  logoPath: string;
  /** Tailwind height class to optically balance wordmarks of differing visual weight. */
  heightClass: string;
}

export const terminalDeveloperTools: DeveloperTool[] = [
  {
    id: 'claude-code',
    label: 'Claude Code',
    logoPath: 'assets/developer-tools/claude-code.svg',
    heightClass: 'h-6',
  },
  {
    id: 'cursor',
    label: 'Cursor',
    logoPath: 'assets/developer-tools/cursor.svg',
    heightClass: 'h-[18px]',
  },
  {
    id: 'github-copilot',
    label: 'GitHub Copilot',
    logoPath: 'assets/developer-tools/github-copilot.svg',
    heightClass: 'h-5',
  },
  {
    id: 'openai-codex',
    label: 'OpenAI Codex',
    logoPath: 'assets/developer-tools/openai-codex.svg',
    heightClass: 'h-5',
  },
  {
    id: 'gemini-cli',
    label: 'Gemini CLI',
    logoPath: 'assets/developer-tools/gemini-cli.svg',
    heightClass: 'h-[22px]',
  },
];
