import Image from 'next/image'
import Link from 'next/link'

export type Product = {
  slug: string
  name: string
  subtitle: string
  price: string
  image: string
  badge?: string
}

type ProductTileProps = {
  product: Product
}

export default function ProductTile({ product }: ProductTileProps) {
  return (
    <Link
      href={`/shop#${product.slug}`}
      className="group block rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
    >
      <div className="relative h-60 w-full overflow-hidden rounded-xl bg-neutral-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full border border-neutral-200 bg-white/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-neutral-600">
            {product.badge}
          </span>
        )}
      </div>
      <div className="mt-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-neutral-900">{product.name}</h3>
            <p className="mt-2 text-sm text-neutral-600">{product.subtitle}</p>
          </div>
          <div className="text-sm font-semibold text-neutral-900">{product.price}</div>
        </div>
        <div className="mt-4 text-sm font-semibold text-neutral-700">View</div>
      </div>
    </Link>
  )
}
