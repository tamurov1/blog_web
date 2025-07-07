'use client'
import { useRouter } from 'next/navigation'
import { FiSearch } from 'react-icons/fi'
import BlogMap from '@/components/BlogMap'

export default function MapPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-white text-black p-0 font-sans flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-gray-200">
        <div className="text-2xl font-bold tracking-tight select-none cursor-default">TMK</div>
        <nav className="flex gap-4 items-center text-sm font-medium">
          <a href="/" className="hover:underline">Home</a>
          <a href="/map" className="hover:underline">Map</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/shop" className="hover:underline">Shop</a>
          <FiSearch className="text-xl cursor-pointer hover:opacity-70" />
        </nav>
      </div>

      {/* Fullscreen Blog Map */}
      <div className="w-full h-[calc(100vh-64px)] overflow-hidden">
        <BlogMap />
      </div>
    </main>
  )
}
