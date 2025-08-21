"use client";
import React, { useState, useEffect } from "react";
import { useActiveSection } from "@/components/useActiveSection";
import { motion, AnimatePresence } from "framer-motion";
// import { ResumeModal } from "@/components/ResumeModal"; // Commented out resume modal
import { useRefreshRateContext } from "@/components/RefreshRateContext";
import { useToast } from "@/components/ToastContext";

const navLinks = [
	{ name: "About", href: "#about" },
	{ name: "Highlights", href: "#highlights" },
	{ name: "Projects", href: "#projects" },
	{ name: "Contact", href: "#contact" },
];

// Typing animation hook (similar to the one in Footer)
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

export function Navbar() {
	const active = useActiveSection(["about", "highlights", "projects", "contact"]);
	// const [resumeOpen, setResumeOpen] = useState(false); // Commented out
	const { fastDuration, refreshRate } = useRefreshRateContext();
	
	// Get toast context
	const { 
		showNavbarToast,
		showToast, 
		setShowToast, 
		toastVisible, 
		setToastVisible, 
		toastRef, 
		hideTimer, 
		mouseOverToast,
		toastMessage,
		toastDescription 
	} = useToast();
	
	// Sidebar navigation state
	const [sidebarOpen, setSidebarOpen] = useState(false);
	
	// Simple effect to lock/unlock body scroll when sidebar is open
	useEffect(() => {
		if (sidebarOpen) {
			// Lock scrolling when sidebar is open
			document.body.style.overflow = 'hidden';
		} else {
			// Restore scrolling when sidebar is closed
			document.body.style.overflow = '';
		}
		
		// Cleanup on unmount
		return () => {
			document.body.style.overflow = '';
		};
	}, [sidebarOpen]);
	
	// We don't need the typing effect here anymore since we're using the context's toast
	
	// Close sidebar when clicking outside - simplified
	useEffect(() => {
		if (sidebarOpen) {
			const handleClickOutside = (e: MouseEvent) => {
				const target = e.target as HTMLElement;
				// Check if click is outside sidebar and not on the hamburger button
				if (!target.closest('.sidebar') && !target.closest('.hamburger-btn')) {
					setSidebarOpen(false);
				}
			};
			
			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	}, [sidebarOpen]);
	
	// Handle navigation item click on mobile - simplified
	const handleNavClick = (targetId: string) => {
		// Close sidebar first
		setSidebarOpen(false);
		
		// Give the sidebar animation time to complete before scrolling
		setTimeout(() => {
			const targetElement = document.getElementById(targetId);
			
			if (targetElement) {
				// Update active section state
				window.dispatchEvent(new CustomEvent('activeSectionChange', { 
					detail: { id: targetId }
				}));
				
				// Calculate scroll position with adjustment for navbar height
				const navbarHeight = window.innerWidth < 640 ? 50 : 70;
				const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
				
				// Smooth scroll to the target
				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth'
				});
			}
		}, 300);
	};
	
	// Cleanup effect
	useEffect(() => {
		return () => {
			if (hideTimer.current) clearTimeout(hideTimer.current);
		};
	}, []);

	return (
		<nav className="fixed top-0 left-0 w-full z-[100] bg-[#101014]/20 backdrop-blur-md transition-all" style={{ height: 'auto' }}>
			<div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
				{/* Left side - Logo/Profile */}
				<div className="flex items-center gap-2 sm:gap-3">
					<button
						onClick={() => showNavbarToast("Under Maintenance...", "My profile is currently under maintenance. Stay tuned for updates!")}
						className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full border-2 border-neutral-700 hover:border-white transition-colors bg-neutral-900 overflow-hidden flex-shrink-0 cursor-pointer"
						aria-label="View Resume (Coming Soon)"
						style={{ background: "none", padding: 0 }}
					>
						<img
							src="/profile.jpg"
							alt="Profile"
							className="w-full h-full object-cover"
						/>
					</button>
					<span className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-white">
						itsmeyessir
					</span>
				</div>

				{/* Modern Hamburger Menu Button - Visible on mobile and tablets in portrait mode */}
				<button 
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className="hamburger-btn md:hidden flex justify-center items-center p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-all focus:outline-none"
					aria-label="Menu"
				>
					<div className="w-6 h-6 flex flex-col justify-center items-center gap-[5px]">
						<span className={`w-4 h-[2px] bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(.47,1.64,.41,.8)] transform origin-center ${sidebarOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`}></span>
						<span className={`w-4 h-[2px] bg-white rounded-full transition-all duration-300 ease-out ${sidebarOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`}></span>
						<span className={`w-4 h-[2px] bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(.47,1.64,.41,.8)] transform origin-center ${sidebarOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`}></span>
					</div>
				</button>

				{/* Desktop Navigation Links - Hidden on mobile */}
				<ul className="hidden md:flex gap-4 md:gap-6 lg:gap-8 relative">
					{navLinks.map((link) => {
						const isActive = active === link.href.replace("#", "");
						return (
							<li key={link.name} className="relative">
								<a
									href={link.href}
									onClick={(e) => {
										e.preventDefault();
										const targetId = link.href.replace('#', '');
										const targetElement = document.getElementById(targetId);
										
										if (targetElement) {
											// First update active state for immediate UI feedback
											if (targetId !== active) {
												// Dispatch event with a slight delay to prevent animation conflicts
												window.dispatchEvent(new CustomEvent('activeSectionChange', { 
													detail: { id: targetId }
												}));
											}
											
											// Use a more native scrolling approach for better performance
											// Adjust navbar height for different screen sizes
											const navbarHeight = window.innerWidth < 640 ? 50 : 70;
											const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
											
											// Use window.scrollTo with smooth behavior
											window.scrollTo({
												top: targetPosition,
												behavior: 'smooth'
											});
										}
									}}
									className={`text-xs xs:text-sm sm:text-base ${isActive ? 'text-white' : 'text-neutral-300 hover:text-white'} font-medium px-0.5 sm:px-1 whitespace-nowrap will-change-transform transition-colors ease-out`}
									style={{ 
										transitionDuration: `${fastDuration}ms`,
										position: 'relative'
									}}
								>
									{link.name}
									{isActive && (
										<motion.span
											layoutId="nav-underline"
											className="absolute left-0 right-0 -bottom-1 h-[2px] bg-primary rounded will-change-transform"
											style={{ 
												background: "#fff",
												transform: "translateZ(0)",
												backfaceVisibility: 'hidden'
											}}
											transition={{
												// Use a simpler animation for more stability
												type: "tween",
												ease: "easeOut",
												duration: 0.15,
												// Disable spring physics to prevent oscillation
												bounce: 0
											}}
										/>
									)}
								</a>
							</li>
						);
					})}
				</ul>
			</div>
			{/* Toast notification now handled by ToastContext */}
			{/* Modern Mobile Sidebar Navigation with Framer Motion */}
			<AnimatePresence>
				{sidebarOpen && (
					<div className="fixed inset-0 z-[999]">
						{/* Enhanced background overlay with subtle blur effect */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.25 }}
							className="fixed inset-0"
							onClick={(e) => {
								e.stopPropagation();
								setSidebarOpen(false);
							}}
							style={{
								backdropFilter: 'blur(10px)',
								WebkitBackdropFilter: 'blur(10px)',
								backgroundColor: 'rgba(0, 0, 0, 0.7)',
								zIndex: 999, /* Updated z-index to be below sidebar but above everything else */
								position: 'fixed',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								width: '100vw',
								height: '100vh'
							}}
						/>
						
						{/* Sidebar panel with a more modern, elegant styling */}
						<motion.div
							className="sidebar fixed top-0 bottom-0 right-0 w-full xs:w-[320px] h-[100vh] overflow-y-auto"
							initial={{ x: "100%" }}
							animate={{ 
								x: 0,
								transition: { 
									type: "spring", 
									stiffness: 150,
									damping: 20
								}
							}}
							exit={{ 
								x: "100%",
								transition: {
									type: "spring",
									stiffness: 250,
									damping: 30
								}
							}}
							style={{
								background: 'linear-gradient(145deg, rgba(12, 12, 14, 0.97) 0%, rgba(18, 18, 22, 0.97) 100%)',
								backdropFilter: 'blur(20px)',
								WebkitBackdropFilter: 'blur(20px)',
								boxShadow: '-10px 0 50px -15px rgba(0, 0, 0, 0.6)',
								borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
								zIndex: 1000, /* Increased z-index */
								height: '100vh', /* Explicitly set height */
								position: 'fixed', /* Ensure fixed positioning */
								top: 0,
								bottom: 0
							}}
						>
				<div className="flex flex-col min-h-screen h-full p-6">
					{/* Safe area at top */}
					<div className="h-2"></div>
					
					{/* Header with title and close button - better aligned */}
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-white font-medium text-lg flex items-center h-10">Menu</h2>
						
						<button
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								console.log("Close button clicked");
								setSidebarOpen(false);
							}}
							className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-white transition-all duration-200 flex items-center justify-center"
							aria-label="Close menu"
							style={{
								cursor: 'pointer',
								zIndex: 1001, /* Ensure it's above everything */
								position: 'relative'
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<line x1="18" y1="6" x2="6" y2="18"></line>
								<line x1="6" y1="6" x2="18" y2="18"></line>
							</svg>
						</button>
					</div>
					
					{/* Maximally compatible navigation links using button elements */}
					<div className="flex flex-col space-y-2 w-full">
						{navLinks.map((link) => {
							const isActive = active === link.href.replace("#", "");
							const linkId = link.href.replace("#", "");
							
							return (
								<button 
									key={link.name}
									type="button"
									onClick={() => {
										console.log(`Clicked on ${link.name}`);
										// Close sidebar first
										setSidebarOpen(false);
										
										// Wait for animation to complete
										setTimeout(() => {
											const targetElement = document.getElementById(linkId);
											
											if (targetElement) {
												// Update active section state
												window.dispatchEvent(new CustomEvent('activeSectionChange', { 
													detail: { id: linkId }
												}));
												
												// Calculate scroll position with adjustment for navbar height
												const navbarHeight = window.innerWidth < 640 ? 50 : 70;
												const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
												
												// Smooth scroll to the target
												window.scrollTo({
													top: targetPosition,
													behavior: 'smooth'
												});
											}
										}, 300);
									}}
									className={`w-full py-3.5 px-4 rounded-lg cursor-pointer transition-all duration-200 relative text-left border ${
										isActive 
											? 'bg-white/10 text-white font-medium border-white/10' 
											: 'text-white/70 hover:bg-white/5 hover:text-white border-transparent'
									}`}
									style={{
										touchAction: 'manipulation',
										WebkitTapHighlightColor: 'transparent',
										appearance: 'none',
										display: 'block',
										background: isActive ? undefined : 'transparent',
										textAlign: 'left',
										width: '100%',
										outline: 'none'
									}}
								>
									{isActive && (
										<div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-white rounded-full"></div>
									)}
									<span className="text-base font-medium block text-left pl-2">{link.name}</span>
								</button>
							);
						})}
					</div>

				{/* Subtle decorative elements */}
				<div className="absolute bottom-20 right-8 w-48 h-48 bg-gradient-to-tr from-white/[0.01] to-white/[0.03] rounded-full blur-3xl"></div>
				<div className="absolute top-40 left-4 w-36 h-36 bg-gradient-to-bl from-indigo-500/[0.02] to-purple-500/[0.025] rounded-full blur-3xl"></div>
				
				{/* Subtle top gradient */}
				<div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/30 to-transparent"></div>
				
				{/* Subtle bottom vignette */}
				<div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/30 to-transparent"></div>
				</div>
			</motion.div>
					</div>
				)}
			</AnimatePresence>

			{/* Full-screen blur overlay when sidebar is open - TEMPORARILY DISABLED FOR TESTING */}
			{/* <AnimatePresence>
				{sidebarOpen && (
					<motion.div 
						initial={{ opacity: 0 }}
						animate={{ 
							opacity: 1,
							transition: { duration: 0.5 }
						}}
						exit={{ opacity: 0, transition: { duration: 0.3 } }}
						className="fixed inset-0"
						aria-hidden="true"
						onClick={() => setSidebarOpen(false)}
						style={{ 
							backdropFilter: 'blur(20px) brightness(0.7) saturate(120%)',
							WebkitBackdropFilter: 'blur(20px) brightness(0.7) saturate(120%)',
							backgroundColor: 'rgba(0, 0, 0, 0.85)',
							zIndex: 99970,
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							width: '100vw',
							height: '100vh',
							pointerEvents: 'auto',
							mixBlendMode: 'normal'
						}}
					></motion.div>
				)}
			</AnimatePresence> */}
			
			{/* Resume modal commented out */}
			{/* <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} /> */}
		</nav>
	);
}
