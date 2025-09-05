import React from "react";
import Link from "next/link";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="min-h-0 py-8 px-4 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <span className="font-bold text-black">CultiVest</span>
            </div>
            <p className="text-gray-600 text-center md:text-left">
              Connecting farmers with global investors for sustainable agriculture
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <Link href="/projects" className="hover:text-black transition-colors">
                Projects
              </Link>
              <Link href="/farmer" className="hover:text-black transition-colors">
                For Farmers
              </Link>
              <Link href="/investor" className="hover:text-black transition-colors">
                For Investors
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span>Built with ❤️ for sustainable agriculture</span>
          </div>
          <div className="flex items-center gap-1 mt-2 md:mt-0">
            <span>💰 Agricultural Investment Platform</span>
          </div>
        </div>
      </div>
    </div>
  );
};
