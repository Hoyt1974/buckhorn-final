'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b border-white/10 bg-neutral-900/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-white font-semibold tracking-wide">
          SmokyVenues
        </Link>

        {/* Primary nav (no crypto / no language) */}
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-zinc-200 hover:text-white">Home</Link>
          <Link href="/gallery" className="text-zinc-200 hover:text-white">Gallery</Link>
          <Link href="/details" className="text-zinc-200 hover:text-white">Details</Link>
          <Link href="/legal" className="text-zinc-200 hover:text-white">Legal</Link>
          <Link href="/contact" className="text-zinc-200 hover:text-white">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

