"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
    icon: "🏠",
  },
  {
    label: "Projects",
    href: "/projects",
    icon: "📊",
  },
  {
    label: "Farmers",
    href: "/farmer",
    icon: "🌾",
  },
  {
    label: "Investors",
    href: "/investor",
    icon: "💰",
  },
];

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="sticky lg:static top-0 z-20 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex lg:w-1/2">
            <Link href="/" passHref className="flex items-center gap-3">
              <div className="flex relative w-10 h-10">
                <span className="text-2xl">🌱</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold leading-tight text-xl">CultiVest</span>
                <span className="text-xs text-gray-600">Agricultural Investment Platform</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:w-1/2 justify-end">
            <ul className="flex gap-2">
              {menuLinks.map(({ label, href, icon }) => {
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`rounded-md px-3 py-2 text-sm font-medium flex items-center gap-2 ${
                        isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100 hover:text-black"
                      }`}
                    >
                      {icon}
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isDrawerOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <ul className="space-y-2">
              {menuLinks.map(({ label, href, icon }) => {
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`block rounded-md px-3 py-2 text-base font-medium flex items-center gap-2 ${
                        isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100 hover:text-black"
                      }`}
                      onClick={closeDrawer}
                    >
                      {icon}
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
