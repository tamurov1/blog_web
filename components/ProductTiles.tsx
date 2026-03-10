'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import ProductTile, { type Product } from '@/components/ProductTile'

const products: Product[] = [
  {
    slug: 't-shirt',
    name: 'T-Shirt',
    subtitle: 'Heavyweight cotton, structured fit',
    price: '$149',
    image: '/shop/clothes/1-tshirt.jpg',
    description: 'Premium heavyweight cotton tee with clean shoulder structure and relaxed everyday fit.',
    sizes: ['S', 'M', 'L', 'XL'],
    // badge: 'Limited',
  },
  {
    slug: 'polo-shirt',
    name: 'Polo T-Shirt',
    subtitle: 'Midweight fleece, soft interior',
    price: '$159',
    image: '/shop/clothes/2-polo.jpg',
    description: 'Minimal polo built from breathable cotton blend with durable collar form.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'sweater',
    name: 'Sweater',
    subtitle: 'Crisp shell, minimal hardware',
    price: '$169',
    image: '/shop/clothes/3.jpg',
    description: 'Modern sweater silhouette with balanced warmth and structured drape.',
    sizes: ['M', 'L', 'XL'],
    // badge: 'Drop 01',
  },
  {
    slug: 'quarter-zip',
    name: 'Quarter Zip',
    subtitle: 'Tapered cut, durable twill',
    price: '$179',
    image: '/shop/clothes/4.jpg',
    description: 'Quarter-zip top designed for layering with a clean neckline and athletic cut.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
]

export default function ProductTiles() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({})
  const [isMagnifying, setIsMagnifying] = useState(false)
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('tmk:shop:sizes')
      if (!raw) return
      const parsed = JSON.parse(raw) as Record<string, string>
      setSelectedSizes(parsed)
    } catch {
      setSelectedSizes({})
    }
  }, [])

  useEffect(() => {
    if (!selectedProduct) return

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProduct(null)
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [selectedProduct])

  useEffect(() => {
    if (!selectedProduct) return
    setIsMagnifying(false)
    setZoomOrigin('50% 50%')
  }, [selectedProduct])

  const selectSize = (productSlug: string, size: string) => {
    setSelectedSizes((prev) => {
      const next = { ...prev, [productSlug]: size }
      try {
        localStorage.setItem('tmk:shop:sizes', JSON.stringify(next))
      } catch {
        // Keep state even if localStorage is unavailable.
      }
      return next
    })
  }

  return (
    <>
      <section
        id="shop-grid"
        className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductTile key={product.slug} product={product} onSelect={setSelectedProduct} />
          ))}
        </div>
      </section>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full max-w-3xl rounded-2xl border border-neutral-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2 sm:p-6">
              <div
                className="relative h-72 w-full overflow-hidden rounded-xl bg-white cursor-zoom-in"
                onMouseEnter={() => setIsMagnifying(true)}
                onMouseLeave={() => {
                  setIsMagnifying(false)
                  setZoomOrigin('50% 50%')
                }}
                onMouseMove={(event) => {
                  if (!isMagnifying) return
                  const bounds = event.currentTarget.getBoundingClientRect()
                  const x = ((event.clientX - bounds.left) / bounds.width) * 100
                  const y = ((event.clientY - bounds.top) / bounds.height) * 100
                  setZoomOrigin(`${Math.max(0, Math.min(100, x))}% ${Math.max(0, Math.min(100, y))}%`)
                }}
              >
                <div
                  className="relative h-full w-full p-3 transition-transform duration-200"
                  style={{
                    transform: `scale(${isMagnifying ? 2.5 : 1})`,
                    transformOrigin: zoomOrigin,
                  }}
                >
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500">PRODUCT DETAILS</p>
                <h3 className="mt-2 text-2xl font-semibold text-neutral-900">{selectedProduct.name}</h3>
                <p className="mt-1 text-sm text-neutral-600">{selectedProduct.subtitle}</p>
                <p className="mt-4 text-sm leading-6 text-neutral-700">{selectedProduct.description}</p>
                <p className="mt-5 text-sm font-semibold text-neutral-800">Sizes</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => selectSize(selectedProduct.slug, size)}
                      className={`rounded-md border px-3 py-1 text-xs font-semibold transition ${
                        selectedSizes[selectedProduct.slug] === size
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {selectedSizes[selectedProduct.slug] && (
                  <p className="mt-2 text-xs text-neutral-500">
                    Selected size: <span className="font-semibold">{selectedSizes[selectedProduct.slug]}</span>
                  </p>
                )}
                <div className="mt-6 text-xl font-semibold text-neutral-900">{selectedProduct.price}</div>
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
