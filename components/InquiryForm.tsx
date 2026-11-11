"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { whatsappLink } from "@/lib/shop";

type Status = { kind: "idle" | "sending" | "ok" | "error"; msg?: string };
const EMPTY = { name: "", phone: "", car: "", part: "" };

/** "Can't find it?" form. Sends an email to the shop, or opens WhatsApp with the same words. */
export default function InquiryForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  function check(): string | null {
    if (!form.name.trim()) return "Please write your name.";
    if (!form.phone.trim()) return "Please add a phone number so we can call or WhatsApp you back.";
    if (!form.part.trim()) return "Please write which part you need.";
    return null;
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const problem = check();
    if (problem) return setStatus({ kind: "error", msg: problem });
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/public/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          carName: form.car.trim() || undefined,
          part: form.part.trim(),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error?.message || "It did not send. Please try WhatsApp instead.");
      }
      setStatus({ kind: "ok", msg: "Sent. We will call or WhatsApp you back soon." });
      setForm(EMPTY);
    } catch (err) {
      setStatus({ kind: "error", msg: err instanceof Error ? err.message : "It did not send. Please try WhatsApp instead." });
    }
  }

  const waText = [
    "Hello Rahul Motors, I am looking for a part.",
    "",
    `Car: ${form.car.trim()}`,
    `Part: ${form.part.trim()}`,
    form.name.trim() ? `Name: ${form.name.trim()}` : "",
  ]
    .join("\n")
    .trim();

  const input = "field h-12 w-full rounded-[10px] px-3.5 text-[16px] text-ink outline-none";
  return (
    <form onSubmit={send} className="rounded-[18px] border border-line bg-raised p-5 md:p-7" noValidate>
      <h3 className="heading text-[24px] text-ink">Can’t find your part?</h3>
      <p className="mt-1.5 text-[15.5px] text-ink-3">If it is not on the website, tell us what you need and we will check the shelves.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[14px] font-medium text-ink-2">Your name</span>
          <input className={input} value={form.name} onChange={set("name")} autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[14px] font-medium text-ink-2">Phone</span>
          <input className={input} value={form.phone} onChange={set("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[14px] font-medium text-ink-2">Car and model</span>
          <input className={input} value={form.car} onChange={set("car")} placeholder="e.g. Hyundai i20, 2016, petrol" />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[14px] font-medium text-ink-2">Part you need</span>
          <textarea
            className="field min-h-24 w-full resize-y rounded-[10px] px-3.5 py-3 text-[16px] text-ink outline-none"
            value={form.part}
            onChange={set("part")}
            placeholder="e.g. front right power window switch"
          />
        </label>
      </div>
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        <button type="submit" disabled={status.kind === "sending"} className="press inline-flex h-12 items-center justify-center gap-2 rounded-[12px] bg-ink text-[15px] font-semibold text-paper disabled:opacity-60">
          <Send className="h-4 w-4" /> {status.kind === "sending" ? "Sending…" : "Send to the shop"}
        </button>
        <a
          href={whatsappLink(waText)}
          target="_blank"
          rel="noopener"
          className="press inline-flex h-12 items-center justify-center gap-2 rounded-[12px] bg-whatsapp text-[15px] font-semibold text-whatsapp-ink"
        >
          <WhatsAppIcon className="h-5 w-5" /> Send on WhatsApp
        </a>
      </div>
      {(status.kind === "ok" || status.kind === "error") && (
        <p
          role="status"
          className={`mt-4 flex items-start gap-2 rounded-[10px] px-3.5 py-3 text-[15px] ${status.kind === "ok" ? "bg-brass-soft text-ink" : "bg-[color-mix(in_oklab,var(--color-danger)_12%,transparent)] text-ink"}`}
        >
          {status.kind === "ok" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />}
          {status.msg}
        </p>
      )}
    </form>
  );
}
