import { Package } from "lucide-react";
import { photoSrc, photoSrcSet, type Photo } from "@/lib/types";

/**
 * A part's photo on a soft placeholder. The image is never hidden while it
 * loads (the old site hid photos until a load event that sometimes never came,
 * which left grey boxes), so it simply paints over the placeholder.
 */
export default function PartPhoto({
  photo,
  alt,
  sizes,
  width = 400,
  priority = false,
  className = "",
}: {
  photo: Photo | null;
  alt: string;
  sizes: string;
  width?: number;
  priority?: boolean;
  className?: string;
}) {
  if (!photo) {
    return (
      <div className={`grid h-full w-full place-items-center bg-sunken text-ink-4 ${className}`}>
        <div className="flex flex-col items-center gap-1.5 text-[12px]">
          <Package className="h-7 w-7" strokeWidth={1.5} />
          Photo on request
        </div>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photoSrc(photo, width)}
      srcSet={photoSrcSet(photo)}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`h-full w-full bg-sunken object-cover ${className}`}
    />
  );
}
