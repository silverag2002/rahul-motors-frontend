"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight, MessageCircle, Phone, Search } from "lucide-react";
import { CONTACT, telLink, whatsappLink, buildInquiryMessage } from "@/lib/contact";

const trustPoints = ["Genuine sourcing", "All-India dispatch", "Expert matching", "Serving since 1995"];

export default function Hero() {
  function focusSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = new FormData(e.currentTarget).get("q")?.toString().trim() ?? "";
    const search = document.querySelector("#catalogue-search") as HTMLInputElement | null;
    if (!search) return;
    window.dispatchEvent(new CustomEvent("rm:set-search", { detail: query }));
    search.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => search.focus({ preventScroll: true }), 450);
  }

  return (
    <section className="pt-[72px] pb-0">
      <div className="shell">
        <div className="hero-surface">
          <div className="grid grid-cols-2 md:grid-cols-3 border-y border-[var(--rule)] text-[9px] md:text-[10px] font-semibold uppercase tracking-[.18em]">
            <span className="px-4 md:px-6 py-3">RM / Parts desk</span>
            <span className="hidden md:block px-6 py-3 text-center border-x border-[var(--rule)]">Kolkata · India</span>
            <span className="px-4 md:px-6 py-3 text-right text-[var(--accent)]">Counter open</span>
          </div>

          <div className="grid lg:grid-cols-12">
            <div className="relative lg:col-span-7 px-5 sm:px-8 md:px-12 py-14 md:py-20 lg:py-24 overflow-hidden">
              <span aria-hidden="true" className="absolute -right-6 bottom-5 font-editorial text-[15rem] leading-none text-[var(--ink)] opacity-[.035]">RM</span>
              <h1 className="hero-reveal relative font-editorial text-[4.4rem] sm:text-[5.4rem] md:text-8xl lg:text-8xl leading-[.74] tracking-[-.035em]">
                Genuine
                <span className="block">auto parts.</span>
                <span className="block text-[var(--accent)]">Delivered fast.</span>
              </h1>

              <div className="hero-reveal hero-reveal-2 relative mt-10 md:mt-14 grid sm:grid-cols-[1fr_auto] gap-7 items-end max-w-3xl border-t border-[var(--rule)] pt-6">
                <p className="max-w-[54ch] text-sm md:text-base leading-7 text-[var(--ink-soft)]">
                  Sensors, switches, pumps, filters and the hard-to-find components that keep India moving—matched by people who know the part.
                </p>
                <a href="#catalogue" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em]">
                  Open catalogue <ArrowDown className="h-4 w-4 text-[var(--accent)] transition-transform group-hover:translate-y-1" />
                </a>
              </div>
            </div>

            <div className="on-accent relative lg:col-span-5 flex flex-col border-t lg:border-t-0 lg:border-l border-[var(--rule)]">
              <div className="inventory-stripes h-8 border-b border-[var(--rule)]" />
              <div className="relative px-5 sm:px-8 md:px-10 py-10 md:py-14 flex-1 overflow-hidden">
                <div className="absolute -right-16 -top-14 h-64 w-64 rounded-full border border-[var(--ink)]/20" />
                <div className="absolute right-4 top-5 opacity-20">
                  <Image src="/logo.webp" alt="" width={170} height={166} className="hero-mark" priority sizes="170px" />
                </div>
                <h2 className="relative font-editorial text-5xl md:text-6xl leading-[.85] max-w-xs">Name the part. We’ll match it.</h2>
                <p className="relative mt-5 max-w-sm text-sm leading-6 text-[var(--ink)]/70">Search the live inventory or send the vehicle model on WhatsApp.</p>

                <form onSubmit={focusSearch} className="hero-reveal hero-reveal-3 hero-search relative mt-9 p-2">
                  <label htmlFor="hero-search" className="block px-3 pt-2 text-[9px] uppercase tracking-[.16em] text-white/50">Part / brand / vehicle</label>
                  <div className="flex items-center">
                    <Search className="ml-3 h-4 w-4 shrink-0 text-white/45" />
                    <input id="hero-search" name="q" type="search" autoComplete="off" spellCheck={false} placeholder="ABS sensor, oil filter…" className="search-input min-w-0 flex-1 h-12 px-3 bg-transparent text-base outline-none placeholder:text-white/40" />
                    <button type="submit" aria-label="Find a part" className="h-11 w-11 grid place-items-center bg-[#f8f6ef] text-[#11120f] hover:bg-[var(--gold)] transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>

                <div className="relative mt-8 grid grid-cols-2 border-t border-[var(--ink)]/35 text-xs font-semibold">
                  <a href={whatsappLink(buildInquiryMessage({ name: "General inquiry" }))} target="_blank" rel="noopener" className="py-4 pr-3 inline-flex items-center gap-2 hover:bg-black/5"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
                  <a href={telLink(CONTACT.phones[0].tel)} className="py-4 pl-3 border-l border-[var(--ink)]/35 inline-flex items-center gap-2 hover:bg-black/5"><Phone className="h-4 w-4" /> Call counter</a>
                </div>
              </div>
            </div>
          </div>

          <div className="inverse-surface grid grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((item, index) => (
              <div key={item} className={`px-4 md:px-7 py-4 flex items-center gap-3 text-[9px] md:text-[10px] font-semibold uppercase tracking-[.14em] ${index % 2 ? "border-l" : ""} lg:border-l first:lg:border-l-0 border-white/15`}>
                <span className="h-1.5 w-1.5 bg-[var(--accent)]" aria-hidden="true" />{item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
