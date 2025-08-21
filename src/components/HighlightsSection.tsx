"use client";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { useRefreshRateContext } from "@/components/RefreshRateContext";
type Highlight = {
  id: number;
  media: string;
  title: string;
  description: string; // Short description for hover preview
  story: string; // Longer, detailed story for the modal
  objectPosition?: string; // Add optional object position
  objectFit?: 'cover' | 'contain'; // Add optional object fit
};

const HIGHLIGHTS: Highlight[] = [
  {
    id: 1,
    media: "/placeholder2.jpg", // Replace with your image/video path
    title: "Winning Meralco Idol Hackathon",
    description:
      "Secured 3rd place with GridGuard in Meralco Idol Hackathon 2024, an AI-driven power grid monitoring system.",
    story: `A crazy idea born from a late-night coding session became one of the most formative times in my computer science studies. The Meralco Idol Hackathon 2024 wasn't just any contest; it's where I saw the real strength of people working together to create something new.

Our team shared a goal: to change how power grids are watched and cared for. We named our project GridGuard, an AI system that could guess when things might fail before they do, possibly keeping many people from losing power.

Making it was hard work. I was assigned to make the backend of our web app and training of model. Jasper and Francyne was focused on making the front-end side of things. Dhan and Andrew was focused on making the design of the web app in Figma and researching about what features to include. We spent days researching machine learning, checking patterns in power grid info, and making something that grid workers could easily use. Sometimes we got upset when our first few models didn't work right, and we wondered if we could finish on time especially when we're also doing the front-end side of things for our model using React and other frameworks that can help us achieve what we wanted to do.

Then, things started to come together. Our model started to correctly guess grid problems, our live dashboard started working, and we knew we’d made something special. Presenting was scary, but seeing the judges' faces when we showed what GridGuard could do made up for all the lost sleep.

Getting 3rd place was great, but the best part was getting there. I found out that the best ideas come from mixing tech skills with a real desire to fix problems. This event didn't just help me learn more about our industry more; it showed me how tech can really help people.

Working with my team showed me how important different views are when solving big problems. We all had our own skills, and working together was what made GridGuard a success.

This hackathon really changed things for me. I think it only made me want to keep on getting better and work on my skills. I hope my team and I can create things that use new tech to help the society. It reminded me why I love computer science and only gave me the hunger I needed to be one of the most successful people in this industry or field.


`,
    objectPosition: "center 20%", // Perfect for this hackathon image
  },
  {
    id: 2,
    media: "/placeholder4.jpg",
    title: "First Time as a Speaker",
    description:
      "Shared my experience in joining hackathons and gave tips and tricks at NU - Manila's Computer Science Society's Sprint Hackathon Training Seminar.",
    story: `Standing before the Computer Science Society's Sprint to Success - Hackathon Challenge Training seminar, seeing the students' excited faces, I felt a wave of shyness and nerves. Even with all my practice, speaking at a tech event for the first time was daunting.

Our aim was simple: to get more students into hackathons and coding contests. My presentation partner, Dhan—a teammate from many previous hackathons—gave me a supportive nod as I began. It was great having him there. We had been through tough deadlines, late-night coding fixes, and victory celebrations together. Now, we were passing on our knowledge.

I spoke about AI and machine learning tricks that helped us win. I shared examples, admitted our mistakes, and gave tips on building ML models fast when time is tight. Once I started discussing things I'm interested in, speaking became easy.

The Q&A session was amazing. The students had questions about everything, from data prep to framework selection. One person asked about technical issues during hackathons. Dhan and I then shared some funny stories—like the time our demo crashed right before the big judging. We had to make up something on the spot.

After it was done, some students thanked us. Some admitted they were scared to join hackathons because they didn't think they were good enough, but they said our stories motivated them to try. It hit me that my words mattered. I understood the real value of teaching.

The Computer Science Society reported a bigger crowd than they expected and invited us back for future events. What began as a nerve-wracking experience turned into something I want to do again.

That day shifted my view of my role in tech. I saw that success isn't just about individual achievements. It's also about helping others. Teaching solidifies your own understanding, and it feels fulfilling to prevent others from repeating your mistakes.

Now, I try to give some tips and tricks to newcomers at hackathons whenever I can. The event by the Computer Science Society wasn't just my first presentation—it marked the start of seeing myself as both a student and a mentor in the tech community and industry.
`,
    objectPosition: "center 30%", // Adjust this for the speaker image
  },
  {
    id: 3,
    media: "/placeholder6.jpg",
    title: "The Goated Trio",
    description:
      "Our research on smart commuting with geospatial risk analysis was accepted in multiple conferences and properly defended in MLMI 2025, soon to be published.",
    story: `"Another all-nighter?", this is the question we often ask ourselves. Never forget all of the caffeine and sleepless nights just to finish our model and research paper. That was our life for six months—caffeine-fueled research sessions, debugging complex algorithms, and the three of us—me, Angelo, and Dhan—pushing each other to keep going when results looked bleak.

We called ourselves "The Goated Trio," half-jokingly at first. But as our research on geospatial risk analysis using multi-layered transformer models started yielding unprecedented results, the name stuck. We were undergraduate students taking on graduate-level research, and most faculty members thought we were overreaching.

Our project began from a simple frustration with existing navigation apps. We realized that while apps like Google Maps provide route estimates, they don't offer contextual information about risk factors or suggestive actions. Our daily commutes through Manila's unpredictable streets—sometimes flooded, sometimes congested beyond belief—made us wonder: what if commuters could get not just route information, but detailed risk assessments and recommended actions?

The methodology was ambitious. We designed a novel transformer architecture that could analyze multiple data layers simultaneously—historical traffic patterns, road accidents, weather forecasts, flood data, social media reports, and real-time road conditions. The app would let users input their "from-to" destinations like Google Maps, but instead of just route estimates, it would provide a risk score, detailed contextual information, and specific actions to take.

For example, a high-risk score during rainy season might trigger recommendations like "Take route B instead—it's 10 minutes longer but has 85% less chance of flooding" or "Leave 25 minutes earlier to avoid the predicted traffic congestion at Quezon Avenue." Some nights we'd work until sunrise debugging our code. Angelo was the one who handled our thesis paper, Dhan excelled at presenting our findings, and I focused on making the model and the web app that would showcase our research.

The breakthrough came three months in. Our best model, XGBoost, predicted urban mobility risks with 97.94% accuracy and provided actionable recommendations that reduced commute disruption in our test group. We immediately documented everything and prepared our first paper. The peer review process was brutal—we received comments that picked apart every aspect of our methodology. But we addressed them all, point by point.

When we received the first acceptance email from the International Conference on Machine Learning and Meteorological Integration (MLMI 2025), we couldn't believe it. Then came acceptances from two more conferences. For undergraduate students, this was almost unheard of.

The MLMI conference in Kyoto, Japan was our biggest test. Even though we attended online, as the youngest presenters there, we faced skepticism from established researchers. Our defense session was scheduled for 45 minutes—it lasted nearly an hour with questions.

The conference organizers later informed us that our paper had been recommended for publication in their affiliated journal, a rare honor for first-time presenters. It's currently in the final stages of review and soon to be published.

What made "The Goated Trio" work wasn't just our technical skills—it was our complementary strengths and the trust we built. When one of us struggled, the others stepped up. When we disagreed, we debated respectfully until we found the best approach. We pushed each other to excellence.

This research journey taught me that groundbreaking work rarely comes from playing it safe. It comes from asking questions others haven't considered, from being willing to fail repeatedly before finding the right solution, and from surrounding yourself with people who challenge you intellectually.

What started as a desire to make daily commutes less frustrating evolved into research that could change how people navigate urban environments globally. As we prepare for publication, we're already discussing our next project—integrating real-time emergency services data to help commuters not just avoid problems but actively participate in community-based solutions during urban crises. Because once you've experienced the thrill of creating knowledge that didn't exist before, it's impossible to stop. The Goated Trio is just getting started.`,
    objectPosition: "center 50%",
    objectFit: "cover", // This will show the whole image, fitting it within the container
  },
];

export function HighlightsSection() {
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalHighlight, setModalHighlight] = useState<Highlight | null>(null);
  const [direction, setDirection] = useState(0);
  const [inactive, setInactive] = useState(false);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  // const scrollPosition = useRef<number>(0);
  const { animationDuration, fastDuration, refreshRate } = useRefreshRateContext();

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  // Inactivity handler (15 min)
  useEffect(() => {
    const resetTimer = () => {
      setInactive(false);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => setInactive(true), 15 * 60 * 1000);
    };
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    resetTimer();
    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + HIGHLIGHTS.length) % HIGHLIGHTS.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % HIGHLIGHTS.length);
  };

  const openModal = (highlight: Highlight) => {
    // Set state variables first
    setModalHighlight(highlight);
    setShowModal(true);
    
    // Apply classes for CSS-based scroll locking
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('modal-open');
    
    // Apply simple overflow locking - won't change position
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
    // Apply to all potentially scrollable containers
    const allElements = document.querySelectorAll('div, section, main, article, aside, nav, header, footer');
    allElements.forEach(element => {
      if (element instanceof HTMLElement && !element.closest('[data-modal-content]')) {
        element.style.overflow = 'hidden';
        element.style.touchAction = 'none';
      }
    });
  };

  const closeModal = () => {
    // First set state for animation to trigger exit animation
    setShowModal(false);
    
    // Use a timeout to wait for the exit animation to complete before removing content
    setTimeout(() => {
      setModalHighlight(null);
      
      // Remove CSS classes
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('modal-open');
      
      // Restore all scroll-related styles
      const html = document.documentElement;
      const body = document.body;
      
      // Restore html styles
      html.style.overflow = '';
      html.style.height = '';
      html.style.touchAction = '';
      
      // Restore body styles
      body.style.overflow = '';
      body.style.touchAction = '';
      
      // Restore all elements
      const allElements = document.querySelectorAll('div, section, main, article, aside, nav, header, footer');
      allElements.forEach(element => {
        if (element instanceof HTMLElement && !element.closest('[data-modal-content]')) {
          element.style.overflow = '';
          element.style.touchAction = '';
        }
      });
    }, 350); // Match the duration of the exit animation
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      
      // Full emergency cleanup when component unmounts
      if (showModal) {
        // Remove classes
        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('modal-open');
        
        // Reset styles on html
        const html = document.documentElement;
        html.style.overflow = '';
        html.style.height = '';
        html.style.touchAction = '';
        
        // Reset styles on body
        const body = document.body;
        body.style.overflow = '';
        body.style.touchAction = '';
        
        // Reset all elements in the DOM
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
          if (element instanceof HTMLElement && element !== document.body && element !== document.documentElement) {
            element.style.overflow = '';
            element.style.touchAction = '';
          }
        });
      }
    };
  }, [showModal]);

  return (
    <motion.section
      id="highlights"
      className="w-full max-w-7xl mx-auto py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Inactivity Modal */}
      {inactive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-neutral-900 rounded-2xl p-6 sm:p-8 max-w-sm w-full mx-4 border border-neutral-700 shadow-xl text-center">
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">Session Expired</h3>
            <p className="text-neutral-300 mb-4 text-sm sm:text-base">You've been idle for a while. Please refresh the page to continue.</p>
            <button
              className="mt-2 px-4 py-2 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition text-sm sm:text-base"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </div>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 tracking-tight text-neutral-100">Highlights</h2>
      <div className="relative w-full flex flex-col items-center">
        {/* Carousel Row */}
        <div className="flex w-full items-center justify-center gap-2 sm:gap-4 lg:gap-8">
          {/* Left Arrow OUTSIDE */}
          <button
            aria-label="Previous highlight"
            onClick={handlePrev}
            className="p-1 sm:p-2 text-white hover:scale-110 transition-transform duration-150 will-change-transform"
            style={{ background: 'none', border: 'none', boxShadow: 'none' }}
          >
            <FaChevronLeft size={18} className="sm:hidden" />
            <FaChevronLeft size={22} className="hidden sm:block" />
          </button>
          {/* Image Carousel */}
          <div className="relative flex-1 max-w-5xl min-w-[280px] sm:min-w-[340px] md:min-w-[600px] lg:min-w-[800px] aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/6] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-lg will-change-transform group"
            onClick={() => openModal(HIGHLIGHTS[current])}
            style={{
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: 'hidden',
              perspective: 1000,
              transformStyle: 'preserve-3d'
            }}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={HIGHLIGHTS[current].id}
                custom={direction}
                initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -200 : 200, opacity: 0 }}
                transition={{ 
                  duration: refreshRate >= 120 ? 0.15 : 0.2, // Much faster for 60+ fps feel
                  ease: refreshRate >= 120 ? [0.32, 0.72, 0, 1] : [0.4, 0, 0.2, 1],
                  type: "tween"
                }}
                className="absolute inset-0 w-full h-full will-change-transform"
                style={{ 
                  transform: "translateZ(0)", 
                  backfaceVisibility: 'hidden',
                  perspective: 1000,
                  transformStyle: 'preserve-3d'
                }}
              >
                <Image
                  src={HIGHLIGHTS[current].media}
                  alt={HIGHLIGHTS[current].title}
                  fill
                  style={{ 
                    objectFit: HIGHLIGHTS[current].objectFit || 'cover',
                    objectPosition: HIGHLIGHTS[current].objectPosition || 'center center',
                    borderRadius: 24,
                    transform: "translate3d(0, 0, 0)", // Force hardware acceleration
                    transitionDuration: refreshRate >= 120 ? "150ms" : "200ms",
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    backfaceVisibility: 'hidden',
                    perspective: 1000,
                    willChange: 'transform, opacity, filter'
                  }}
                  className="transition-all will-change-transform group-hover:blur-sm group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  priority
                />
                {/* Title overlay - hidden by default, shown on hover */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-3 sm:px-6 py-3 sm:py-4 flex items-end rounded-b-2xl sm:rounded-b-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-full">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white drop-shadow-lg mb-1 text-left">
                      {HIGHLIGHTS[current].title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-neutral-200 text-left line-clamp-2 opacity-90">
                      {HIGHLIGHTS[current].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Right Arrow OUTSIDE */}
          <button
            aria-label="Next highlight"
            onClick={handleNext}
            className="p-1 sm:p-2 text-white hover:scale-110 transition-transform duration-150 will-change-transform"
            style={{ background: 'none', border: 'none', boxShadow: 'none' }}
          >
            <FaChevronRight size={18} className="sm:hidden" />
            <FaChevronRight size={22} className="hidden sm:block" />
          </button>
        </div>
        {/* Dots/Pagination OUTSIDE */}
        <div className="flex items-center gap-1 sm:gap-2 mt-4 sm:mt-6">
          {HIGHLIGHTS.slice(0, 5).map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 sm:h-2 w-5 sm:w-6 rounded-full transition-all will-change-transform ${idx === current ? 'bg-neutral-800' : 'bg-neutral-300/50'}`}
              style={{ 
                transform: "translate3d(0, 0, 0)",
                transitionDuration: refreshRate >= 120 ? "120ms" : "180ms",
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                backfaceVisibility: 'hidden',
                willChange: 'background-color, transform'
              }}
            />
          ))}
        </div>
      </div>
      {/* Enhanced Modal for more info */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence mode="wait">
          {showModal && modalHighlight && (
            <motion.div
              className="fixed z-[9999] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.35, 
                ease: "easeInOut" 
              }}
              onClick={closeModal}
              style={{ 
                position: 'fixed',
                top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              backdropFilter: 'blur(20px) brightness(0.7) saturate(120%)',
              WebkitBackdropFilter: 'blur(20px) brightness(0.7) saturate(120%)',
              zIndex: 9999,
              margin: 0,
              padding: '1rem',
              boxSizing: 'border-box'
            }}
          >
            <motion.div
              className="bg-neutral-900/95 backdrop-blur-xl rounded-3xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[85vh] shadow-2xl relative overflow-hidden border border-neutral-700/50 flex flex-col"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.35, 
                ease: [0.23, 1, 0.32, 1]
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(145deg, rgba(23, 23, 23, 0.95) 0%, rgba(38, 38, 38, 0.9) 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Close button */}
              <motion.button
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-300 hover:text-white transition-all duration-200 backdrop-blur-md border border-neutral-600/50 hover:border-neutral-500/50 shadow-lg"
                onClick={closeModal}
                aria-label="Close modal"
                // initial={{ opacity: 0, scale: 0.8 }}
                // animate={{ opacity: 1, scale: 1 }}
                // transition={{ 
                //   duration: 0.25, 
                //   delay: 0.2,
                //   ease: [0.23, 1, 0.32, 1]
                // }}
                // whileHover={{ scale: 1.1 }}
                // whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Hero Image */}
              <motion.div 
                className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 flex-shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image
                  src={modalHighlight.media}
                  alt={modalHighlight.title}
                  fill
                  style={{ 
                    objectFit: modalHighlight.objectFit || 'cover',
                    objectPosition: modalHighlight.objectPosition || 'center center'
                  }}
                  className="rounded-t-3xl"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 672px"
                  priority
                />
              </motion.div>

              {/* Content with dark theme */}
              <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 min-h-0" data-modal-content>
                <motion.div 
                  className="space-y-3 sm:space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeOut", 
                    delay: 0.15 
                  }}
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight tracking-tight">
                    {modalHighlight.title}
                  </h3>
                  
                  <div className="w-10 sm:w-12 md:w-16 h-1 bg-gradient-to-r from-neutral-400 to-neutral-600 rounded-full" />
                  
                  <div className="text-neutral-300 text-sm sm:text-base leading-relaxed whitespace-pre-line text-left">
                    {modalHighlight.story}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.section>
  );
}
