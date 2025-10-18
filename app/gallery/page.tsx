// app/gallery/page.tsx
import Image from "next/image";

export default function GalleryPage() {
  // Start simple: verify ph-01.jpg loads first
  const photos = [
    { src: "/images/ph-01.jpg", alt: "Buckhorn Lodge – Great room" },
    // Later add:
    // { src: "/images/ph-02.jpg", alt: "Mountain view" },
    // { src: "/images/ph-03.jpg", alt: "Kitchen" },
    // { src: "/images/ph-04.jpg", alt: "Outdoor firepit" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold">Photo Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((p) => (
          <div
            key={p.src}
            className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 aspect-[4/3]"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          </div>
        ))}
      </div>
    </main>
  );
}
