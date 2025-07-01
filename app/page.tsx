import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Dmytrii Tamurov
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
          🚧 Personal portfolio site is under construction. Stay tuned!
        </p>
      </main>

      <footer className="row-start-3 text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Dmytrii Tamurov. All rights reserved.
      </footer>
    </div>
  );
}
