"use client";

import { useSyncExternalStore } from "react";
import { SHOP } from "@/lib/shop";

const fmt = (h: number) => (h === 12 ? "12 pm" : h > 12 ? `${h - 12} pm` : `${h} am`);

/** Weekday and hour in Kolkata, whatever the visitor's own clock says. */
function kolkataNow() {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, hour: Number(get("hour")) + Number(get("minute")) / 60 };
}

function status(): string {
  const { day, hour } = kolkataNow();
  const [open, close] = SHOP.week[day];
  if (hour >= open && hour < close) return `open|Open now · closes at ${fmt(close)}`;
  if (hour < open) return `closed|Closed now · opens at ${fmt(open)} today`;
  return `closed|Closed now · opens tomorrow at ${fmt(SHOP.week[(day + 1) % 7][0])}`;
}

// Re-check once a minute; nothing is shown on the server, so the page never disagrees with itself.
const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 60_000);
  return () => clearInterval(t);
};

export default function OpenNow({ onDark = false, className = "" }: { onDark?: boolean; className?: string }) {
  const value = useSyncExternalStore(subscribe, status, () => "");
  if (!value) return <span className={`inline-block h-5 ${className}`} aria-hidden="true" />;
  const [state, text] = value.split("|");
  const open = state === "open";
  return (
    <span className={`inline-flex items-center gap-2 text-[14.5px] font-semibold ${onDark ? "text-on-graphite" : "text-ink"} ${className}`}>
      <span className={`h-2 w-2 rounded-full ${open ? "bg-whatsapp" : onDark ? "bg-on-graphite-2" : "bg-ink-4"}`} aria-hidden="true" />
      {text}
    </span>
  );
}
