export function ContentSection({ id, eyebrow, title, children, tone = "plain" }: { id?: string; eyebrow?: string; title: string; children: React.ReactNode; tone?: "plain" | "card" | "reflection" }) {
  return <section id={id} className={tone === "plain" ? "content-section" : tone === "reflection" ? "content-section reflection-card" : "content-section content-card"}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 className="section-title">{title}</h2><div className="prose-copy">{children}</div>
  </section>;
}
