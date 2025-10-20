"use client";
import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import config from "../site-config.json";
import labels_en from "../i18n/en.json";
import labels_es from "../i18n/es.json";
import labels_fr from "../i18n/fr.json";
const LABELS: Record<string, any> = {
  en: labels_en,
  es: labels_es,
  fr: labels_fr,
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "es" | "fr">("en");
  const [showLang, setShowLang] = useState(false);
  // Toggle open/close for each dropdown
  const toggleCrypto = () => {
    setShowCrypto((prev) => !prev);
    setShowLang(false); // close language if crypto opens
  };

  const toggleLang = () => {
    setShowLang((prev) => !prev);
    setShowCrypto(false); // close crypto if language opens
  };

  const [showCrypto, setShowCrypto] = useState(false);

  const labels = LABELS[lang];
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-wide text-ink">
          {config.siteName}
        </Link>
        <nav className={clsx("items-center gap-6 hidden md:flex")}>
          <Link href="/" className="hover:text-accent">
            {labels.nav.home}
          </Link>
          <Link href="/gallery" className="hover:text-accent">
            {labels.nav.gallery}
          </Link>
          <Link href="/details" className="hover:text-accent">
            {labels.nav.details}
          </Link>
          <Link href="/legal" className="hover:text-accent">
            {labels.nav.legal}
          </Link>
          <Link href="/contact" className="hover:text-accent">
            {labels.nav.contact}
          </Link>

          {/* Visible Crypto dropdown (now always visible in desktop) */}
          <div className="relative">
            {/* <button
              onClick={() => setShowCrypto((v) => !v)}
              className="px-3 py-1.5 rounded-full border border-line hover:border-accent/60"
            >
              {labels.nav.crypto} ▾
            </button> */}
            <button className="... opacity-60 cursor-not-allowed" disabled>
  Pay with Crypto (coming soon)
</button>

            {showCrypto && (
              <div className="absolute right-0 mt-2 bg-card border border-line rounded-lg shadow-soft min-w-40">
                {config.cryptoOptions.map((c) => (
                  <div
                    key={c}
                    className="px-3 py-2 hover:bg-white/5 cursor-default"
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Language selection (clickable) */}
          <div className="relative">
            {/* <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-lg border border-line hover:border-accent/60 hover:text-accent transition"
            >
              Language
            </button> */}

            {/* <div className="absolute right-0 mt-2 bg-card border border-line rounded-lg shadow-soft min-w-44">
              {config.languages.map((l: any) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className="block w-full text-left px-3 py-2 hover:bg-white/5"
                >
                  {l.label}
                </button>
              ))}
            </div> */}
          </div>
        </nav>

        {/* <button
          className="md:hidden px-3 py-2 border border-line rounded-lg"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button> */}
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-bg">
          <div className="mx-auto max-w-6xl px-4 py-3 grid gap-3">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="hover:text-accent"
            >
              Home
            </Link>
            <Link
              href="/gallery"
              onClick={() => setOpen(false)}
              className="hover:text-accent"
            >
              Gallery
            </Link>
            <Link
              href="/details"
              onClick={() => setOpen(false)}
              className="hover:text-accent"
            >
              Details
            </Link>
            <Link
              href="/legal"
              onClick={() => setOpen(false)}
              className="hover:text-accent"
            >
              Legal
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="hover:text-accent"
            >
              Contact
            </Link>
            <div className="mt-2 text-sm text-muted">{labels.fsboStrip}</div>
          </div>
        </div>
      )}
    </header>
  );
}
