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
