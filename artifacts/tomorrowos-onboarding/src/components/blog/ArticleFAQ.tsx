/**
 * Visible FAQ section for articles. Answers are always rendered (never hidden
 * from prerendered HTML) so FAQPage structured data matches the visible text
 * exactly. Simple semantic headings + paragraphs — fully keyboard-neutral.
 */
export function ArticleFAQ({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="flex flex-col gap-6">
      {items.map((item) => (
        <div key={item.question} className="flex flex-col gap-2">
          <h3 className="text-lg font-bold tracking-tight text-foreground">{item.question}</h3>
          <p className="leading-relaxed text-muted-foreground">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
