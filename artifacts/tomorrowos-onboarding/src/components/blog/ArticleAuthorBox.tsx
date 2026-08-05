import { Linkedin, Github, ExternalLink } from 'lucide-react';
import { BLOG_AUTHOR } from '@/lib/cmsArticleMeta';

const socialLink =
  'inline-flex items-center gap-1.5 rounded-[8px] border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

/**
 * Standard author box shown at the bottom of every Blog article.
 * Content comes from the shared BLOG_AUTHOR profile so byline, author box
 * and Person JSON-LD stay in sync.
 */
export function ArticleAuthorBox() {
  return (
    <aside
      aria-label={`About the author, ${BLOG_AUTHOR.name}`}
      className="flex flex-col gap-3 rounded-[12px] border border-border bg-muted/30 p-6"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        About the author
      </p>
      <p className="text-base font-semibold text-foreground">{BLOG_AUTHOR.name}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{BLOG_AUTHOR.bio}</p>
      <div className="flex flex-wrap gap-2.5 pt-1">
        <a href={BLOG_AUTHOR.linkedin} target="_blank" rel="noopener noreferrer" className={socialLink}>
          <Linkedin className="h-4 w-4" aria-hidden="true" />
          LinkedIn
          <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
          <span className="sr-only"> (opens in a new window)</span>
        </a>
        <a href={BLOG_AUTHOR.github} target="_blank" rel="noopener noreferrer" className={socialLink}>
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
          <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
          <span className="sr-only"> (opens in a new window)</span>
        </a>
      </div>
    </aside>
  );
}
