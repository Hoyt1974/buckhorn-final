// app/gallery/page.tsx
import Image from "next/image";

// Full gallery – verified filenames only
const photos = [
  { src: "/images/living3.jpg", alt: "Great room — timber ceiling, stone fireplace" },
  { src: "/images/living4.jpg", alt: "Great room — alternate angle" },
  { src: "/images/kit1.jpg", alt: "Kitchen — wood cabinetry and prep space" },
  { src: "/images/kitchen3.jpg", alt: "Kitchen — appliances and breakfast bar" },
  { src: "/images/laundry1.jpg", alt: "Laundry room — washer & dryer" },
  { src: "/images/lounge.jpg", alt: "Lounge / sitting area" },
  { src: "/images/master-bath2.jpg", alt: "Primary suite — bath" },
  { src: "/images/master3.jpg", alt: "Primary suite — bedroom view" },
  { src: "/images/masterbed.jpg", alt: "Primary suite — king bed" },
  { src: "/images/movieroom.jpg", alt: "Movie room — theater seating" },
  { src: "/images/patio1.jpg", alt: "Patio — outdoor seating and view" },
  { src: "/images/ph-01.jpg", alt: "Buckhorn Lodge — Great room overview" },
  { src: "/images/ph-02.jpg", alt: "Mountain view across treetops" },
  { src: "/images/ph-03.jpg", alt: "Kitchen — cooking and prep area" },
  { src: "/images/ph-04.jpg", alt: "Outdoor firepit and gathering circle" },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold">Photo Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((p) => (
          <figure
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
            <figcaption className="sr-only">{p.alt}</figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
