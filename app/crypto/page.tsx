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
