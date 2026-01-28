import ProductTile, { type Product } from '@/components/ProductTile'

const products: Product[] = [
  {
    slug: 't-shirt',
    name: 'T-Shirt',
    subtitle: 'Heavyweight cotton, structured fit',
    price: '$149',
    image: '/shop/clothes/1-tshirt.jpg',
    // badge: 'Limited',
  },
  {
    slug: 'polo-shirt',
    name: 'Polo T-Shirt',
    subtitle: 'Midweight fleece, soft interior',
    price: '$159',
    image: '/shop/clothes/2-polo.jpg',
  },
  {
    slug: 'sweater',
    name: 'Sweater',
    subtitle: 'Crisp shell, minimal hardware',
    price: '$169',
    image: '/shop/clothes/3.jpg',
    // badge: 'Drop 01',
  },
  {
    slug: 'quarter-zip',
    name: 'Quarter Zip',
    subtitle: 'Tapered cut, durable twill',
    price: '$179',
    image: '/shop/clothes/4.jpg',
  },
]

export default function ProductTiles() {
  return (
    <section
      id="shop-grid"
      className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductTile key={product.slug} product={product} />
        ))}
      </div>
    </section>
  )
}
