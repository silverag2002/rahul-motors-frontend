import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  href?: string;
  label: string;
}

/** Breadcrumbs, title and a line of text at the top of inner pages. */
export default function PageHead({ crumbs, title, lead, children }: { crumbs: Crumb[]; title: string; lead?: React.ReactNode; children?: React.ReactNode }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: c.href ? `https://rahulmotors.in${c.href}` : undefined })),
  };
  return (
    <div className="border-b border-line bg-raised">
      <div className="shell py-8 md:py-12">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-[14px] text-ink-3">
          {crumbs.map((c, i) => (
            <span key={i} className="inline-flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-ink-4" />}
              {c.href ? (
                <Link href={c.href} className="hover:text-ink">
                  {c.label}
                </Link>
              ) : (
                <span className="text-ink-2" aria-current="page">
                  {c.label}
                </span>
              )}
            </span>
          ))}
        </nav>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1 className="display text-[36px] text-ink md:text-[52px]">{title}</h1>
            {lead && <div className="mt-3 text-[17px] leading-relaxed text-ink-3">{lead}</div>}
          </div>
          {children}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}
