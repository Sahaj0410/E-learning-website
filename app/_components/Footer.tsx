import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter, Unplug } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-gray-400 font-game mt-20 border-t border-zinc-800">
      <div
        className="max-w-7xl mx-auto
                   px-6 sm:px-10 md:px-16 lg:px-24
                   py-12"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-white text-2xl">
                PixelPathshala
              </h2>
              <Image src="/logo.png" alt="logo" width={36} height={36} />
            </div>

            <p className="text-sm mt-3 max-w-xs">
              Level up your coding skills, one pixel at a time.
            </p>
          </div>

          <div>
            <h3 className="text-yellow-400 text-lg">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li className="hover:text-yellow-300 transition">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-yellow-300 transition">
                <Link href="/courses">Courses</Link>
              </li>
              <li className="hover:text-yellow-300 transition">
                <Link href="/pricing">Pricing</Link>
              </li>
              <li className="hover:text-yellow-300 transition">
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-yellow-400 text-lg">Social</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="https://discord.com/"
                  target="_blank"
                  className="flex items-center justify-center sm:justify-start gap-2 hover:text-yellow-300 transition"
                >
                  <Unplug className="h-4 w-4" />
                  Discord
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  className="flex items-center justify-center sm:justify-start gap-2 hover:text-yellow-300 transition"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </Link>
              </li>

              <li>
                <Link
                  href="https://x.com/"
                  target="_blank"
                  className="flex items-center justify-center sm:justify-start gap-2 hover:text-yellow-300 transition"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter / X
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-12">
          © {new Date().getFullYear()} PixelPathshala. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
