import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { siteConfig } from '../siteConfig';
import './Footer.css';

const footerLinks = {
  services: [
    { label: 'Architectural Design', path: '/services/architectural-design' },
    { label: 'Structural Design', path: '/services/structural-design' },
    { label: 'Civil Engineering Design', path: '/services/civil-engineering-design' },
    { label: 'MEP Design', path: '/services/mep-design' },
    { label: 'Project Management', path: '/services/project-management' }
  ],
  projects: [
    { label: 'Commercial', path: '/projects?category=Commercial' },
    { label: 'Residential', path: '/projects?category=Residential' },
    { label: 'Infrastructure', path: '/projects?category=Infrastructure' },
    { label: 'Industrial', path: '/projects?category=Industrial' }
  ],
  practice: [
    { label: 'About', path: '/about' },
    { label: 'Philosophy', path: '/about/our-values' },
    { label: 'Insights', path: '/insights' },
    { label: 'Contact', path: '/contact' }
  ],
};

const socialLinks = [
  { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { name: 'Instagram', icon: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z' },
  { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          {/* Logo and Description */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-text">{siteConfig.brand.name}</span>
            </Link>
            <p className="footer-tagline">
              {siteConfig.brand.tagline}
            </p>
          </div>

          {/* Links Grid */}
          <div className="footer-links">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="footer-column">
                <h4 className="footer-column-title">{category}</h4>
                <ul className="footer-column-links">
                  {links.map((link) => (
                    <li key={link.label}>
                      <motion.span
                        whileHover={{ x: 3 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Link to={link.path}>{link.label}</Link>
                      </motion.span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Column */}
            <div className="footer-column footer-contact">
              <h4 className="footer-column-title">Contact</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/>
                  </svg>
                  <div className="contact-text">
                    <span className="contact-label">Email</span>
                    <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
                  </div>
                </div>
                {siteConfig.contact.phones.map((phone, index) => (
                  <div key={index} className="contact-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <div className="contact-text">
                      <span className="contact-label">Phone</span>
                      <a href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="footer-back-to-top"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Back to top
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Offices */}
        <div className="footer-offices">
          {siteConfig.contact.offices.map((office, index) => (
            <div key={index} className="office-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <div className="office-details">
                <span className="office-title">{office.title}</span>
                <span className="office-address">{office.address}</span>
                <span className="office-city">{office.city}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Social & Bottom */}
        <div className="footer-bottom">
          <div className="footer-social">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={
                  (social.name === 'LinkedIn' && siteConfig.social.linkedin) ||
                  (social.name === 'Instagram' && siteConfig.social.instagram) ||
                  (social.name === 'Facebook' && siteConfig.social.facebook) ||
                  '#'
                }
                className="social-link"
                aria-label={social.name}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d={social.icon} />
                </svg>
              </motion.a>
            ))}
          </div>

          <div className="footer-legal">
            <span className="copyright">© {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.</span>
            <div className="legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
