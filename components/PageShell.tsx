import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import WhatsAppFloat from "./WhatsAppFloat";
import type { Catalog } from "@/lib/types";

export default function PageShell({ catalog, children, whatsapp }: { catalog: Catalog; children: React.ReactNode; whatsapp?: string }) {
  return (
    <>
      <a href="#main" className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:rounded-[8px] focus-visible:bg-ink focus-visible:px-3 focus-visible:py-2 focus-visible:text-paper">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter types={catalog.types} makers={catalog.makers} />
      <WhatsAppFloat message={whatsapp} />
    </>
  );
}
