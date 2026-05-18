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

                {siteConfig.contact.offices.map((office, index) => (
                  <div key={index} className="contact-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <div className="contact-text">
                      <span className="contact-label">Location</span>
                      <address className="contact-address">
                        {office.address}
                        <br />
                        {office.city}
                      </address>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
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
