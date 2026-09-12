"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight, MessageCircle, Phone, Search } from "lucide-react";
import { CONTACT, telLink, whatsappLink, buildInquiryMessage } from "@/lib/contact";

const trustPoints = ["100% genuine", "Pan-India dispatch", "Expert part matching", "30+ years trusted"];

export default function Hero() {
  function focusSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim() ?? "";
    const search = document.querySelector("#catalogue-search") as HTMLInputElement | null;
    if (!search) return;
    window.dispatchEvent(new CustomEvent("rm:set-search", { detail: q }));
    search.scrollIntoView({ behavior: "smooth", block: "center" });
    search.focus({ preventScroll: true });
  }

  return (
    <section className="pt-20 md:pt-24 pb-8 md:pb-12">
      <div className="shell">
        <div className="hero-surface rounded-[1.5rem] md:rounded-[2rem]">
          <div className="flex items-center justify-between px-5 md:px-10 py-4 border-b border-white/10 text-[10px] md:text-xs uppercase tracking-[0.16em] text-white/60">
            <span>Established 1995</span>
            <span className="hidden sm:inline">Kolkata · Serving all India</span>
            <span className="text-[#e2bf72]">Genuine parts only</span>
          </div>

          <div className="grid lg:grid-cols-12 min-h-[560px] md:min-h-[620px]">
            <div className="lg:col-span-8 px-5 py-12 sm:px-8 md:px-10 md:py-16 lg:py-20 flex flex-col justify-center">
              <h1 className="hero-reveal font-editorial text-[3.65rem] sm:text-7xl md:text-[5.65rem] lg:text-[6.5rem] leading-[0.82] tracking-[-0.035em] max-w-[900px] text-balance">
                Genuine auto parts,
                <span className="block text-[#e2bf72] italic">delivered fast.</span>
              </h1>

              <div className="hero-reveal hero-reveal-2 mt-9 md:mt-12 grid md:grid-cols-[1fr_auto] gap-6 md:items-end max-w-4xl">
                <p className="max-w-[55ch] text-sm md:text-base leading-7 text-white/65">
                  Sensors, switches, pumps, filters and more—sourced direct from OEM channels and matched by people who know the part.
                </p>
                <a href="#catalogue" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#e2bf72] underline underline-offset-8 decoration-white/20 hover:decoration-[#e2bf72] transition-colors">
                  Browse catalogue
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
                </a>
              </div>

              <form onSubmit={focusSearch} className="hero-reveal hero-reveal-3 hero-search mt-8 md:mt-10 flex items-center p-1.5 max-w-3xl rounded-xl text-[#171816]">
                <Search className="ml-3 h-4 w-4 shrink-0 text-[#77786f]" />
                <input
                  name="q"
                  type="search"
                  aria-label="Search parts, brands, and models"
                  placeholder="Search ABS sensor, brake pads, oil filter…"
                  className="min-w-0 flex-1 h-12 px-3 bg-transparent text-sm outline-none placeholder:text-[#77786f]"
                />
                <button type="submit" aria-label="Find a part" className="h-12 px-4 md:px-6 rounded-lg bg-[#d96522] text-white text-sm font-semibold inline-flex items-center gap-2 hover:bg-[#bf541c] transition-colors">
                  <span className="hidden sm:inline">Find a part</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="hero-reveal hero-reveal-3 mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs md:text-sm text-white/60">
                <span>Need help matching a part?</span>
                <a
                  href={whatsappLink(buildInquiryMessage({ name: "General inquiry" }))}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 font-semibold text-[#68dc95] hover:text-[#8de9ae] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a href={telLink(CONTACT.phones[0].tel)} className="inline-flex items-center gap-2 font-semibold text-white hover:text-[#e2bf72] transition-colors">
                  <Phone className="h-4 w-4" /> {CONTACT.phones[0].number}
                </a>
              </div>
            </div>

            <div className="hidden lg:flex lg:col-span-4 relative items-center justify-center border-l border-white/10">
              <div className="absolute h-[310px] w-[310px] rounded-full border border-[#d7b466]/30" />
              <div className="absolute h-[238px] w-[238px] rounded-full border border-white/10" />
              <div className="relative h-48 w-48 rounded-full bg-[#f7f2e8] flex items-center justify-center shadow-[0_30px_60px_-24px_rgba(0,0,0,.8)]">
                <Image
                  src="/logo.webp"
                  alt="Rahul Motors emblem"
                  width={142}
                  height={139}
                  className="hero-mark"
                  priority
                  sizes="142px"
                />
              </div>
              <div className="absolute bottom-10 left-8 right-8 flex justify-between text-[10px] uppercase tracking-[.16em] text-white/45">
                <span>RM / 1995</span>
                <span>OEM supply</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
            {trustPoints.map((item, index) => (
              <div key={item} className={`px-5 md:px-8 py-4 text-[10px] sm:text-xs uppercase tracking-[.12em] text-white/70 ${index % 2 ? "border-l" : ""} lg:border-l first:lg:border-l-0 border-white/10`}>
                <span className="mr-2 inline-block h-1.5 w-1.5 rotate-45 bg-[#e2bf72]" aria-hidden="true" />{item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
