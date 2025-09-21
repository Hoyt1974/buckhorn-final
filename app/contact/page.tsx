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
