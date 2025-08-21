"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRefreshRateContext } from "@/components/RefreshRateContext";

export function ContactSection() {
  const { refreshRate } = useRefreshRateContext();
  
  const detectAndOpenEmail = () => {
    const email = "espaldonrobbie@proton.me";
    const subject = "";
    
    // Detect mobile devices - they usually handle mailto better
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // On mobile, try mailto first since it usually works
    if (isMobile) {
      try {
        window.location.href = `mailto:${email}?subject=${subject}`;
        return;
      } catch (error) {
        // If mailto fails on mobile, fall back to Gmail
        window.open(`https://mail.google.com/mail/?view=cm&to=${email}&su=${subject}`, '_blank');
        return;
      }
    }
    
    // For desktop/laptop - skip mailto and go directly to web email
    // Check if user is likely using Gmail (Google services)
    if (window.location.hostname.includes('gmail') || 
        localStorage.getItem('gmail') || 
        document.cookie.includes('gmail') ||
        navigator.userAgent.includes('Chrome')) { // Chrome users likely use Gmail
      window.open(`https://mail.google.com/mail/?view=cm&to=${email}&su=${subject}`, '_blank');
      return;
    }
    
    // Check if user is likely using Outlook/Microsoft services
    if (window.location.hostname.includes('outlook') || 
        window.location.hostname.includes('microsoft') ||
        localStorage.getItem('outlook') ||
        navigator.userAgent.includes('Edge')) { // Edge users likely use Outlook
      window.open(`https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${subject}`, '_blank');
      return;
    }
    
    // Default fallback to Gmail for desktop
    window.open(`https://mail.google.com/mail/?view=cm&to=${email}&su=${subject}`, '_blank');
  };

  return (
    <motion.section
      id="contact"
      className="scroll-mt-60 w-full max-w-4xl mx-auto py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center min-h-[60vh] bg-transparent"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ 
        duration: refreshRate >= 120 ? 0.6 : 0.8, 
        ease: refreshRate >= 120 ? [0.25, 0.46, 0.45, 0.94] : [0.23, 1, 0.32, 1],
        type: "tween"
      }}
      style={{
        transform: "translateZ(0)",
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity'
      }}
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 tracking-tight text-neutral-100">Contact</h2>
      <p className="text-neutral-300 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-xs sm:max-w-md lg:max-w-2xl px-2 sm:px-0">Want to work together or have a question? Reach out!</p>
      
      <button
        onClick={detectAndOpenEmail}
        className="inline-block bg-neutral-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold shadow-lg hover:bg-neutral-700 transition-colors duration-200 text-sm sm:text-base"
      >
        Email Me
      </button>
    </motion.section>
  );
}
