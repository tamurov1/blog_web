import Image from "next/image";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black p-6 sm:p-12 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div className="text-2xl font-bold tracking-tight select-none cursor-default">TMK</div>
        <nav className="flex gap-4 items-center">
          <a href="/" className="hover:underline">Home</a>
          <a href="/map" className="hover:underline">Map</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/shop" className="hover:underline">Shop</a>
          <FiSearch className="text-xl cursor-pointer hover:opacity-70" />
        </nav>
      </div>

      {/* Content */}
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Profile Block */}
        <section className="w-full sm:w-1/3 flex flex-col items-center sm:items-start text-center sm:text-left">
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

          <div className="flex flex-col mt-4 gap-2">
            <a href="https://twitter.com/" className="flex items-center gap-2 hover:text-blue-500">
              <FaTwitter /> Twitter
            </a>
            <a href="https://github.com/" className="flex items-center gap-2 hover:text-gray-700">
              <FaGithub /> GitHub
            </a>
            <a href="https://linkedin.com/" className="flex items-center gap-2 hover:text-blue-700">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </section>


        {/* Blog Map Container */}
        <section className="w-full sm:w-2/3">
          <div className="border border-dashed border-gray-400 p-8 h-[300px] flex items-center justify-center rounded-md">
            <span className="text-gray-500 text-lg italic">🛠 Under Construction</span>
          </div>
        </section>
      </div>
    </main>
  );
}
