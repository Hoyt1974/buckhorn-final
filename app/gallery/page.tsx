import { promises as fs } from 'fs'
import path from 'path'

export const metadata = { title: 'Gallery — Buckhorn Lodge' }

export default async function GalleryPage(){
  const dir = path.join(process.cwd(), 'public', 'images')
  const entries = await fs.readdir(dir)
  const allow = new Set(['.jpg','.jpeg','.png','.webp','.gif'])
  const files = entries
    .filter(f => !/^hero\./i.test(f) && allow.has(path.extname(f).toLowerCase()))
    .sort((a,b)=> a.localeCompare(b))

  return (
    <section className="container my-10">
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>
      <div className="gallery">
        {files.map((f,i)=> (
          <div key={i} className="ph" style={{backgroundImage:`url(/images/${f})`}} />
        ))}
      </div>
      <p className="text-muted text-sm mt-4">
        Drop any JPG/PNG/WebP files into <code>/public/images</code> — they show here automatically.
      </p>
    </section>
  )
}
