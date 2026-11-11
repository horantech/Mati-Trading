"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight } from "./Icons";
import type { Dict } from "@/lib/dictionaries";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({
  t,
  divisions,
  endpointEmail,
  ccEmail,
}: {
  t: Dict["contact"]["form"];
  divisions: { slug: string; name: string }[];
  endpointEmail: string;
  /** Optional second recipient, copied on every enquiry. */
  ccEmail?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [division, setDivision] = useState("");

  // Pre-select a business line from ?division=<slug>
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("division");
    if (slug && divisions.some((d) => d.slug === slug)) setDivision(slug);
  }, [divisions]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data._honey) return; // bot
    const divisionName = divisions.find((d) => d.slug === data.division)?.name ?? t.general;

    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${endpointEmail}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Website enquiry — ${divisionName} — ${data.name}`,
          _template: "table",
          _captcha: "false",
          ...(ccEmail ? { _cc: ccEmail } : {}),
          _replyto: data.email,
          Name: data.name,
          Company: data.company,
          Email: data.email,
          Phone: data.phone,
          Country: data.country,
          "Business line": divisionName,
          Message: data.message,
          Language: document.documentElement.lang,
          Page: window.location.href,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== "true") throw new Error(json.message || "Request failed");
      setStatus("success");
      form.reset();
      setDivision("");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "peer w-full rounded-none border-0 border-b border-navy-900/20 bg-transparent px-0 pt-6 pb-3 text-base text-navy-900 placeholder-transparent transition-colors focus:border-gold-dark focus:ring-0 focus:outline-none";
  const label =
    "pointer-events-none absolute top-1 left-0 text-[11px] font-semibold tracking-[0.18em] text-ink/50 uppercase transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-1 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:tracking-[0.18em] peer-focus:text-gold-dark peer-focus:uppercase";

  if (status === "success") {
    return (
      <div role="status" className="flex min-h-[28rem] flex-col items-start justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy-950">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="m5 12 5 5 9-10" />
          </svg>
        </span>
        <p className="mt-8 max-w-md font-display text-3xl leading-snug text-navy-900 font-bold tracking-tight">{t.success}</p>
      </div>
    );
  }

  const Text = ({ name, labelText, type = "text", required = false, autoComplete }: { name: string; labelText: string; type?: string; required?: boolean; autoComplete?: string }) => (
    <div className="relative">
      <input id={`f-${name}`} name={name} type={type} required={required} autoComplete={autoComplete} placeholder={labelText} className={field} />
      <label htmlFor={`f-${name}`} className={label}>
        {labelText}
        {required && <span className="text-gold-dark"> *</span>}
      </label>
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-8 sm:grid-cols-2" noValidate={false}>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {Text({ name: "name", labelText: t.name, required: true, autoComplete: "name" })}
      {Text({ name: "company", labelText: t.company, autoComplete: "organization" })}
      {Text({ name: "email", labelText: t.email, type: "email", required: true, autoComplete: "email" })}
      {Text({ name: "phone", labelText: t.phone, type: "tel", autoComplete: "tel" })}
      {Text({ name: "country", labelText: t.country, autoComplete: "country-name" })}

      <div className="relative">
        <label htmlFor="f-division" className="absolute top-1 left-0 text-[11px] font-semibold tracking-[0.18em] text-ink/50 uppercase">
          {t.division}
        </label>
        <select
          id="f-division"
          name="division"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          className="w-full appearance-none rounded-none border-0 border-b border-navy-900/20 bg-transparent bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%239c7a40%22 stroke-width=%221.6%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_center] bg-no-repeat px-0 pt-6 pb-3 text-base text-navy-900 focus:border-gold-dark focus:ring-0 focus:outline-none"
        >
          <option value="">{t.general}</option>
          {divisions.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <div className="relative sm:col-span-2">
        <textarea id="f-message" name="message" required rows={5} placeholder={t.messagePlaceholder} className={`${field} resize-none`} />
        <label htmlFor="f-message" className={label}>
          {t.message}
          <span className="text-gold-dark"> *</span>
        </label>
      </div>

      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink/50">{t.privacy}</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-navy-900 px-8 py-4 text-sm font-semibold tracking-wide text-crema transition-all hover:bg-gold hover:text-navy-950 disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? t.sending : t.submit}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-sm border border-red-800/30 bg-red-50 px-4 py-3 text-sm text-red-900 sm:col-span-2">
          {t.error}
        </p>
      )}
    </form>
  );
}
