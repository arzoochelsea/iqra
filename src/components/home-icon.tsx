export type HomeIconName = "book" | "calendar" | "clock" | "qibla" | "dua" | "lantern";

export function HomeIcon({ name }: { name: HomeIconName }) {
  const paths: Record<HomeIconName, React.ReactNode> = {
    book: <><path d="M3 5.5c3.6-.8 6.6.2 9 2.8v11.5c-2.4-2.6-5.4-3.6-9-2.8zM21 5.5c-3.6-.8-6.6.2-9 2.8v11.5c2.4-2.6 5.4-3.6 9-2.8z" /><path d="M12 8.3v11.5" /></>,
    calendar: <><rect x="4" y="5.5" width="16" height="14" rx="1.5" /><path d="M8 3v5M16 3v5M4 10h16M8 14h2M14 14h2" /></>,
    clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.2 2" /></>,
    qibla: <><path d="M5 20h14M7 20V9l5-4 5 4v11M9.5 20v-5h5v5M8.5 10h7" /><path d="M12 2v3" /></>,
    dua: <><path d="M5.5 12c-1.8-2.6-2-5-.8-7 .4-.7 1.3-.6 1.5.2l1 4.1 2.2 2.1c1.1 1.1 1.6 2.4 1.6 4V21M18.5 12c1.8-2.6 2-5 .8-7-.4-.7-1.3-.6-1.5.2l-1 4.1-2.2 2.1c-1.1 1.1-1.6 2.4-1.6 4V21" /></>,
    lantern: <><path d="M9 4h6M8 7h8l1 3-1 9H8l-1-9zM10 2h4M10 19v2M14 19v2" /><path d="M10 11h4v5h-4z" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}
