import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

// Define a type for toast items
type ToastItem = {
  id: string;
  message: string;
  description: string;
};

// Define the context type
type ToastContextType = {
  showNavbarToast: (title: string, description: string) => void;
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
  toastVisible: boolean;
  setToastVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toastRef: React.RefObject<HTMLDivElement | null>;
  hideTimer: React.MutableRefObject<NodeJS.Timeout | null>;
  mouseOverToast: React.MutableRefObject<boolean>;
  toastMessage: string;
  toastDescription: string;
  contentVisible: boolean;
  currentToast: ToastItem | null;
  typingText: string;
  resetToastSystem: () => void; // Add reset function type
};

// Create the context with a default value
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Create a provider component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Toast visibility states
  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  
  // Toast content states
  const [toastMessage, setToastMessage] = useState('');
  const [toastDescription, setToastDescription] = useState('');
  const [toastQueue, setToastQueue] = useState<ToastItem[]>([]);
  const [currentToast, setCurrentToast] = useState<ToastItem | null>(null);
  
  // Add typing effect for the toast message
  const typingText = useTypingEffect(toastMessage || "Profile Coming Soon...", 60, 1200);
  
  // Refs for managing interactions
  const toastRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);
  const contentTimer = useRef<NodeJS.Timeout | null>(null);
  const mouseOverToast = useRef<boolean>(false);

  // Process the queue when it changes
  useEffect(() => {
    if (toastQueue.length > 0 && !showToast) {
      // Start showing a new toast
      const nextToast = toastQueue[0];
      setCurrentToast(nextToast);
      setToastMessage(nextToast.message);
      setToastDescription(nextToast.description);
      setShowToast(true);
      setContentVisible(true);
      
      // Animate the toast in
      setTimeout(() => setToastVisible(true), 10);
      
      // Set auto-hide timer
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        // Only hide if mouse is not over toast
        if (!mouseOverToast.current) {
          handleToastHide();
        } else {
          // If mouse is over toast, set a listener to check again when mouse leaves
          console.log("Mouse is over toast, not hiding automatically");
        }
      }, 5000);
      
      // Remove the processed toast from queue
      setToastQueue(prev => prev.slice(1));
    }
  }, [toastQueue, showToast]);
  
  // Function to start hiding a toast
  const handleToastHide = () => {
    // First trigger the fade-out animation
    setToastVisible(false);
    
    // Then remove the component after animation completes
    setTimeout(() => {
      setShowToast(false);
      setContentVisible(true); // Reset for next toast
    }, 400); // Slightly longer than animation duration to ensure smooth exit
  };
  
  // Function to smoothly transition between toast messages
  const handleContentChange = (message: string, description: string) => {
    // Fade out current content
    setContentVisible(false);
    
    // Wait for content fade-out, then change content
    contentTimer.current = setTimeout(() => {
      setToastMessage(message);
      setToastDescription(description);
      
      // Fade in new content
      setTimeout(() => setContentVisible(true), 10);
    }, 300); // Duration of content fade transition
  };

  // Function to show the navbar toast with custom message and description
  const showNavbarToast = (message: string, description: string) => {
    const newToast = {
      id: Date.now().toString(),
      message,
      description
    };
    
    if (showToast) {
      // If a toast is already showing, handle the transition
      if (toastMessage !== message || toastDescription !== description) {
        handleContentChange(message, description);
        setCurrentToast(newToast);
      }
      
      // Reset the hide timer
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        // Only hide if mouse is not currently over the toast
        if (!mouseOverToast.current) {
          handleToastHide();
        } 
      }, 5000);
    } else {
      // If no toast is showing, add to queue (will be processed by the effect)
      setToastQueue(prev => [...prev, newToast]);
    }
  };

  // Reset the toast system - useful for debugging and ensuring things work properly
  const resetToastSystem = () => {
    // Clear timers
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    if (contentTimer.current) {
      clearTimeout(contentTimer.current);
      contentTimer.current = null;
    }
    // Reset state
    setShowToast(false);
    setToastVisible(false);
    setContentVisible(true);
    mouseOverToast.current = false;
    setToastQueue([]);
  };

  // Force toast to close after a specific timeout regardless of mouse state
  useEffect(() => {
    if (showToast) {
      // Force close toast after a longer timeout (10 seconds) even if mouse is over it
      const forceCloseTimer = setTimeout(() => {
        handleToastHide();
      }, 10000);
      
      // Clean up the force close timer
      return () => clearTimeout(forceCloseTimer);
    }
  }, [showToast]);

  // Clean up timers when component unmounts
  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (contentTimer.current) clearTimeout(contentTimer.current);
    };
  }, []);

  return (
    <ToastContext.Provider
      value={{
        showNavbarToast,
        showToast,
        setShowToast,
        toastVisible,
        setToastVisible,
        toastRef,
        hideTimer,
        mouseOverToast,
        toastMessage,
        toastDescription,
        contentVisible,
        currentToast,
        typingText,
        resetToastSystem, // Add the reset function for debugging purposes
      }}
    >
      <AnimatePresence>
        {showToast && (
          <div
            ref={toastRef}
            className={`fixed z-50 pointer-events-auto select-none
              sm:right-4 lg:right-6 
              left-1/2 sm:left-auto top-24 sm:top-20 md:top-24
              -translate-x-1/2 sm:translate-x-0
            `}
            onMouseEnter={() => {
              // Clear any existing hide timer when mouse enters
              if (hideTimer.current) {
                clearTimeout(hideTimer.current);
                hideTimer.current = null;
              }
              mouseOverToast.current = true;
            }}
            onMouseLeave={() => {
              mouseOverToast.current = false;
              // Set a new hide timer when mouse leaves
              if (hideTimer.current) clearTimeout(hideTimer.current);
              hideTimer.current = setTimeout(() => {
                handleToastHide();
              }, 2000);
            }}
          >
          <motion.div
            className={`bg-neutral-900 border border-neutral-700 shadow-xl rounded-xl px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm text-white relative flex flex-col`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: toastVisible ? 1 : 0, y: toastVisible ? 0 : 20 }}
            transition={{ 
              duration: 0.35,
              ease: [0.23, 1, 0.32, 1]
            }}
            style={{ 
              width: 'calc(100vw - 32px)', 
              maxWidth: '320px',
              willChange: 'transform, opacity'
            }}
          >
            {/* Close button */}
            <button
              className="absolute right-4 top-2.5 text-neutral-500 hover:text-white text-lg p-0 m-0 bg-transparent border-none focus:outline-none"
              style={{ lineHeight: 1, fontWeight: 'bold', cursor: 'pointer' }}
              aria-label="Close"
              onClick={() => {
                // Use the reset function to ensure everything is cleared
                resetToastSystem();
              }}
            >
              ×
            </button>
            
            {/* Content with motion transition */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: contentVisible ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Title text - Now with typing animation */}
              <div className="font-semibold text-xs sm:text-sm text-left w-full pr-8 mb-1.5" style={{ minHeight: 20 }}>
                {typingText}
                <span className="animate-pulse">|</span>
              </div>
              
              {/* Description text */}
              <div className="text-neutral-300 mb-1 text-left w-full pr-8 text-xs">
                {toastDescription}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>
      {children}
    </ToastContext.Provider>
  );
};

// Create a hook to use the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
