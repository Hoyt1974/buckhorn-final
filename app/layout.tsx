import type { Metadata } from 'next'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import config from '../site-config.json'
export const metadata: Metadata = {
  title: `${config.siteName} — Gatlinburg, TN | For Sale By Owner`,
  description: `Private Smoky Mountain lodge on ~10 acres. Renovat0ed ${config.renovationRange}.`,
  openGraph: { title: `${config.siteName} — Gatlinburg, TN | For Sale By Owner`, description: `Private Smoky Mountain lodge on ~10 acres. Renovated ${config.renovationRange}.`, images: ['/images/hero.svg'] },
  twitter: { card: 'summary_large_image' }
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><Header /><main>{children}</main><Footer /></body></html>)
}
