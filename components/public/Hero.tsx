"use client";

import Image from "next/image";
import { Search, Phone, MessageCircle, ShieldCheck, Truck, Headphones, Award } from "lucide-react";
import { CONTACT, telLink, whatsappLink, buildInquiryMessage } from "@/lib/contact";

const trustBadges = [
  { icon: ShieldCheck, label: "100% Genuine" },
  { icon: Truck, label: "Pan-India Dispatch" },
  { icon: Headphones, label: "Expert Support" },
  { icon: Award, label: "30+ Years Trusted" },
];

export default function Hero() {
  function focusSearch(e: React.FormEvent) {
    e.preventDefault();
    const input = e.currentTarget as HTMLFormElement;
    const data = new FormData(input);
    const q = (data.get("q") as string)?.trim();
    const search = document.querySelector("#catalogue-search") as HTMLInputElement | null;
    if (search) {
      search.value = q || "";
      search.dispatchEvent(new Event("input", { bubbles: true }));
      search.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <section className="relative pt-24 md:pt-28 pb-10 md:pb-14">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div
          className="relative overflow-hidden rounded-2xl px-6 py-12 md:px-12 md:py-16 lg:py-20"
          style={{
            background: "linear-gradient(135deg, var(--accent-soft) 0%, var(--bg-muted) 100%)",
            border: "1px solid var(--line)",
          }}
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-5"
                style={{
                  background: "var(--bg-elev)",
                  color: "var(--accent)",
                  border: "1px solid var(--line)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                Trusted since 1995 · 1,400+ parts in stock
              </div>

              <h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]"
                style={{ color: "var(--ink)" }}
              >
                Genuine auto parts,
                <br />
                <span style={{ color: "var(--accent)" }}>delivered fast.</span>
              </h1>

              <p
                className="mt-4 md:mt-5 text-base md:text-lg max-w-xl"
                style={{ color: "var(--ink-soft)" }}
              >
                Sensors, switches, pumps, filters and more — sourced direct from OEM channels.
                Browse the catalogue and inquire in one tap.
              </p>

              <form
                onSubmit={focusSearch}
                className="mt-7 flex flex-col sm:flex-row gap-2 max-w-xl"
              >
                <div
                  className="flex-1 flex items-center gap-2 h-12 px-4 rounded-lg"
                  style={{ background: "var(--bg-elev)", border: "1px solid var(--line-strong)" }}
                >
                  <Search className="h-4 w-4 shrink-0" style={{ color: "var(--ink-soft)" }} />
                  <input
                    name="q"
                    type="text"
                    placeholder="Search for ABS sensor, brake pads, oil filter…"
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{ color: "var(--ink)" }}
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 px-6 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: "var(--ink)", color: "var(--bg)" }}
                >
                  Search
                </button>
              </form>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                <span style={{ color: "var(--ink-soft)" }}>Or inquire directly:</span>
                <a
                  href={whatsappLink(buildInquiryMessage({ name: "General inquiry" }))}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 font-medium"
                  style={{ color: "var(--whatsapp)" }}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <span style={{ color: "var(--line-strong)" }}>·</span>
                <a
                  href={telLink(CONTACT.phones[0].tel)}
                  className="inline-flex items-center gap-1.5 font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  <Phone className="h-4 w-4" />
                  {CONTACT.phones[0].number}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:flex justify-center">
              <div
                className="relative aspect-square w-full max-w-sm rounded-2xl flex items-center justify-center overflow-hidden"
                style={{
                  background: "var(--bg-elev)",
                  border: "1px solid var(--line-strong)",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background:
                      "radial-gradient(70% 50% at 50% 40%, var(--accent-soft) 0%, transparent 70%)",
                  }}
                />
                <Image
                  src="/logo.png"
                  alt="Rahul Motors"
                  width={240}
                  height={160}
                  className="relative"
                  priority
                />
                <div
                  className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs"
                  style={{ color: "var(--ink-soft)" }}
                >
                  <span className="font-medium">Est. 1995</span>
                  <span>Genuine OEM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {trustBadges.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: "var(--bg-elev)", border: "1px solid var(--line)" }}
            >
              <div
                className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
              >
                <b.icon className="h-4 w-4" />
              </div>
              <div className="text-sm font-medium" style={{ color: "var(--ink-2)" }}>
                {b.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
