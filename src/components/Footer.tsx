"use client";

import React from "react";
import { useToast } from "@/components/ToastContext";

const socials = [
  { name: "GITHUB", href: "https://github.com/itsmeyessir" },
  { name: "LINKEDIN", href: null },
];

export function Footer() {
  // Get toast context to show the toast in the navbar
  const toast = useToast();

  return (
    <footer className="w-full bg-[#050505] border-t border-neutral-800 py-8 mt-16 relative z-20">
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 gap-6">
        {/* Copyright */}
        <span className="font-mono text-neutral-500 text-xs sm:text-sm uppercase tracking-widest order-2 sm:order-1 text-center sm:text-left">
          &copy; {new Date().getFullYear()} itsmeyessir. All rights reserved.
        </span>

        {/* Social Links */}
        <div className="flex gap-6 sm:gap-8 order-1 sm:order-2">
          {socials.map((social) =>
            social.name === "LINKEDIN" ? (
              <button
                key={social.name}
                onClick={() =>
                  toast.showNavbarToast(
                    "CONNECTION FAILED",
                    "My LinkedIn is currently hibernating. Awaiting system reboot.",
                  )
                }
                className="font-mono text-neutral-500 hover:text-white transition-colors duration-300 focus:outline-none text-xs sm:text-sm uppercase tracking-widest"
                aria-label="LinkedIn (hibernating)"
              >
                {social.name}
              </button>
            ) : (
              <a
                key={social.name}
                href={social.href!}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-neutral-500 hover:text-white transition-colors duration-300 text-xs sm:text-sm uppercase tracking-widest"
              >
                {social.name}
              </a>
            ),
          )}
        </div>
      </div>
    </footer>
  );
}
