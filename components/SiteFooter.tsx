import Link from "next/link";
import Brand from "./Brand";
import { SHOP, telLink } from "@/lib/shop";
import { makerHref, typeHref } from "@/lib/links";
import type { MakerSummary, PartTypeSummary } from "@/lib/types";

export default function SiteFooter({ types = [], makers = [] }: { types?: PartTypeSummary[]; makers?: MakerSummary[] }) {
  const cols = [
    { title: "Popular parts", links: types.slice(0, 7).map((t) => ({ href: typeHref(t.slug), label: t.name })) },
    { title: "Car makers", links: makers.filter((m) => !m.bike).slice(0, 7).map((m) => ({ href: makerHref(m.slug), label: m.name })) },
    {
      title: "Shop",
      links: [
        { href: "/products", label: "All parts" },
        { href: "/parts", label: "Every part type" },
        { href: "/cars", label: "Every car maker" },
        { href: "/fit-guide", label: "Find the right part" },
        { href: "/#order", label: "How to order" },
        { href: "/#questions", label: "Questions" },
        { href: "/#visit", label: "Address and map" },
        { href: "/#reach", label: "How to reach us" },
      ],
    },
  ].filter((c) => c.links.length);

  return (
    <footer className="bg-graphite pt-14 pb-24 text-on-graphite md:pb-12">
      <div className="shell">
        <div className="grid gap-10 [&>*]:min-w-0 md:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <Brand onDark />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-on-graphite-2">
              {SHOP.address.line1}, {SHOP.address.line2}
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-on-graphite-2">
              {SHOP.hours.map((h) => `${h.days} ${h.time}`).join(" · ")}
            </p>
            <div className="mt-4 flex flex-col gap-1 text-[15px]">
              {SHOP.phones.map((p) => (
                <a key={p.tel} href={telLink(p.tel)} className="text-on-graphite hover:text-brass tabular">
                  {p.display} <span className="text-on-graphite-2">· {p.label}</span>
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-[14px] font-semibold text-on-graphite">{c.title}</p>
              <ul className="mt-3.5 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[15px] text-on-graphite-2 hover:text-on-graphite">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-graphite-line pt-6 text-[13.5px] text-on-graphite-2 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {SHOP.name}, Kolkata. Prices on request; stock changes every day.</p>
          <p>Car makers’ names and badges belong to their owners and only show which cars a part fits.</p>
        </div>
      </div>
    </footer>
  );
}
