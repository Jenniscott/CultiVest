"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Farmer", href: "/farmer" },
  { label: "Investor", href: "/investor" },
];

export const HeaderMinimal = () => {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 z-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl">🌱</span>
          <div>
            <span className="font-bold leading-tight text-xl text-black">FarmLink</span>
            <div className="text-xs text-gray-600">Agricultural Financing</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {menuLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                pathname === href ? "text-black" : "text-gray-600 hover:text-black"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="text-sm text-gray-600">Connect Wallet</div>
      </div>
    </div>
  );
};
