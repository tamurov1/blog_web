'use client'
import { useRef } from 'react'
import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import BackgroundFX from '@/components/BackgroundFX'

export default function ShopPage() {
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-white text-black p-6 sm:p-12 font-sans relative overflow-hidden"
    >
      <BackgroundFX containerRef={mainRef} />
      {/* Header */}
      <div className="flex justify-between items-center mb-12 relative z-10 animate-fade-up">
        <div className="flex items-center gap-2 text-2xl font-bold tracking-tight select-none cursor-default">
          <Image
            src="/logo-black.png"
            alt="TMK logo"
            width={26}
            height={26}
            className="h-6 w-6 object-contain"
            priority
          />
          TMK
        </div>
        <nav className="flex gap-4 items-center">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/map" className="hover:underline">Map</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/shop" className="hover:underline">Shop</Link>
          <FiSearch className="text-xl cursor-pointer hover:opacity-70" />
        </nav>
      </div>

      {/* Content */}
      <div className="flex flex-col sm:flex-row gap-12 relative z-10">
        {/* Sidebar: Categories & Exclusive */}
        <aside className="w-full sm:w-1/3 flex flex-col gap-8 animate-fade-up-1">
          <div>
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <ul className="flex flex-col gap-2 text-gray-700">
              <li><a href="#" className="hover:text-black">T-Shirts</a></li>
              <li><a href="#" className="hover:text-black">Hoodies</a></li>
              <li><a href="#" className="hover:text-black">Accessories</a></li>
              <li><a href="#" className="hover:text-black">Posters</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Exclusive Item</h2>
            <div className="w-full h-[140px] rounded-lg overflow-hidden border border-gray-300 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1618354691211-f9c81bcbfa4e"
                alt="Exclusive Drop"
                width={400}
                height={140}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Limited edition hoodie by TMK - launching soon.
            </p>
          </div>
        </aside>

        {/* Shop Display */}
        <section className="w-full sm:w-2/3 flex items-center justify-center border border-dashed border-gray-300 rounded-lg min-h-[300px] bg-white/70 shadow-lg backdrop-blur animate-fade-up-2">
          <p className="text-lg text-gray-500">The shop is under construction. Coming soon.</p>
        </section>
      </div>
    </main>
  );
}
