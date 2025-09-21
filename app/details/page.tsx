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
