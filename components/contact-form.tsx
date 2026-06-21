"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getSettings } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const settings = getSettings();
  const m = dict.maison;

  const fieldClass =
    "w-full rounded-card border border-line bg-ivory/60 px-4 py-3 text-obsidian outline-none transition-colors placeholder:text-stone-light focus:border-gold/50";

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Enquiry — ${name || "The Arc Beauty"}`);
        const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
        window.location.href = `mailto:${settings.email}?subject=${subject}&body=${body}`;
        toast.success(m.sending);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="eyebrow text-stone">
            {m.name}
          </label>
          <input
            id="cf-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-2 ${fieldClass}`}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="eyebrow text-stone">
            {m.email}
          </label>
          <input
            id="cf-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-2 ${fieldClass}`}
          />
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className="eyebrow text-stone">
          {m.message}
        </label>
        <textarea
          id="cf-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`mt-2 resize-none ${fieldClass}`}
        />
      </div>
      <Button type="submit" size="lg">
        {m.send}
      </Button>
    </form>
  );
}
