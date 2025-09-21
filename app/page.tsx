import Link from 'next/link'
import labels from '../i18n/en.json'
import config from '../site-config.json'

export default function HomePage(){
  return (
    <>
      {/* Full-width hero image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/hero.jpg" alt="Buckhorn Lodge hero" className="w-full h-[62vh] object-cover" />

      {/* Content card */}
      <section className="container my-8">
        <div className="card p-6 md:p-8">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2">{labels.hero.title}</h1>
          <p className="text-sm md:text-base text-muted mb-1">{labels.hero.sub}</p>
          <p className="text-xl md:text-2xl font-semibold mb-3">{labels.hero.price}</p>
          <p className="text-base md:text-lg text-muted mb-2">{labels.hero.tag}</p>
          <p className="text-sm md:text-base text-muted">{labels.hero.desc}</p>
          <div className="mt-4 flex gap-3">
            <Link href="/contact" className="btn">{labels.cta.requestInfo}</Link>
            <Link href="/gallery" className="btn-ghost">{labels.cta.viewGallery}</Link>
          </div>
          <div className="mt-4 text-xs text-muted">{labels.fsboStrip}</div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container my-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {config.highlights.map((h, i) => (
          <div className="card" key={i}><p className="font-semibold">{h}</p></div>
        ))}
        <div className="card">
          <p className="font-semibold">Renovated {config.renovationRange}</p>
          <p className="text-muted text-sm">Modern systems and finishes with classic Smokies character.</p>
        </div>
      </section>

      {/* WHY THE SMOKIES — expanded, emoji-forward */}
      <section className="container my-10 grid gap-4">
        <h2 className="text-xl font-bold">🌄 Why the Smokies</h2>
        <div className="grid-auto">
          <div className="card">
            <h3 className="font-semibold mb-1">🏞️ America’s Most-Visited National Park</h3>
            <ul className="list-disc list-inside text-sm text-muted">
              <li>≈12–14M annual visitors; resilient, year-round demand</li>
              <li>Four true seasons: 🌸 spring • ☀️ summer • 🍂 fall color • ❄️ winter lights</li>
              <li>Deep rental market supports lifestyle + investment use</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-1">🧭 Destination Neighbors</h3>
            <ul className="list-disc list-inside text-sm text-muted">
              <li>Gatlinburg • Pigeon Forge • Sevierville • GSM National Park</li>
              <li>🎢 Dollywood • 🎭 shows & attractions • 🛍️ arts & crafts community</li>
              <li>🍽️ Dining, markets, breweries</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-1">🚗✈️ Access</h3>
            <ul className="list-disc list-inside text-sm text-muted">
              <li>~1 hr to Knoxville (TYS) • ~2 hrs to Asheville (AVL)</li>
              <li>I-40 / I-75 corridors; regional FBOs for private flight</li>
              <li>All-weather access to the property area</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-1">🌲 Outdoor Lifestyle</h3>
            <ul className="list-disc list-inside text-sm text-muted">
              <li>🚵 trails • 🚣 rivers • 🎣 fishing • 🔥 fire-pits • 🌌 starry skies</li>
              <li>Scenic drives & overlooks, waterfalls, wildlife</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-1">📅 Year-Round Events</h3>
            <ul className="list-disc list-inside text-sm text-muted">
              <li>Festivals, car shows, holiday lights, concerts, craft fairs</li>
              <li>Strong shoulder-season draw</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-1">🏠 Ownership & Investment</h3>
            <ul className="list-disc list-inside text-sm text-muted">
              <li>Privacy on ~10 acres with close-to-town convenience</li>
              <li>Flexible use cases: retreat, legacy home, or investment</li>
              <li>Info deemed reliable; buyer to verify local use/permits</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
