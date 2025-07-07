'use client'
import Image from 'next/image'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black p-6 sm:p-12 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <div className="text-2xl font-bold tracking-tight select-none cursor-default">TMK</div>
        <nav className="flex gap-4 items-center text-sm">
          <a href="/" className="hover:underline">Home</a>
          <a href="/map" className="hover:underline">Map</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/shop" className="hover:underline">Shop</a>
          <FiSearch className="text-xl cursor-pointer hover:opacity-70" aria-label="Search" />
        </nav>
      </header>

      {/* Content */}
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Profile Section */}
        <aside className="w-full sm:w-1/3 flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden border border-gray-300 mb-4">
            <Image
              src="/pic-ava.jpg"
              alt="Dmytrii Tamurov"
              width={150}
              height={150}
              className="object-cover scale-200"
              priority
            />
          </div>

          <h1 className="text-xl font-semibold">Dmytrii Tamurov</h1>
          <p className="mt-2 text-gray-600">
            Cybersecurity, development, Olympic weightlifting — thoughts, blogs, and ideas in one place.
          </p>

          <div className="flex flex-col mt-4 gap-2 text-sm">
            <a href="https://x.com/Dmytriitmk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-500">
              <FaTwitter /> X (formerly Twitter)
            </a>
            <a href="https://github.com/tamurov1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gray-700">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/dmytrii-tamurov-40b6aa274/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-700">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </aside>

        {/* Placeholder Text */}
        <section className="w-full sm:w-2/3">
          <div className="prose max-w-none text-gray-700">
            <h2 className="text-xl font-semibold mb-4">Welcome to My Blog</h2>
            <p>
              <strong>Hello everyone!</strong><br />
              This is just a placeholder for the future blogs.
            </p>
            <p className="mt-4">
              Be patient, new blogs and updates will be soon.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
