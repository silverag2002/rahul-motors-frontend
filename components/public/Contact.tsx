"use client";

import { AlertCircle, ArrowUpRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { CONTACT, telLink, whatsappLink, mailtoLink, buildInquiryMessage } from "@/lib/contact";
import { publicApi } from "@/lib/publicApi";

type Status = { kind: "idle" | "sending" | "ok" | "error"; msg?: string };

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", part: "", message: "" });
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function submitInquiry() {
    if (!form.name.trim()) return setStatus({ kind: "error", msg: "Please share your name." });
    if (!form.phone.trim() && !form.email.trim()) return setStatus({ kind: "error", msg: "Add a phone number or email so we can reach you." });
    if (!form.part.trim() && !form.message.trim()) return setStatus({ kind: "error", msg: "Tell us which part you need." });

    setStatus({ kind: "sending" });
    try {
      await publicApi.submitInquiry({
        name: form.name.trim(), phone: form.phone.trim() || undefined, email: form.email.trim() || undefined,
        part: form.part.trim() || undefined, message: form.message.trim() || undefined,
      });
      setStatus({ kind: "ok", msg: "Thanks! We’ll get back to you shortly." });
      setForm({ name: "", phone: "", email: "", part: "", message: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not send. Please try WhatsApp or try again.";
      setStatus({ kind: "error", msg });
    }
  }

  function openWhatsApp() {
    const body = [form.name && `Name: ${form.name}`, form.phone && `Phone: ${form.phone}`, form.email && `Email: ${form.email}`, form.part && `Part needed: ${form.part}`, form.message && `\n${form.message}`].filter(Boolean).join("\n");
    window.open(whatsappLink(body || buildInquiryMessage({ name: form.part || "General inquiry" })), "_blank", "noopener,noreferrer");
  }

  const channels = [
    { icon: MessageCircle, label: "WhatsApp", value: CONTACT.whatsapp.number, href: whatsappLink(buildInquiryMessage({ name: "General inquiry" })), external: true },
    ...CONTACT.phones.map((phone) => ({ icon: Phone, label: `${phone.label} desk`, value: phone.number, href: telLink(phone.tel), external: false })),
    { icon: Mail, label: "Email", value: CONTACT.email, href: mailtoLink("Inquiry — Rahul Motors", "Hello Rahul Motors,\n\n"), external: false },
    { icon: MapPin, label: "Visit our shop", value: "Open Google Maps", href: CONTACT.mapsLink, external: true },
  ];

  return (
    <section id="contact" className="contact-industrial py-16 md:py-28 border-b border-white/15">
      <div className="shell">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <h2 className="font-editorial text-5xl md:text-7xl leading-[.92] tracking-[-.035em] text-balance" style={{ color: "var(--ink)" }}>Let’s find your part.</h2>
            <p className="mt-6 max-w-[48ch] text-sm md:text-base leading-7" style={{ color: "var(--ink-soft)" }}>
              Call, WhatsApp, or send a quick inquiry. Our team responds within minutes during business hours.
            </p>

            <div className="mt-10 border-t" style={{ borderColor: "var(--line-strong)" }}>
              {channels.map((channel) => (
                <a key={`${channel.label}-${channel.value}`} href={channel.href} target={channel.external ? "_blank" : undefined} rel={channel.external ? "noopener" : undefined} className="group grid grid-cols-[34px_1fr_auto] gap-3 items-center py-4 border-b" style={{ borderColor: "var(--line-strong)" }}>
                  <channel.icon className="h-4 w-4 text-[var(--accent)]" />
                  <span>
                    <span className="block text-[9px] uppercase tracking-[.16em]" style={{ color: "var(--ink-faint)" }}>{channel.label}</span>
                    <span className="mt-1 block text-sm font-semibold truncate" style={{ color: "var(--ink)" }}>{channel.value}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: "var(--ink-soft)" }} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={(e) => { e.preventDefault(); submitInquiry(); }} className="contact-form p-5 sm:p-7 md:p-10 border border-[var(--ink)]" style={{ background: "var(--accent)" }} noValidate>
              <div className="flex items-baseline justify-between gap-4 mb-7">
                <h3 className="font-editorial text-3xl md:text-4xl" style={{ color: "var(--ink)" }}>Quick inquiry</h3>
                <span className="text-[9px] uppercase tracking-[.15em]" style={{ color: "var(--ink-faint)" }}>No account needed</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                <Field label="Your name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} placeholder="e.g. Ramesh" autoComplete="name" />
                <Field label="Phone" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} placeholder="+91 …" type="tel" autoComplete="tel" />
                <Field label="Email (optional)" value={form.email} onChange={(value) => setForm({ ...form, email: value })} placeholder="you@example.com" type="email" autoComplete="email" />
                <Field label="Part / model needed" value={form.part} onChange={(value) => setForm({ ...form, part: value })} placeholder="ABS sensor for TATA Indigo" />
                <FieldArea label="Anything else?" value={form.message} onChange={(value) => setForm({ ...form, message: value })} placeholder="Quantity, urgency, vehicle year…" className="sm:col-span-2" />
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                <button type="submit" disabled={status.kind === "sending"} className="h-12 inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[.1em] bg-[var(--ink)] text-[var(--bg-elev)] hover:bg-white transition-colors disabled:opacity-60">
                  <Send className="h-4 w-4" /> {status.kind === "sending" ? "Sending…" : "Send inquiry"}
                </button>
                <button type="button" onClick={openWhatsApp} className="h-12 inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[.1em] border hover:bg-[var(--bg-muted)] transition-colors" style={{ color: "var(--ink)", borderColor: "var(--ink)" }}>
                  <MessageCircle className="h-4 w-4 text-[var(--success)]" /> WhatsApp instead
                </button>
              </div>

              {status.kind === "ok" && <StatusMessage icon={CheckCircle2} message={status.msg ?? "Sent."} kind="ok" />}
              {status.kind === "error" && <StatusMessage icon={AlertCircle} message={status.msg ?? "Something went wrong."} kind="error" />}
            </form>
          </div>
        </div>

        <div className="relative mt-12 md:mt-16 aspect-[16/10] md:aspect-[21/7] overflow-hidden border" style={{ background: "var(--bg-elev)", borderColor: "var(--line-strong)" }}>
          <iframe src={CONTACT.mapsEmbed} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Rahul Motors location" allowFullScreen />
          <a href={CONTACT.mapsLink} target="_blank" rel="noopener" className="absolute bottom-3 right-3 md:bottom-5 md:right-5 inline-flex items-center gap-2 px-4 h-10 text-xs font-bold shadow-md" style={{ background: "var(--bg-elev)", color: "var(--ink)" }}>
            <MapPin className="h-4 w-4 text-[var(--accent)]" /> Open in Maps <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", autoComplete }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string; autoComplete?: string }) {
  return <label className="block"><span className="block text-[10px] font-bold uppercase tracking-[.12em]" style={{ color: "var(--ink-soft)" }}>{label}</span><input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} autoComplete={autoComplete} className="field-control h-12 text-base md:text-sm outline-none" /></label>;
}

function FieldArea({ label, value, onChange, placeholder, className = "" }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; className?: string }) {
  return <label className={`block ${className}`}><span className="block text-[10px] font-bold uppercase tracking-[.12em]" style={{ color: "var(--ink-soft)" }}>{label}</span><textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} className="field-control mt-1 py-3 text-base md:text-sm outline-none resize-none" /></label>;
}

function StatusMessage({ icon: Icon, message, kind }: { icon: typeof CheckCircle2; message: string; kind: "ok" | "error" }) {
  return <div role="status" className="mt-5 flex items-start gap-2 text-sm" style={{ color: kind === "ok" ? "var(--success)" : "var(--danger)" }}><Icon className="mt-0.5 h-4 w-4 shrink-0" /><span>{message}</span></div>;
}
