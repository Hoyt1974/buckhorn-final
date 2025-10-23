'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const hideMenus = pathname?.startsWith('/gallery'); // Hides menus only on gallery
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side: Logo or site name */}
        <Link href="/" className="text-xl font-semibold text-white hover:text-emerald-400">
          Buckhorn Lodge
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex gap-6 text-white">
          <Link href="/" className="hover:text-emerald-400">Home</Link>
          <Link href="/gallery" className="hover:text-emerald-400">Gallery</Link>
          <Link href="/details" className="hover:text-emerald-400">Details</Link>
          <Link href="/legal" className="hover:text-emerald-400">Legal</Link>
          <Link href="/contact" className="hover:text-emerald-400">Contact</Link>
        </nav>

        {/* Right side: Menus (Crypto + Language) hidden on /gallery */}
        {!hideMenus && (
          <div className="flex items-center gap-3 text-white">
            <button
              id="crypto-btn"
              className="px-3 py-1 border border-white/30 rounded hover:bg-white/10 cursor-pointer"
            >
              Pay with Crypto ▼
            </button>

            <button
              id="lang-btn"
              className="px-3 py-1 border border-white/30 rounded hover:bg-white/10 cursor-pointer"
            >
              Language ▼
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-slate-950 border-t border-white/10 py-3 px-4 flex flex-col gap-3 text-white">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
          <Link href="/details" onClick={() => setMenuOpen(false)}>Details</Link>
          <Link href="/legal" onClick={() => setMenuOpen(false)}>Legal</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>
      )}
    </header>
  );
}
