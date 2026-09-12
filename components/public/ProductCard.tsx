"use client";

import { ArrowUpRight, MessageCircle, Package, Phone } from "lucide-react";
import { PublicProduct, publicApi } from "@/lib/publicApi";
import { CONTACT, buildInquiryMessage, whatsappLink, telLink } from "@/lib/contact";
import { useState } from "react";

const clean = (value?: string | null) => (value || "").replace(/\s+/g, " ").trim();
const meaningful = (value?: string | null) => (/[a-z0-9]/i.test(clean(value)) ? clean(value) : "");

export default function ProductCard({ product }: { product: PublicProduct }) {
  const img = publicApi.imageUrl(product);
  const srcSet = publicApi.imageSrcSet(product);
  const [imgLoaded, setImgLoaded] = useState(false);

  const name = clean(product.name);
  const brand = meaningful(product.brand);
  const partNo = meaningful(product.part_no);
  const carName = meaningful(product.car_name);
  const category = product.categories?.map((c) => meaningful(c.name)).find(Boolean) || "";
  const title = category ? `${category} — ${name}` : name;
  const msg = buildInquiryMessage({ name: title, brand, partNo, carName });

  return (
    <article className="product-card group flex flex-col min-w-0 border-t-2 pt-2" style={{ borderColor: "var(--rule)" }}>
      <div className="relative aspect-[4/3] overflow-hidden border" style={{ background: "var(--bg-muted)", borderColor: "var(--line)" }}>
        {img ? (
          <>
            {!imgLoaded && <div className="absolute inset-0 shimmer" />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              srcSet={srcSet || undefined}
              sizes="(max-width: 767px) 48vw, (max-width: 1279px) 31vw, 300px"
              alt={title}
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              className={`product-image absolute inset-0 h-full w-full object-cover ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            />
          </>
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <Package className="h-8 w-8" style={{ color: "var(--ink-faint)" }} />
          </div>
        )}
        {brand && (
          <span className="absolute top-0 left-0 max-w-[calc(100%-1rem)] truncate px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[.12em]" style={{ background: "var(--inverse-bg)", color: "var(--inverse-ink)" }}>
            {brand}
          </span>
        )}
      </div>

      <div className="pt-3.5 flex flex-1 flex-col">
        <p className="truncate text-[9px] md:text-[10px] font-bold uppercase tracking-[.14em]" style={{ color: "var(--accent)" }} title={category || undefined}>
          {category || "Auto part"}
        </p>
        <h3 className="mt-1.5 text-sm md:text-base font-bold uppercase tracking-[.02em] leading-snug line-clamp-2 min-h-[2.5rem] md:min-h-[2.75rem]" style={{ color: "var(--ink)" }} title={name}>
          {name}
        </h3>

        <dl className="mt-3 border-t text-[10px] md:text-xs" style={{ borderColor: "var(--line)" }}>
          <SpecRow label="Part no." value={partNo} fallback="On request" mono />
          <SpecRow label="Fits" value={carName || (brand ? `${brand} ${name}` : "")} fallback="Confirm on WhatsApp" />
        </dl>

        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <a
            href={whatsappLink(msg)}
            target="_blank"
            rel="noopener"
            aria-label={`Ask for the price of ${title} on WhatsApp`}
            className="group/action min-w-0 flex-1 h-9 inline-flex items-center justify-center gap-1.5 px-2 text-[10px] md:text-xs font-bold uppercase tracking-[.08em] border transition-colors hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-[#11120f]"
            style={{ color: "var(--ink)", borderColor: "var(--line-strong)" }}
          >
            <MessageCircle className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Ask for price</span>
            <ArrowUpRight className="product-arrow hidden sm:block h-3.5 w-3.5 shrink-0 transition-transform" />
          </a>
          <a href={telLink(CONTACT.phones[0].tel)} aria-label={`Call about ${title}`} className="h-9 w-9 shrink-0 grid place-items-center border hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors" style={{ borderColor: "var(--line-strong)", color: "var(--ink-2)" }}>
            <Phone className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

function SpecRow({ label, value, fallback = "—", mono = false }: { label: string; value: string; fallback?: string; mono?: boolean }) {
  return (
    <div className="grid grid-cols-[56px_minmax(0,1fr)] md:grid-cols-[64px_minmax(0,1fr)] gap-2 py-1.5 border-b" style={{ borderColor: "var(--line)" }}>
      <dt className="uppercase tracking-[.08em]" style={{ color: "var(--ink-faint)" }}>{label}</dt>
      <dd className={`truncate font-semibold ${mono ? "tabular-nums" : ""}`} style={{ color: value ? "var(--ink-2)" : "var(--ink-faint)" }} title={value || undefined}>
        {value || fallback}
      </dd>
    </div>
  );
}
