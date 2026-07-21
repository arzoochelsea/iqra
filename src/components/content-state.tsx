export function ContentSkeleton({ label = "Loading content" }: { label?: string }) {
  return <div className="skeleton-card" role="status" aria-label={label}>
    <span className="skeleton-line skeleton-short" /><span className="skeleton-line" /><span className="skeleton-line skeleton-medium" />
    <span className="sr-only">{label}…</span>
  </div>;
}

export function ErrorCard({ title, message }: { title: string; message: string }) {
  return <div className="error-card" role="alert"><span aria-hidden="true">!</span><div><h3>{title}</h3><p>{message}</p></div></div>;
}
