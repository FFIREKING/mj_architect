import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { siteConfig } from '../siteConfig';
import './ContactPage.css';

// Office locations
const offices = [
  {
    city: 'Gilbert',
    address: '4380 E Park Ave',
    location: 'Gilbert, AZ 85234',
    phone: siteConfig.contact.phones[0],
    email: siteConfig.contact.email,
    image: '/images/gensler-office.jpg',
    mapUrl:
      'https://www.google.com/maps?q=4380%20E%20Park%20Ave%2C%20Gilbert%2C%20AZ%2085234&output=embed',
  },
];

// Inquiry types
const inquiryTypes = [
  { value: '', label: 'Select inquiry type' },
  { value: 'new-project', label: 'New Project Inquiry' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'careers', label: 'Career Inquiry' },
  { value: 'media', label: 'Media & Press' },
  { value: 'general', label: 'General Question' }
];

// Contact reasons
const contactReasons = [
  {
    icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    title: 'Plan a Meeting',
    description: 'Schedule a studio or site meeting to discuss your project goals.'
  },
  {
    icon: 'M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z',
    title: 'Send a Message',
    description: 'Use the form and I&apos;ll respond with next steps for your project.'
  },
  {
    icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
    title: 'Call Directly',
    description: 'Speak with Matthew Johnson directly about scope, timeline, and priorities.'
  }
];

export default function ContactPage() {
  const [activeOffice, setActiveOffice] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const sanitizeTel = (phone) => phone.replace(/[^\d+]/g, '');

  return (
    <div className="contact-page">
      <PageHero 
        title="Contact Matthew Johnson"
        subtitle="Let&apos;s discuss how to bring your vision to life with a clear and focused design process."
        backgroundImage="/images/events.jpg"
      />

      {/* Contact Reasons */}
      <section className="contact-reasons">
        <div className="container">
          <motion.div 
            className="reasons-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {contactReasons.map((reason, index) => (
              <motion.div
                key={index}
                className="reason-card"
                variants={itemVariants}
              >
                <div className="reason-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={reason.icon} />
                  </svg>
                </div>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section" ref={formRef}>
        <div className="container">
          <div className="form-grid">
            {/* Form */}
            <motion.div 
              className="form-wrapper"
              initial={{ opacity: 0, x: -40 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="form-header">
                <span className="section-label">Get in Touch</span>
                <h2>Send a Message</h2>
                <p>Fill out the form below and I&apos;ll get back to you as soon as possible.</p>
              </div>

              {isSubmitted ? (
                <motion.div 
                  className="form-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="success-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. I&apos;ll be in touch soon.</p>
                  <button 
                    className="reset-btn"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', company: '', phone: '', inquiryType: '', message: '' });
                    }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">Company / Organization</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inquiryType">Inquiry Type *</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                    >
                      {inquiryTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your project or inquiry..."
                      rows="5"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12"/>
                          <polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, x: 40 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="info-card contact-details-card">
                <h3>Get in Touch</h3>
                <ul className="contact-details-list">
                  <li>
                    <span className="contact-details-label">Email</span>
                    <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
                  </li>
                  <li>
                    <span className="contact-details-label">Phone</span>
                    <a href={`tel:${sanitizeTel(siteConfig.contact.phones[0])}`}>
                      {siteConfig.contact.phones[0]}
                    </a>
                  </li>
                  <li>
                    <span className="contact-details-label">Location</span>
                    <p>
                      {offices[0].address}
                      <br />
                      {offices[0].location}
                    </p>
                  </li>
                </ul>
              </div>

              <div className="info-card">
                <h3>General Inquiries</h3>
                <p className="info-text">
                  Use the form to ask questions about services, project fit, or availability.
                </p>
              </div>

              <div className="info-card">
                <h3>New Projects</h3>
                <p className="info-text">
                  Share a short project brief and I&apos;ll follow up with next-step recommendations.
                </p>
              </div>

              <div className="info-card">
                <h3>Collaborations</h3>
                <p className="info-text">
                  For consultant partnerships or design collaborations, reach out through this page.
                </p>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="contact-offices">
        <div className="container">
          <motion.div 
            className="offices-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Office</span>
            <h2>Practice Location</h2>
            <p>Available for in-person meetings in Gilbert, Arizona and remote sessions worldwide.</p>
          </motion.div>

          {/* Office Tabs */}
          <div className="offices-tabs">
            {offices.map((office, index) => (
              <button
                key={index}
                className={`office-tab ${activeOffice === index ? 'active' : ''}`}
                onClick={() => setActiveOffice(index)}
              >
                {office.city}
              </button>
            ))}
          </div>

          {/* Active Office Details */}
          <motion.div 
            className="office-details"
            key={activeOffice}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="office-grid">
              <div className="office-image">
                <img src={offices[activeOffice].image} alt={offices[activeOffice].city} />
              </div>
              <div className="office-info">
                <h3>{offices[activeOffice].city}</h3>
                <div className="info-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <div>
                    <span className="info-item-label">Phone</span>
                    <a href={`tel:${sanitizeTel(offices[activeOffice].phone)}`}>{offices[activeOffice].phone}</a>
                  </div>
                </div>
                <div className="info-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <div>
                    <span className="info-item-label">Location</span>
                    <p>{offices[activeOffice].address}</p>
                    <p>{offices[activeOffice].location}</p>
                  </div>
                </div>
                <div className="info-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/>
                  </svg>
                  <div>
                    <span className="info-item-label">Email</span>
                    <a href={`mailto:${offices[activeOffice].email}`}>{offices[activeOffice].email}</a>
                  </div>
                </div>
              </div>
              <div className="office-map">
                <iframe
                  src={offices[activeOffice].mapUrl}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${offices[activeOffice].city} office location`}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
