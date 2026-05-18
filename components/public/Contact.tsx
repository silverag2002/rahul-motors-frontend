"use client";

import { Phone, Mail, MessageCircle, MapPin, ExternalLink, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import {
  CONTACT,
  telLink,
  whatsappLink,
  mailtoLink,
  buildInquiryMessage,
} from "@/lib/contact";
import { publicApi } from "@/lib/publicApi";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", part: "", message: "" });
  const [status, setStatus] = useState<{ kind: "idle" | "sending" | "ok" | "error"; msg?: string }>({
    kind: "idle",
  });

  async function submitInquiry() {
    if (!form.name.trim()) {
      setStatus({ kind: "error", msg: "Please share your name." });
      return;
    }
    if (!form.phone.trim() && !form.email.trim()) {
      setStatus({ kind: "error", msg: "Add a phone number or email so we can reach you." });
      return;
    }
    if (!form.part.trim() && !form.message.trim()) {
      setStatus({ kind: "error", msg: "Tell us which part you need." });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      await publicApi.submitInquiry({
        name: form.name.trim(),
        phone: form.phone.trim() || undefined,
        email: form.email.trim() || undefined,
        part: form.part.trim() || undefined,
        message: form.message.trim() || undefined,
      });
      setStatus({ kind: "ok", msg: "Thanks! We'll get back to you shortly." });
      setForm({ name: "", phone: "", email: "", part: "", message: "" });
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error
          ?.message || "Could not send. Please try WhatsApp or try again.";
      setStatus({ kind: "error", msg });
    }
  }

  function openWhatsApp() {
    const body = [
      form.name && `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      form.part && `Part needed: ${form.part}`,
      form.message && `\n${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    const finalBody = body || buildInquiryMessage({ name: form.part || "General inquiry" });
    window.open(whatsappLink(finalBody), "_blank");
  }

  return (
    <section id="contact" className="py-14 md:py-20" style={{ background: "var(--bg-subtle)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--ink)" }}>
            Get in touch
          </h2>
          <p className="mt-2 text-sm md:text-base" style={{ color: "var(--ink-soft)" }}>
            Call, WhatsApp, or send us a quick inquiry — we respond within minutes during business hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5 flex flex-col gap-3">
            <ChannelCard
              icon={MessageCircle}
              tint="var(--whatsapp)"
              label="WhatsApp"
              value={CONTACT.whatsapp.number}
              cta="Open chat"
              href={whatsappLink(buildInquiryMessage({ name: "General inquiry" }))}
              external
            />
            {CONTACT.phones.map((p) => (
              <ChannelCard
                key={p.tel}
                icon={Phone}
                tint="var(--accent)"
                label={`${p.label} desk`}
                value={p.number}
                cta="Call now"
                href={telLink(p.tel)}
              />
            ))}
            <ChannelCard
              icon={Mail}
              tint="var(--ink-2)"
              label="Email"
              value={CONTACT.email}
              cta="Send mail"
              href={mailtoLink("Inquiry — Rahul Motors", "Hello Rahul Motors,\n\n")}
            />
            <ChannelCard
              icon={MapPin}
              tint="var(--ink-soft)"
              label="Visit our shop"
              value="View on Google Maps"
              cta="Get directions"
              href={CONTACT.mapsLink}
              external
            />
          </div>

          <div className="lg:col-span-7 grid gap-5">
            <div
              className="p-5 md:p-6 rounded-xl"
              style={{ background: "var(--bg-elev)", border: "1px solid var(--line)" }}
            >
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{ color: "var(--ink)" }}>
                  Send a quick inquiry
                </h3>
                <span className="text-xs" style={{ color: "var(--ink-faint)" }}>
                  No account needed
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="e.g. Ramesh" />
                <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+91 …" type="tel" />
              </div>
              <Field
                label="Email (optional)"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder="you@example.com"
                type="email"
                className="mt-3"
              />
              <Field
                label="Part / model needed"
                value={form.part}
                onChange={(v) => setForm({ ...form, part: v })}
                placeholder="e.g. ABS sensor for TATA Indigo"
                className="mt-3"
              />
              <FieldArea
                label="Anything else?"
                value={form.message}
                onChange={(v) => setForm({ ...form, message: v })}
                placeholder="Quantity, urgency, vehicle year…"
                className="mt-3"
              />

              <div className="mt-5 grid sm:grid-cols-2 gap-2.5">
                <button
                  onClick={submitInquiry}
                  disabled={status.kind === "sending"}
                  className="inline-flex items-center justify-center gap-2 h-11 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ background: "var(--accent)", color: "#fff" }}
                >
                  <Send className="h-4 w-4" />
                  {status.kind === "sending" ? "Sending…" : "Send inquiry"}
                </button>
                <button
                  onClick={openWhatsApp}
                  className="inline-flex items-center justify-center gap-2 h-11 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: "var(--whatsapp)", color: "#0c2415" }}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp instead
                </button>
              </div>

              {status.kind === "ok" && (
                <div
                  className="mt-4 flex items-start gap-2 p-3 rounded-lg text-sm"
                  style={{
                    background: "color-mix(in oklab, var(--whatsapp) 14%, transparent)",
                    color: "var(--ink)",
                    border: "1px solid color-mix(in oklab, var(--whatsapp) 35%, transparent)",
                  }}
                >
                  <CheckCircle2 className="h-4 w-4 mt-0.5" style={{ color: "var(--whatsapp)" }} />
                  <span>{status.msg}</span>
                </div>
              )}
              {status.kind === "error" && (
                <div
                  className="mt-4 flex items-start gap-2 p-3 rounded-lg text-sm"
                  style={{
                    background: "color-mix(in oklab, #ef4444 12%, transparent)",
                    color: "var(--ink)",
                    border: "1px solid color-mix(in oklab, #ef4444 35%, transparent)",
                  }}
                >
                  <AlertCircle className="h-4 w-4 mt-0.5" style={{ color: "#ef4444" }} />
                  <span>{status.msg}</span>
                </div>
              )}
            </div>

            <div
              className="relative rounded-xl overflow-hidden aspect-[16/9]"
              style={{ background: "var(--bg-elev)", border: "1px solid var(--line)" }}
            >
              <iframe
                src={CONTACT.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rahul Motors location"
                allowFullScreen
              />
              <a
                href={CONTACT.mapsLink}
                target="_blank"
                rel="noopener"
                className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 h-9 rounded-lg text-xs font-semibold"
                style={{
                  background: "var(--bg-elev)",
                  color: "var(--ink)",
                  border: "1px solid var(--line-strong)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <MapPin className="h-3.5 w-3.5" /> Open in Maps <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChannelCard({
  icon: Icon,
  tint,
  label,
  value,
  cta,
  href,
  external = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tint: string;
  label: string;
  value: string;
  cta: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      className="group p-4 rounded-xl flex items-center gap-3 transition-shadow hover:shadow-md"
      style={{ background: "var(--bg-elev)", border: "1px solid var(--line)" }}
    >
      <div
        className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: `color-mix(in oklab, ${tint} 12%, transparent)`,
          color: tint,
        }}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs" style={{ color: "var(--ink-faint)" }}>
          {label}
        </div>
        <div className="text-sm font-semibold truncate" style={{ color: "var(--ink)" }}>
          {value}
        </div>
      </div>
      <div
        className="text-xs font-medium opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ color: "var(--accent)" }}
      >
        {cta} →
      </div>
    </a>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-medium mb-1.5" style={{ color: "var(--ink-2)" }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 px-3 rounded-lg text-sm outline-none focus:ring-2 transition"
        style={{
          background: "var(--bg)",
          color: "var(--ink)",
          border: "1px solid var(--line-strong)",
        }}
      />
    </label>
  );
}

function FieldArea({
  label,
  value,
  onChange,
  placeholder,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-medium mb-1.5" style={{ color: "var(--ink-2)" }}>
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-3 py-2.5 rounded-lg text-sm outline-none focus:ring-2 transition resize-none"
        style={{
          background: "var(--bg)",
          color: "var(--ink)",
          border: "1px solid var(--line-strong)",
        }}
      />
    </label>
  );
}
