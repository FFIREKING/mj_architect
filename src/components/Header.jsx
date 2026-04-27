import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../siteConfig';
import './Header.css';

const navItems = [
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

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
              {navItems.map((item, index) => (
                <li 
                  key={item.label}
                  className="nav-item"
                  onMouseEnter={() => (item.dropdown ? setActiveDropdown(index) : null)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link 
                    to={item.path}
                    className={`nav-link ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                  >
                    <motion.span whileHover={{ y: -1 }}>
                      {item.label}
                      {item.dropdown && (
                        <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6">
                          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        </svg>
                      )}
                    </motion.span>
                  </Link>
                  
                  <AnimatePresence>
                    {activeDropdown === index && item.dropdown && (
                      <motion.div
                        className="dropdown-menu"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="dropdown-grid">
                          {item.dropdown.sections.map((section) => (
                            <div key={section.title} className="dropdown-col">
                              <div className="dropdown-col-title">{section.title}</div>
                              <div className="dropdown-col-links">
                                {section.links.map((subItem) => (
                                  <Link
                                    key={subItem.label}
                                    to={subItem.path}
                                    className="dropdown-link"
                                  >
                                    {subItem.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="dropdown-footer">
                          <Link to={item.dropdown.cta.path} className="dropdown-cta">
                            {item.dropdown.cta.label}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="5" y1="12" x2="19" y2="12"/>
                              <polyline points="12 5 19 12 12 19"/>
                            </svg>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Actions */}
          <div className="header-actions">
            <motion.button 
              className="header-action search-btn"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <svg className="header-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
                <line x1="16.2" y1="16.2" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.button>

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

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              className="search-container"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                autoFocus
              />
              <button className="search-close" onClick={() => setIsSearchOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
