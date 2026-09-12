"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X, Phone, Search } from "lucide-react";
import ThemeToggle from "@/components/public/ThemeToggle";
import { CONTACT, telLink, whatsappLink, buildInquiryMessage } from "@/lib/contact";

const links = [
  { href: "#catalogue", label: "Catalogue" },
  { href: "#categories", label: "Categories" },
  { href: "#brands", label: "Brands" },
  { href: "#about", label: "Our story" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  function openSearch() {
    const el = document.querySelector("#catalogue-search") as HTMLInputElement | null;
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => el?.focus({ preventScroll: true }), 450);
  }

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,box-shadow] duration-300"
      style={{
        backgroundColor: scrolled || open ? "var(--bg-elev)" : "var(--bg)",
        borderBottom: `1px solid ${scrolled || open ? "var(--line)" : "transparent"}`,
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
      }}
    >
      <div className="shell h-[72px] flex items-center gap-5 border-x" style={{ borderColor: "var(--line)" }}>
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Rahul Motors home">
          <span className="h-[72px] w-[58px] grid place-items-center overflow-hidden border-r" style={{ background: "var(--inverse-bg)", borderColor: "var(--line)" }}>
            <Image src="/logo.webp" alt="" width={29} height={28} priority sizes="29px" />
          </span>
          <span className="leading-none">
            <span className="font-editorial block text-2xl tracking-[.02em]" style={{ color: "var(--ink)" }}>Rahul Motors</span>
            <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[.2em]" style={{ color: "var(--accent)" }}>Genuine automotive parts</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-0 ml-auto" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-[.1em] transition-colors hover:text-[var(--accent)]" style={{ color: "var(--ink-2)" }}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto xl:ml-3 flex items-center gap-2">
          <button onClick={openSearch} className="hidden md:inline-flex h-10 items-center gap-2 px-3 text-[10px] font-bold uppercase tracking-[.1em] border-b transition-colors hover:text-[var(--accent)]" style={{ color: "var(--ink-2)", borderColor: "var(--line-strong)" }} aria-label="Jump to product search">
            <Search className="h-4 w-4" /> Part lookup
          </button>
          <a
            href={whatsappLink(buildInquiryMessage({ name: "General inquiry" }))}
            target="_blank"
            rel="noopener"
            className="hidden sm:inline-flex h-10 items-center gap-2 px-4 text-[10px] font-bold uppercase tracking-[.12em] transition-colors hover:bg-[#11120f] hover:text-[#f8f6ef]"
            style={{ background: "var(--accent)", color: "#11120f" }}
          >
            Inquire <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <ThemeToggle />
          <button
            className="xl:hidden h-10 w-10 flex items-center justify-center border"
            style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-navigation" className="xl:hidden animate-fade-in" style={{ background: "var(--bg-elev)" }}>
          <nav className="shell py-4 border-t" style={{ borderColor: "var(--line)" }} aria-label="Mobile navigation">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="group flex items-center justify-between py-3.5 border-b text-base font-semibold" style={{ color: "var(--ink)", borderColor: "var(--line)" }}>
                {link.label}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            ))}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <a href={telLink(CONTACT.phones[0].tel)} className="h-11 inline-flex items-center justify-center gap-2 text-xs font-bold border" style={{ borderColor: "var(--line-strong)", color: "var(--ink)" }}><Phone className="h-4 w-4" /> Call us</a>
              <button onClick={() => { setOpen(false); openSearch(); }} className="h-11 inline-flex items-center justify-center gap-2 text-xs font-bold" style={{ background: "var(--ink)", color: "var(--bg)" }}><Search className="h-4 w-4" /> Find a part</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
