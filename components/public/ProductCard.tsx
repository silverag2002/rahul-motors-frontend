"use client";

import { ArrowUpRight, MessageCircle, Package, Phone } from "lucide-react";
import { PublicProduct, publicApi } from "@/lib/publicApi";
import { CONTACT, buildInquiryMessage, whatsappLink, telLink } from "@/lib/contact";
import { useState } from "react";

export default function ProductCard({ product }: { product: PublicProduct }) {
  const img = publicApi.imageUrl(product);
  const srcSet = publicApi.imageSrcSet(product);
  const [imgLoaded, setImgLoaded] = useState(false);
  const msg = buildInquiryMessage({ name: product.name, brand: product.brand, partNo: product.part_no, carName: product.car_name });

  return (
    <article className="product-card group flex flex-col min-w-0 border-t-2 pt-2" style={{ borderColor: "var(--ink)" }}>
      <div className="relative aspect-[4/3] overflow-hidden border" style={{ background: "var(--bg-muted)", borderColor: "var(--line)" }}>
        {img ? (
          <>
            {!imgLoaded && <div className="absolute inset-0 shimmer" />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              srcSet={srcSet || undefined}
              sizes="(max-width: 767px) 48vw, (max-width: 1279px) 31vw, 300px"
              alt={product.name}
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
        {product.brand && (
          <span className="absolute top-0 left-0 max-w-[calc(100%-1rem)] truncate px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[.12em]" style={{ background: "var(--ink)", color: "var(--bg)" }}>
            {product.brand}
          </span>
        )}
      </div>

      <div className="pt-4 flex flex-1 flex-col border-t mt-3" style={{ borderColor: "var(--line)" }}>
        <h3 className="text-sm md:text-base font-bold uppercase tracking-[.02em] leading-snug line-clamp-2 min-h-[2.55rem] md:min-h-[2.8rem]" style={{ color: "var(--ink)" }} title={product.name}>
          {product.name}
        </h3>
        <div className="mt-2 min-h-9 text-[10px] md:text-xs leading-5" style={{ color: "var(--ink-soft)" }}>
          {product.part_no && <div className="truncate tabular-nums">Part no. {product.part_no}</div>}
          {product.car_name && <div className="truncate">Fits {product.car_name}</div>}
        </div>

        <div className="mt-4 pt-3 border-t flex items-center justify-between gap-2" style={{ borderColor: "var(--line)" }}>
          <a
            href={whatsappLink(msg)}
            target="_blank"
            rel="noopener"
            aria-label={`Inquire about ${product.name} via WhatsApp`}
            className="group/action min-w-0 inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-[.08em] hover:text-[var(--accent)] transition-colors"
            style={{ color: "var(--ink)" }}
          >
            <MessageCircle className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
            <span className="truncate">Ask for price</span>
            <ArrowUpRight className="product-arrow hidden sm:block h-3.5 w-3.5 shrink-0 transition-transform" />
          </a>
          <a href={telLink(CONTACT.phones[0].tel)} aria-label={`Call about ${product.name}`} className="h-8 w-8 shrink-0 grid place-items-center border hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors" style={{ borderColor: "var(--line-strong)", color: "var(--ink-2)" }}>
            <Phone className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
