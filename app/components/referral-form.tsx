"use client";

import { FormEvent, useCallback, useState } from "react";

export function ReferralForm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "copied">("idle");

  const createCode = useCallback((value: string) => {
    const normalized = value.trim().toLowerCase();
    if (!normalized) {
      return null;
    }

    const cleaned = normalized.replace(/[^a-z0-9]/g, "");
    const base = cleaned.padEnd(6, "goal").slice(0, 6);
    const checksum = base
      .split("")
      .reduce((acc, char, index) => acc + char.charCodeAt(0) * (index + 1), 0)
      .toString(36)
      .toUpperCase();

    return `YGP-${base.slice(0, 3).toUpperCase()}-${checksum.slice(0, 3)}`;
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const generated = createCode(email);
    if (!generated) {
      setCode(null);
      return;
    }

    setCode(generated);
    setStatus("idle");
  };

  const handleCopy = async () => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setStatus("copied");
    } catch (error) {
      console.warn("Clipboard copy failed", error);
    }
  };

  return (
    <div className="referral">
      <form className="referral__form" onSubmit={handleSubmit}>
        <label className="visually-hidden" htmlFor="referral-email">
          Email address
        </label>
        <input
          id="referral-email"
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
        />
        <button className="button button--primary" type="submit">
          Generate referral code
        </button>
      </form>
      {code ? (
        <div className="referral__result" role="status" aria-live="polite">
          <div className="referral__code">
            <output htmlFor="referral-email">{code}</output>
            <button
              type="button"
              className="button button--secondary"
              onClick={handleCopy}
            >
              {status === "copied" ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="referral__hint">
            {status === "copied"
              ? "Share your code with a teammate to unlock one free month for both of you."
              : "Each invite earns an extra month when your referral becomes a paying customer."}
          </p>
        </div>
      ) : (
        <p className="referral__hint">
          Create a personal code and invite a teammate to co-plan your revenue journey.
        </p>
      )}
    </div>
  );
}
