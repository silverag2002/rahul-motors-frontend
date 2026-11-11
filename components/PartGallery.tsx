"use client";

import { useState } from "react";
import PartPhoto from "./PartPhoto";
import { photoSrc, type Photo } from "@/lib/types";

/** Big photo with small ones underneath to switch between. */
export default function PartGallery({ photos, alt }: { photos: Photo[]; alt: string }) {
  const [i, setI] = useState(0);
  const current = photos[i] ?? null;
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] border border-line bg-sunken">
        {current ? (
          <a href={current.full} target="_blank" rel="noopener" aria-label="Open the full-size photo" className="block h-full w-full">
            <PartPhoto photo={current} alt={alt} sizes="(max-width: 1024px) 100vw, 620px" width={1000} priority className="object-contain" />
          </a>
        ) : (
          <PartPhoto photo={null} alt={alt} sizes="100vw" />
        )}
      </div>
      {photos.length > 1 && (
        <div className="mt-3 flex gap-2.5">
          {photos.map((p, n) => (
            <button
              key={p.full}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Photo ${n + 1}`}
              aria-pressed={n === i}
              className={`press h-20 w-20 overflow-hidden rounded-[12px] border-2 bg-sunken ${n === i ? "border-brass" : "border-transparent opacity-75 hover:opacity-100"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoSrc(p, 120)} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
