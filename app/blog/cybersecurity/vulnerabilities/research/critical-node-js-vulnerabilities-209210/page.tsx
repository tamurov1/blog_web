'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { notFound } from 'next/navigation'

export default function HomePage() {

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

      <div className="flex flex-col sm:flex-row gap-12">
        {/* Profile */}
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

        {/* Blog Content */}
          <section className="w-full sm:w-2/3">
            <div className="prose prose-lg max-w-none text-gray-800">
              <h1 className="text-3xl font-bold text-blue-600 mb-4">Critical Node.js Vulnerabilities (CVE-2025-27209 & CVE-2025-27210)</h1>
              <p className="text-sm text-gray-500">By Dmytrii Tamurov | July 17, 2025</p>

                <div className="prose prose-lg max-w-4xl mx-auto mt-10">
                  <p>
                    On <strong>July 15, 2025</strong>, the Node.js team released critical patches for versions 
                    <strong> 20.x, 22.x, and 24.x</strong>, addressing two severe vulnerabilities:
                  </p>

                  <ul className="list-disc list-inside">
                    <li><strong>CVE-2025-27210</strong> – a Windows-only path traversal flaw</li>
                    <li><strong>CVE-2025-27209</strong> – a denial-of-service issue from hash collisions in the V8 engine</li>
                  </ul>

                  <p>
                    These vulnerabilities were responsibly disclosed by <code>sharp_edged</code> and 
                    <code>oblivionsage</code>, and patched by <code>targos</code> and <code>RafaelGSS</code>, respectively.
                  </p>

                  <h2 className="mt-10 text-2xl">CVE-2025-27210 – Path Traversal via Windows Device Names</h2>
                  <p>
                    Windows systems have reserved device names like CON, PRN, and AUX, which are treated
                     differently from regular files. In Node.js, functions like <code>path.join()</code> and 
                     <code>path.normalize()</code> are commonly used to sanitize file paths - but they don’t handle these device names 
                     correctly.
                     </p>
                    <p>
                    This vulnerability allows attackers to bypass intended path restrictions and 
                    perform unexpected operations, such as writing to restricted areas or causing the application to crash.
                    This is actually the third attempt to patch a related issue (CVE-2025-23084), meaning 
                    the previous fixes were incomplete.

                  </p>

                  <h3 className="mt-6 font-semibold">Example</h3>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                    <code className="language-js">
                      {`const fs = require('fs');
const path = require('path');

const unsafePath = path.join('uploads', 'CON');
fs.writeFileSync(unsafePath, 'Something...');`}
                    </code>
                  </pre>

                  <p className="mt-4">This triggers:</p>
                  <ol className="list-decimal list-inside">
                    <li>Denial-of-Service (DoS)</li>
                    <li>File access outside expected directories</li>
                  </ol>

                  <h2 className="mt-10 text-2xl">CVE-2025-27209 – HashDoS in the V8 Engine</h2>
                  <p>
                    Node.js v24 introduced a new hashing algorithm called <code>rapidhash</code>. While fast, it unintentionally reintroduced hash collision risks.
                  </p>
                  <p>
                    Attackers can exploit this by flooding the hash table with colliding keys - even without knowing the hash seed - leading to major slowdowns.
                  </p>

                  <h3 className="mt-6 font-semibold">Example</h3>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                    <code className="language-js">
                      {`const obj = {};
['12345', '21345', '32142', '41423'].forEach(key => {
obj[key] = 'test';
});`}
                    </code>
                  </pre>

                  <p className="mt-4">Impact includes:</p>
                  <ul className="list-disc list-inside">
                    <li>Severe performance degradation</li>
                    <li>Full DoS in APIs that rely on user-supplied object keys</li>
                  </ul>

                  <h2 className="mt-10">Conclusion</h2>
                  <p>
                These bugs once again show - doesn’t matter how big or polished the tech is, one small thing missed, and you’ve got a real headache. Node.js is trusted, solid, everywhere, but still, it’s built by humans. Tiny quirks in the system, a wrong assumption deep in the engine, and suddenly someone can break things or slow your app to a crawl. So don’t sleep on updates. Don’t blindly trust what “looks fine.”
                  </p>

                  <h2 className="mt-10 text-xl font-semibold">Useful Links</h2>
                  <ul className="list-disc list-inside">
                    <li>
                      <a
                        href="https://nodejs.org/en/blog/vulnerability/july-2025-security-releases"
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Official Node.js Security Release – July 2025
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2025-27210"
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        CVE-2025-27210 Details
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2025-27209"
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        CVE-2025-27209 Details
                      </a>
                    </li>
                  </ul>
                </div>
            </div>
          </section>
      </div>
    </main>
  );
}
