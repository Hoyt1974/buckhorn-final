#!/usr/bin/env bash
set -e

# 0) dirs
mkdir -p app app/gallery app/details app/legal app/contact app/crypto components public/images i18n

# 1) base files
cat > package.json <<'EOT'
{
  "name": "buckhorn-final",
  "private": true,
  "version": "1.0.0",
  "scripts": { "dev": "next dev", "build": "next build", "start": "next start" },
  "dependencies": { "clsx": "2.1.1", "next": "14.2.5", "react": "18.2.0", "react-dom": "18.2.0" },
  "devDependencies": { "@types/node": "20.11.17", "@types/react": "18.2.44", "autoprefixer": "10.4.19", "postcss": "8.4.38", "tailwindcss": "3.4.7", "typescript": "5.4.5" }
}
EOT

cat > tsconfig.json <<'EOT'
{ "compilerOptions": { "target":"es2017","lib":["dom","dom.iterable","esnext"],"allowJs":true,"skipLibCheck":true,"strict":false,"forceConsistentCasingInFileNames":true,"noEmit":true,"module":"esnext","moduleResolution":"bundler","resolveJsonModule":true,"isolatedModules":true,"jsx":"preserve","incremental":true,"types":["node"] },
  "include":["next-env.d.ts","**/*.ts","**/*.tsx"],"exclude":["node_modules"] }
EOT

printf '/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n' > next-env.d.ts

cat > next.config.ts <<'EOT'
/** @type {import('next').NextConfig} */
const nextConfig = { images: { unoptimized: true } };
export default nextConfig;
EOT

cat > postcss.config.js <<'EOT'
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };
EOT

cat > tailwind.config.ts <<'EOT'
import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}','./components/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { colors: { ink:'#E8F0FF', bg:'#0B1020', muted:'#8AA0C8', accent:'#66A6FF', card:'#141B2D', line:'rgba(255,255,255,0.08)' }, boxShadow:{ soft:'0 10px 30px rgba(0,0,0,0.35)' } } },
  plugins: []
}
export default config
EOT

# 2) content config + i18n
cat > site-config.json <<'EOT'
{
  "siteName": "Buckhorn Lodge",
  "price": "$2,900,000",
  "address": "2140 Tudor Mountain Rd, Gatlinburg, TN 37738",
  "contact": { "name": "", "phone": "(865) 654-8507", "email": "gregslawn1@gmail.com" },
  "renovationRange": "2022–2023",
  "highlights": ["~10 private acres","~5,000 sq ft","3 BR / 3.5 BA","Sleeps ~14"],
  "languages": [{"code":"en","label":"English"},{"code":"es","label":"Español"},{"code":"fr","label":"Français"}],
  "cryptoOptions": ["XRP","BTC","ETH","ADA","SOL"]
}
EOT

cat > i18n/en.json <<'EOT'
{
  "nav": {"home":"Home","gallery":"Gallery","details":"Details","legal":"Legal","contact":"Contact","crypto":"Pay with Crypto","language":"Language"},
  "cta": {"requestInfo":"Request Info","viewGallery":"View Gallery"},
  "fsboStrip": "For Sale By Owner • Private showings by appointment",
  "hero": {
    "title":"🏡 Buckhorn Lodge – An Iconic Mountain Retreat",
    "sub":"2140 Tudor Mountain Road, Gatlinburg, TN 37738",
    "price":"$2,900,000",
    "tag":"A Smoky Mountain Icon, Ready for Its Next Chapter",
    "desc":"Discover Buckhorn Lodge, a rare chance to own a Smoky Mountain icon on nearly 10 private acres. Fully renovated between 2022–2023, this ~5,000 sq ft estate blends timeless rustic charm with modern luxury. From handcrafted wood details to sweeping mountain views, every corner is designed for unforgettable moments."
  }
}
EOT
cp i18n/en.json i18n/es.json
cp i18n/en.json i18n/fr.json

# 3) components
cat > components/Header.tsx <<'EOT'
'use client'
import { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import config from '../site-config.json'
import labels_en from '../i18n/en.json'
import labels_es from '../i18n/es.json'
import labels_fr from '../i18n/fr.json'
const LABELS: Record<string, any> = { en: labels_en, es: labels_es, fr: labels_fr }

export default function Header(){
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState<'en'|'es'|'fr'>('en')
  const labels = LABELS[lang]
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-wide text-ink">{config.siteName}</Link>
        <nav className={clsx("items-center gap-6 hidden md:flex")}>
          <Link href="/" className="hover:text-accent">{labels.nav.home}</Link>
          <Link href="/gallery" className="hover:text-accent">{labels.nav.gallery}</Link>
          <Link href="/details" className="hover:text-accent">{labels.nav.details}</Link>
          <Link href="/legal" className="hover:text-accent">{labels.nav.legal}</Link>
          <Link href="/contact" className="hover:text-accent">{labels.nav.contact}</Link>
          <div className="relative group">
            <button className="px-3 py-1.5 rounded-full border border-line hover:border-accent/60">{labels.nav.crypto} ▾</button>
            <div className="absolute right-0 mt-2 hidden group-hover:block bg-card border border-line rounded-lg shadow-soft min-w-40">
              {config.cryptoOptions.map(c => <div key={c} className="px-3 py-2 hover:bg-white/5 cursor-default">{c}</div>)}
            </div>
          </div>
          <div className="relative group">
            <button className="px-3 py-1.5 rounded-full border border-line hover:border-accent/60">{labels.nav.language} ▾</button>
            <div className="absolute right-0 mt-2 hidden group-hover:block bg-card border border-line rounded-lg shadow-soft min-w-44">
              {config.languages.map((l:any) => (
                <button key={l.code} onClick={()=> (setOpen(false), (setLang(l.code)))} className="block w-full text-left px-3 py-2 hover:bg-white/5">{l.label}</button>
              ))}
            </div>
          </div>
        </nav>
        <button className="md:hidden px-3 py-2 border border-line rounded-lg" onClick={()=>setOpen(v=>!v)}>Menu</button>
      </div>
      {open && (
        <div className="md:hidden border-t border-line bg-bg">
          <div className="mx-auto max-w-6xl px-4 py-3 grid gap-3">
            <Link href="/" onClick={()=>setOpen(false)} className="hover:text-accent">Home</Link>
            <Link href="/gallery" onClick={()=>setOpen(false)} className="hover:text-accent">Gallery</Link>
            <Link href="/details" onClick={()=>setOpen(false)} className="hover:text-accent">Details</Link>
            <Link href="/legal" onClick={()=>setOpen(false)} className="hover:text-accent">Legal</Link>
            <Link href="/contact" onClick={()=>setOpen(false)} className="hover:text-accent">Contact</Link>
          </div>
        </div>
      )}
    </header>
  )
}
EOT

cat > components/Footer.tsx <<'EOT'
import config from '../site-config.json'
export default function Footer(){
  return (
    <footer className="mt-16 border-t border-line bg-bg/80">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted flex items-center justify-between">
        <p>© {new Date().getFullYear()} {config.siteName}. All rights reserved.</p>
        <p className="opacity-80">Equal Housing Opportunity</p>
      </div>
    </footer>
  )
}
EOT

# 4) styles
cat > app/globals.css <<'EOT'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: dark; }
html, body { @apply bg-bg text-ink; }
a { @apply text-ink; }
.container { @apply mx-auto max-w-6xl px-4; }

.hero { @apply relative overflow-hidden border-b border-line; min-height: 62vh; }
.hero::before { content:""; position:absolute; inset:0;
  background: radial-gradient(1200px 400px at 50% -10%, rgba(102,166,255,.25), transparent),
              linear-gradient(180deg, rgba(11,16,32,0.2), rgba(11,16,32,1)); }
.hero-img { @apply absolute inset-0; background: url('/images/hero.svg') center/cover no-repeat; filter: saturate(1.1); }
.hero-inner { @apply relative container flex flex-col items-center justify-center text-center py-16 gap-4; }

.card { @apply bg-card border border-line rounded-2xl p-5 shadow-soft; }
.btn { @apply inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-bg font-semibold hover:opacity-90; }
.grid-auto { @apply grid gap-4; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
.gallery { @apply container grid gap-4; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
.gallery .ph { @apply aspect-[4/3] rounded-xl bg-card border border-line; background-image: url('/images/ph-01.svg'); background-size: cover; }
EOT

# 5) pages
cat > app/layout.tsx <<'EOT'
import type { Metadata } from 'next'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import config from '../site-config.json'
export const metadata: Metadata = {
  title: `${config.siteName} — Gatlinburg, TN | For Sale By Owner`,
  description: `Private Smoky Mountain lodge on ~10 acres. Renovated ${config.renovationRange}.`,
  openGraph: { title: `${config.siteName} — Gatlinburg, TN | For Sale By Owner`, description: `Private Smoky Mountain lodge on ~10 acres. Renovated ${config.renovationRange}.`, images: ['/images/hero.svg'] },
  twitter: { card: 'summary_large_image' }
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><Header /><main>{children}</main><Footer /></body></html>)
}
EOT

cat > app/page.tsx <<'EOT'
import Link from 'next/link'
import labels from '../i18n/en.json'
import config from '../site-config.json'
export default function HomePage(){
  return (
    <>
      <section className="hero">
        <div className="hero-img" />
        <div className="hero-inner">
          <h1 className="text-3xl md:text-5xl font-bold">{labels.hero.title}</h1>
          <p className="text-muted">{labels.hero.sub}</p>
          <p className="text-xl md:text-2xl font-semibold mt-1">{labels.hero.price}</p>
          <p className="max-w-3xl text-base md:text-lg text-muted">{labels.hero.tag}</p>
          <p className="max-w-3xl text-sm md:text-base text-muted">{labels.hero.desc}</p>
          <div className="mt-4 flex gap-3">
            <Link href="/contact" className="btn">{labels.cta.requestInfo}</Link>
            <Link href="/gallery" className="btn bg-transparent border border-line text-ink hover:bg-white/5">{labels.cta.viewGallery}</Link>
          </div>
          <div className="mt-6 text-xs text-muted">{labels.fsboStrip}</div>
        </div>
      </section>

      <section className="container my-10 grid-auto">
        {config.highlights.map((h, i) => (<div className="card" key={i}><p className="font-semibold">{h}</p></div>))}
        <div className="card">
          <p className="font-semibold">Renovated {config.renovationRange}</p>
          <p className="text-muted text-sm">Modern systems and finishes with classic Smokies character.</p>
        </div>
      </section>
    </>
  )
}
EOT

cat > app/gallery/page.tsx <<'EOT'
export const metadata = { title: 'Gallery — Buckhorn Lodge' }
const photos = Array.from({length:12}).map((_,i)=> `/images/ph-${String(i+1).padStart(2,'0')}.svg`)
export default function GalleryPage(){
  return (
    <section className="container my-10">
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>
      <div className="gallery">
        {photos.map((src,i)=> (<div key={i} className="ph" style={{backgroundImage:`url(${src})`}} />))}
      </div>
      <p className="text-muted text-sm mt-4">Replace files in <code>/public/images</code> with real JPG/PNG using the same names and they’ll appear automatically.</p>
    </section>
  )
}
EOT

cat > app/details/page.tsx <<'EOT'
import config from '../../site-config.json'
export const metadata = { title: 'Details — Buckhorn Lodge' }
export default function DetailsPage(){
  return (
    <section className="container my-10 grid gap-6">
      <h1 className="text-2xl font-bold">Property Details</h1>
      <div className="grid-auto">
        <div className="card">
          <h2 className="font-semibold mb-2">Highlights</h2>
          <ul className="list-disc list-inside text-muted">
            {config.highlights.map((h,i)=>(<li key={i}>{h}</li>))}
            <li>Renovated {config.renovationRange}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
EOT

cat > app/legal/page.tsx <<'EOT'
export const metadata = { title: 'Legal — Buckhorn Lodge' }
export default function LegalPage(){
  return (
    <section className="container my-10 prose prose-invert max-w-3xl">
      <h1>Legal & Disclosures</h1>
      <p><strong>For Sale By Owner (FSBO).</strong> Offered directly by the owner. No broker representation implied.</p>
      <p><strong>Equal Housing Opportunity.</strong> We support the principles of the Fair Housing Act.</p>
      <p><strong>Information Deemed Reliable, Not Guaranteed.</strong> All details subject to independent verification by buyer.</p>
      <p><strong>Private Showings by Appointment Only.</strong> Do not trespass. Contact us to arrange a viewing.</p>
      <p><strong>International Buyers.</strong> Cross-border payment & closing guidance available upon request.</p>
    </section>
  )
}
EOT

cat > app/contact/page.tsx <<'EOT'
import config from '../../site-config.json'
export const metadata = { title: 'Contact — Buckhorn Lodge' }
export default function ContactPage(){
  const mailto = `mailto:${config.contact.email}?subject=Buckhorn%20Lodge%20Inquiry`
  const tel = `tel:${config.contact.phone.replace(/[^\\d+]/g,'')}`
  return (
    <section className="container my-10 grid gap-4 max-w-xl">
      <h1 className="text-2xl font-bold">Request Information</h1>
      <a className="btn" href={mailto}>Email {config.contact.name}</a>
      <a className="btn" href={tel}>Call {config.contact.phone}</a>
      <p className="text-muted text-sm">Your email client will open with a prefilled subject.</p>
    </section>
  )
}
EOT

cat > app/crypto/page.tsx <<'EOT'
import config from '../../site-config.json'
export const metadata = { title: 'Crypto Options — Buckhorn Lodge' }
export default function CryptoPage(){
  return (
    <section className="container my-10 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Crypto Options (Preview)</h1>
      <p className="text-muted mb-4">The following currencies are listed for client review. Details can be finalized during offer.</p>
      <ul className="list-disc list-inside">{config.cryptoOptions.map((c)=> <li key={c}>{c}</li>)}</ul>
    </section>
  )
}
EOT

# 6) image placeholders
cat > public/images/hero.svg <<'EOT'
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b1020"/><stop offset="1" stop-color="#22335b"/></linearGradient></defs><rect fill="url(#g)" width="100%" height="100%"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#66a6ff" font-size="64" font-family="sans-serif">Buckhorn Lodge — Hero</text></svg>
EOT
for i in $(seq -w 01 12); do cp public/images/hero.svg "public/images/ph-$i.svg"; done

# 7) install & run
npm install
npm run dev
