"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Search, MessageCircle } from "lucide-react";
import ThemeToggle from "@/components/public/ThemeToggle";
import { CONTACT, telLink, whatsappLink, buildInquiryMessage } from "@/lib/contact";

const links = [
  { href: "#catalogue", label: "Shop" },
  { href: "#categories", label: "Categories" },
  { href: "#brands", label: "Brands" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-200"
      style={{
        backgroundColor: scrolled ? "var(--bg-elev)" : "var(--bg)",
        borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span
            className="h-9 w-9 rounded-lg flex items-center justify-center overflow-hidden"
            style={{ background: "var(--bg-muted)" }}
          >
            <Image src="/logo.png" alt="Rahul Motors" width={28} height={28} className="object-contain" priority />
          </span>
          <div className="leading-tight">
            <div className="text-base font-semibold" style={{ color: "var(--ink)" }}>
              Rahul Motors
            </div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--ink-faint)" }}>
              Auto Parts Store
            </div>
          </div>
        </Link>

        <button
          onClick={() => {
            const el = document.querySelector("#catalogue-search") as HTMLInputElement | null;
            el?.focus();
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
          className="hidden md:flex flex-1 max-w-xl items-center gap-2 h-10 px-4 rounded-lg text-sm"
          style={{
            background: "var(--bg-muted)",
            color: "var(--ink-soft)",
            border: "1px solid var(--line)",
          }}
        >
          <Search className="h-4 w-4" />
          <span>Search parts, brands, models…</span>
        </button>

        <nav className="hidden lg:flex items-center gap-1 ml-auto">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-[var(--bg-muted)]"
              style={{ color: "var(--ink-2)" }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-auto lg:ml-2">
          <a
            href={whatsappLink(buildInquiryMessage({ name: "General inquiry" }))}
            target="_blank"
            rel="noopener"
            className="hidden md:inline-flex items-center gap-2 px-4 h-10 rounded-lg text-sm font-medium transition-colors"
            style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
          >
            <MessageCircle className="h-4 w-4" />
            Inquire
          </a>
          <ThemeToggle />
          <button
            className="lg:hidden h-10 w-10 rounded-lg flex items-center justify-center"
            style={{ border: "1px solid var(--line-strong)" }}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className="lg:hidden overflow-hidden transition-[max-height] duration-300"
        style={{
          maxHeight: open ? "480px" : "0px",
          borderTop: open ? "1px solid var(--line)" : "1px solid transparent",
          background: "var(--bg-elev)",
        }}
      >
        <nav className="px-4 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-md text-sm font-medium"
              style={{ color: "var(--ink-2)" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={telLink(CONTACT.phones[0].tel)}
            className="mt-2 inline-flex items-center justify-center gap-2 px-4 h-11 rounded-lg text-sm font-semibold"
            style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
          >
            <Phone className="h-4 w-4" /> {CONTACT.phones[0].number}
          </a>
        </nav>
      </div>
    </header>
  );
}
