import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../siteConfig';
import './Header.css';

const navItems = [
  { 
    label: 'Home', 
    path: '/',
  },
  { 
    label: 'Services', 
    path: '/services',
  },
  { 
    label: 'Projects', 
    path: '/projects',
  },
  { 
    label: 'About', 
    path: '/about',
  },
  { 
    label: 'Insights', 
    path: '/insights',
  },
  { 
    label: 'Contact', 
    path: '/contact',
  },
];

const isNavActive = (pathname, itemPath) => {
  if (itemPath === '/') {
    return pathname === '/';
  }
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // Defer the state update to avoid setState-in-effect lint warnings and reduce cascaded renders.
    const t = window.setTimeout(() => setIsMobileMenuOpen(false), 0);
    return () => window.clearTimeout(t);
  }, [location]);

  return (
    <>
      <motion.header
        className={`header ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <motion.img
              className="logo-img"
              src="/mj-architecture.png"
              alt={siteConfig.brand.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              draggable={false}
            />
          </Link>

          {/* Main Navigation */}
          <nav className="main-nav">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className="nav-item"
                >
                  <Link
                    to={item.path}
                    className={`nav-link ${isNavActive(location.pathname, item.path) ? 'active' : ''}`}
                  >
                    <motion.span whileHover={{ y: -1 }}>
                      {item.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <motion.button
              className="menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className="header-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Mobile Menu Backdrop */}
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="mobile-menu-content">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className="mobile-nav-link"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
