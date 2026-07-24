import Link from "next/link";

export function ProfileLink() {
  return <Link href="/saved" className="profile-link focus-ring" aria-label="Open saved journey">
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.25" /><path d="M5.5 20c.5-4 2.7-6 6.5-6s6 2 6.5 6" /></svg>
  </Link>;
}
