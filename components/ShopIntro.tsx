import Link from 'next/link'

export default function ShopIntro() {
  return (
    <section className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
      <div className="text-left">
        <div className="text-[11px] font-semibold tracking-[0.4em] text-neutral-500">
          SHOP
        </div>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-neutral-900">
          Philosophy
        </h1>
        <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-7 max-w-2xl">
          Not just brand, but following philosophy of human capable of thinking, analyzing and creating, not just following.
        </p>
        <p className="mt-2 text-xs text-neutral-500">
          This is demo of the actual shop.
        </p>
      </div>
    </section>
  )
}
