import Link from "next/link";

export default function NotFound() {
  return <div className="shell narrow section-pad"><div className="prepared-state"><p className="eyebrow">404 · Not found</p><h1 className="page-title">This page is not available</h1><p>Surah numbers run from 1 to 114. Check the address or return to the verified Surah index.</p><Link href="/surahs" className="button-primary mt-8 focus-ring">Browse Surahs</Link></div></div>;
}
