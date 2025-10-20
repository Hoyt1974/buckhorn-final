"use client";

import { useI18n } from "@/components/LocaleProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <label className="inline-flex items-center gap-2">
      <span className="sr-only">Change language</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as any)}
        className="bg-white/10 text-white px-2 py-1 rounded-md border border-white/20 outline-none"
      >
        <option value="en">EN</option>
        <option value="es">ES</option>
        <option value="fr">FR</option>
      </select>
    </label>
  );
}
