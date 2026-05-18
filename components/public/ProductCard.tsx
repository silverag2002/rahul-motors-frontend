"use client";

import { Phone, MessageCircle, Package } from "lucide-react";
import { PublicProduct, publicApi } from "@/lib/publicApi";
import {
  CONTACT,
  buildInquiryMessage,
  whatsappLink,
  telLink,
} from "@/lib/contact";
import { useState } from "react";

interface Props {
  product: PublicProduct;
}

export default function ProductCard({ product }: Props) {
  const img = publicApi.imageUrl(product);
  const [imgLoaded, setImgLoaded] = useState(false);

  const msg = buildInquiryMessage({
    name: product.name,
    brand: product.brand,
    partNo: product.part_no,
    carName: product.car_name,
  });

  return (
    <article
      className="group relative flex flex-col rounded-xl overflow-hidden transition-shadow hover:shadow-md"
      style={{
        background: "var(--bg-elev)",
        border: "1px solid var(--line)",
      }}
    >
      <div
        className="relative aspect-square overflow-hidden"
        style={{ background: "var(--bg-muted)" }}
      >
        {img ? (
          <>
            {!imgLoaded && <div className="absolute inset-0 shimmer" />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt={product.name}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="h-8 w-8" style={{ color: "var(--ink-faint)" }} />
          </div>
        )}

        {product.brand && (
          <div
            className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold uppercase"
            style={{
              background: "var(--bg-elev)",
              color: "var(--ink-2)",
              border: "1px solid var(--line)",
            }}
          >
            {product.brand}
          </div>
        )}
      </div>

      <div className="p-3 flex-1 flex flex-col">
        <h3
          className="text-sm font-medium leading-snug line-clamp-2 min-h-[2.5rem]"
          style={{ color: "var(--ink)" }}
          title={product.name}
        >
          {product.name}
        </h3>

        {product.part_no && (
          <div className="mt-1 text-[11px] font-mono" style={{ color: "var(--ink-soft)" }}>
            #{product.part_no}
          </div>
        )}

        {product.car_name && (
          <div className="mt-0.5 text-[11px] line-clamp-1" style={{ color: "var(--ink-soft)" }}>
            For {product.car_name}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>
            Price on request
          </span>
        </div>

        <div className="mt-2.5 flex gap-1.5">
          <a
            href={whatsappLink(msg)}
            target="_blank"
            rel="noopener"
            aria-label="Inquire via WhatsApp"
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 rounded-lg text-xs font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Inquire
          </a>
          <a
            href={telLink(CONTACT.phones[0].tel)}
            aria-label="Call now"
            className="h-9 w-9 inline-flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--bg-muted)]"
            style={{ border: "1px solid var(--line-strong)", color: "var(--ink-2)" }}
          >
            <Phone className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
