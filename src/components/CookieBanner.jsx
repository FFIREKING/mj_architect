import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CookieBanner.css';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      // Delay showing the banner for a smooth entrance
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="cookie-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ 
            type: 'spring', 
            damping: 25, 
            stiffness: 200 
          }}
        >
          <div className="cookie-content">
            <div className="cookie-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="8" cy="9" r="1" fill="currentColor"/>
                <circle cx="15" cy="8" r="1" fill="currentColor"/>
                <circle cx="10" cy="14" r="1" fill="currentColor"/>
                <circle cx="16" cy="13" r="1" fill="currentColor"/>
                <circle cx="13" cy="17" r="1" fill="currentColor"/>
              </svg>
            </div>
            <p className="cookie-text">
              "Accept All" to close this dialogue box and consent to the full range of cookies 
              we use to improve your browser experience. For more information, view our{' '}
              <a href="#">Privacy Policy</a>.
            </p>
          </div>
          
          <div className="cookie-actions">
            <motion.button
              className="cookie-btn accept"
              onClick={acceptCookies}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Accept All
            </motion.button>
            <motion.button
              className="cookie-btn preferences"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cookie Preferences
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

