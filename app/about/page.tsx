import Image from "next/image";
import { FaTwitter, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { FiSearch } from "react-icons/fi";

export default function AboutPage() {
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
            <a href="https://www.youtube.com/channel/UChUvWsi-Dpb6abY6SZsxgxA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-600">
              <FaYoutube /> YouTube
            </a>
            <a href="https://x.com/Dmytriitmk" className="flex items-center gap-2 hover:text-blue-500">
              <FaTwitter /> X (formerly Twitter)
            </a>
            <a href="https://github.com/tamurov1" className="flex items-center gap-2 hover:text-gray-700">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/dmytrii-tamurov-40b6aa274/" className="flex items-center gap-2 hover:text-blue-700">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </section>


        {/* About Container */}
        <section className="w-full sm:w-2/3">
            <p className="text-gray-700 leading-7">
                <b>Hello everyone!</b><br />
                Thanks for stopping by and taking the time to read through my scratches,
                thoughts, and digital ramblings - or as some might call it, a “Portfolio” or “About Page”.
            <br /><br />
                My name is Dmytrii Tamurov - I write code, break systems (ethically), ask too many questions about the human mind, and lift heavy weights professionally.
                In simpler terms: I’m a Developer, an aspiring Cybersecurity Specialist, an amateur Researcher in Psychology, Philosophy, and Sociology, and a Professional Olympic Weightlifter.
            <br /><br />
                Currently, I live in Brampton, Canada, but I’m pretty mobile - mentally and geographically.
            <br /><br />
                Right now, I’m gnawing on knowledge in the Software Development and Network Engineering Advanced Diploma program, and fully planning to conquer the Cyber Security Honours Bachelor right after - both at Sheridan College.
                I learn fast, dive deep, and usually break something (in a good way) along the way.
            <br /><br />
                <b>Contact Me</b><br />
                If you want to chat, collaborate, or just throw some ideas around - you can reach me via email or X.
            <br /><br />
            </p>
        </section>
      </div>
    </main>
  )
}
