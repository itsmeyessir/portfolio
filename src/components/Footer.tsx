import { useToast } from "@/components/ToastContext";
import React, { useState, useEffect } from "react";
// Typing animation hook
function useTypingEffect(text: string, speed = 60, pause = 1200) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!deleting && index < text.length) {
      timeout = setTimeout(() => setIndex(i => i + 1), speed);
    } else if (!deleting && index === text.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && index > 0) {
      timeout = setTimeout(() => setIndex(i => i - 1), speed / 2);
    } else if (deleting && index === 0) {
      timeout = setTimeout(() => setDeleting(false), 400);
    }
    setDisplayed(text.slice(0, index));
    return () => clearTimeout(timeout);
  }, [index, deleting, text, speed, pause]);
  return displayed;
}

const socials = [
  { name: "GitHub", href: "https://github.com/itsmeyessir" },
  // { name: "LinkedIn", href: "https://www.linkedin.com/in/robbie-espaldon-3b7aa9324/" },
  { name: "LinkedIn", href: null },
  // Add more social links here
];

export function Footer() {
  // No need for typing effect here since we're using the navbar toast
  
  // Get toast context to show the toast in the navbar
  const toast = useToast();

  return (
      <footer className="w-full bg-[#101014]/20 backdrop-blur-md transition-all py-4 xs:py-5 sm:py-6 mt-10 xs:mt-12 sm:mt-16 relative">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-3 xs:px-4 sm:px-6 lg:px-8 gap-3 xs:gap-4">
          {/* Copyright */}
          <span className="text-neutral-400 text-xs sm:text-sm order-2 sm:order-1 text-center sm:text-left">
            &copy; {new Date().getFullYear()} itsmeyessir. All rights reserved.
          </span>
          
          {/* Social Links */}
          <div className="flex gap-3 xs:gap-4 sm:gap-6 order-1 sm:order-2">
            {socials.map((social) =>
              social.name === "LinkedIn" ? (
                <button
                  key={social.name}
                  onClick={() => toast.showNavbarToast("LinkedIn is Hibernating...", "My LinkedIn is currently deactivated and will be back soon. Stay tuned for updates!")}
                  className="text-neutral-400 hover:text-white transition-colors duration-200 focus:outline-none text-xs sm:text-sm whitespace-nowrap"
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                  aria-label="LinkedIn (hibernating)"
                >
                  {social.name}
                </button>
              ) : (
                <a
                  key={social.name}
                  {...(social.href ? { href: social.href } : {})}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm whitespace-nowrap"
                >
                  {social.name}
                </a>
              )
            )}
          </div>
        </div>
      </footer>
  );
}

