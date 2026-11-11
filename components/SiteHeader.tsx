"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, Search, X } from "lucide-react";
import Brand from "./Brand";
import ThemeToggle from "./ThemeToggle";
import WhatsAppIcon from "./WhatsAppIcon";
import { SHOP, askMessage, telLink, whatsappLink } from "@/lib/shop";

const LINKS = [
  { href: "/products", label: "All parts" },
  { href: "/parts", label: "Part types" },
  { href: "/cars", label: "Car makers" },
  { href: "/#order", label: "How to order" },
  { href: "/#visit", label: "Visit" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 4);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const [menuPath, setMenuPath] = useState(path);
  if (menuPath !== path) {
    setMenuPath(path);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-paper/92 backdrop-blur-md transition-colors ${scrolled ? "border-line" : "border-transparent"}`}
    >
      <div className="shell flex h-[68px] items-center gap-3">
        <Brand />

        <nav className="ml-6 hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {LINKS.map((l) => {
            const active = l.href === path;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-[9px] px-3 py-2 text-[15px] font-medium transition-colors ${active ? "text-ink" : "text-ink-3 hover:text-ink"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/products"
            aria-label="Search parts"
            className="press grid h-10 w-10 place-items-center rounded-[10px] border border-line text-ink-2 hover:border-line-strong hover:text-ink md:hidden"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <a
            href={telLink(SHOP.phones[0].tel)}
            className="press hidden h-10 items-center gap-2 rounded-[10px] border border-line px-3.5 text-[14px] font-semibold text-ink-2 hover:border-line-strong hover:text-ink md:inline-flex"
          >
            <Phone className="h-4 w-4" /> {SHOP.phones[0].display}
          </a>
          <a
            href={whatsappLink(askMessage())}
            target="_blank"
            rel="noopener"
            className="press hidden h-10 items-center gap-2 rounded-[10px] bg-whatsapp px-4 text-[14px] font-semibold text-whatsapp-ink sm:inline-flex"
          >
            <WhatsAppIcon /> Ask on WhatsApp
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="press grid h-10 w-10 place-items-center rounded-[10px] border border-line text-ink-2 lg:hidden"
          >
            {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-[68px] bottom-0 z-40 overflow-y-auto border-t border-line bg-paper lg:hidden">
          <nav className="shell flex flex-col py-3" aria-label="Menu">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-line py-4 font-display text-[22px] font-semibold tracking-[-0.01em] text-ink">
                {l.label}
              </Link>
            ))}
            <div className="mt-6 grid gap-2.5">
              <a href={whatsappLink(askMessage())} target="_blank" rel="noopener" className="press inline-flex h-12 items-center justify-center gap-2 rounded-[12px] bg-whatsapp text-[15px] font-semibold text-whatsapp-ink">
                <WhatsAppIcon className="h-5 w-5" /> Ask on WhatsApp
              </a>
              {SHOP.phones.map((p) => (
                <a key={p.tel} href={telLink(p.tel)} className="press inline-flex h-12 items-center justify-center gap-2 rounded-[12px] border border-line-strong text-[15px] font-semibold text-ink">
                  <Phone className="h-4 w-4" /> {p.label}: {p.display}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
