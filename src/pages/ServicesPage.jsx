import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { projectsCatalog } from '../data/projectsCatalog';
import './ServicesPage.css';

// Core services
const expertiseAreas = [
  {
    id: 'architectural-design',
    title: 'Architectural Design',
    shortDesc: 'Architecture that performs—and endures',
    fullDesc:
      'We design buildings that respond to people, place, and program. Our approach balances clarity, constructability, and long-term performance across sectors and scales.',
    image: 'https://static1.gensler.com/uploads/image/76919/project-burlingame-point-2022-508x508_1659396443.jpg',
    stats: [
      { number: '100+', label: 'Projects Delivered' },
      { number: '10+', label: 'Countries' },
      { number: '10+', label: 'Design Awards' },
    ],
    subServices: ['Commercial', 'Residential', 'Mixed-Use', 'Civic + Culture', 'Hospitality', 'Infrastructure'],
    featured: true,
  },
  {
    id: 'structural-design',
    title: 'Structural Design',
    shortDesc: 'Efficient systems, resilient outcomes',
    fullDesc:
      'We deliver structural solutions that support architectural intent, optimize materials, and prioritize safety, adaptability, and resilience.',
    image: 'https://static1.gensler.com/uploads/image/103629/1764116289247/project-alembic-gateway-tower-508x508.jpg',
    stats: [
      { number: '100+', label: 'Projects Supported' },
      { number: '10+', label: 'Countries' },
      { number: '10+', label: 'Complex Builds' },
    ],
    subServices: ['Concept + feasibility', 'Structural systems', 'Seismic + wind strategy', 'Peer reviews'],
    featured: true,
  },
  {
    id: 'civil-engineering-design',
    title: 'Civil Engineering Design',
    shortDesc: 'Site + infrastructure made simple',
    fullDesc:
      'From grading and drainage to utilities and access, we design civil systems that are durable, coordinated, and aligned with permitting realities.',
    image: 'https://static2.gensler.com/uploads/image/78123/01_Delta_LGA_508x508_1665175427.jpg',
    stats: [
      { number: '100+', label: 'Projects Delivered' },
      { number: '10+', label: 'Jurisdictions' },
      { number: '10+', label: 'Site Types' },
    ],
    subServices: ['Site planning', 'Stormwater', 'Utilities coordination', 'Roadway + access', 'Permitting support'],
    featured: true,
  },
  {
    id: 'mep-design',
    title: 'MEP Design',
    shortDesc: 'Systems that power comfort + efficiency',
    fullDesc:
      'We design MEP systems that improve comfort, reduce operational cost, and integrate cleanly with architecture and structure.',
    image: 'https://static2.gensler.com/uploads/image/77517/project-TK-elevator-americas-complex-2022-508x508_1661385088.jpg',
    stats: [
      { number: '100+', label: 'Projects Supported' },
      { number: '10+', label: 'Building Types' },
      { number: '10+', label: 'System Options' },
    ],
    subServices: ['Mechanical', 'Electrical', 'Plumbing', 'Energy strategy', 'Commissioning coordination'],
    featured: true,
  },
  {
    id: 'project-management',
    title: 'Project Management',
    shortDesc: 'Clear delivery from concept to closeout',
    fullDesc:
      'We provide disciplined project management that aligns scope, schedule, and budget—keeping teams coordinated and decisions documented.',
    image: 'https://static2.gensler.com/uploads/image/103625/1764105600513/project-chicago-fire-fc-508x508-2.jpg',
    stats: [
      { number: '100+', label: 'Projects Managed' },
      { number: '10+', label: 'Markets' },
      { number: '10+', label: 'Delivery Methods' },
    ],
    subServices: ['Project controls', 'Schedule + risk', 'Stakeholder alignment', 'Procurement support', 'Closeout'],
    featured: true,
  },
];

// Featured work (pulled from the project catalog)
const caseStudies = projectsCatalog
  .filter((p) => p.featured)
  .slice(0, 3)
  .map((p) => ({
    title: p.title,
    category: String(p.category || '').replace(/-/g, ' '),
    image: p.image,
    imageAlt: p.imageAlt || p.title,
    link: `/projects/${p.slug || p.id}`,
  }));

export default function ServicesPage() {
  const [activeExpertise, setActiveExpertise] = useState(null);
  const introRef = useRef(null);
  const isIntroInView = useInView(introRef, { once: true, amount: 0.3 });

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

  return (
    <div className="services-page">
      <PageHero 
        title="Expertise"
        subtitle="We design change. For people. For places. For the planet."
        backgroundImage="/images/hero-bg.jpg"
      />
      
      {/* Introduction */}
      <section className="services-intro" ref={introRef}>
        <div className="container">
          <motion.div 
            className="intro-grid"
            initial={{ opacity: 0 }}
            animate={isIntroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="intro-main">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Integrated Design Excellence
              </motion.h2>
              <motion.p
                className="intro-lead"
                initial={{ opacity: 0, y: 30 }}
                animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Our multidisciplinary team brings together expertise across architecture, 
                interior design, planning, and consulting to deliver holistic solutions 
                that exceed expectations.
              </motion.p>
            </div>
            <div className="intro-stats">
              <motion.div 
                className="stat-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isIntroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="stat-number">100+</span>
                <span className="stat-label">Projects Delivered</span>
              </motion.div>
              <motion.div 
                className="stat-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isIntroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="stat-number">10+</span>
                <span className="stat-label">Countries</span>
              </motion.div>
              <motion.div 
                className="stat-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isIntroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span className="stat-number">10+</span>
                <span className="stat-label">Design Awards</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Expertise */}
      <section className="expertise-featured">
        <div className="container">
          <motion.h3
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Core Expertise
          </motion.h3>
          
          <motion.div 
            className="featured-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {expertiseAreas.filter(e => e.featured).map((area) => (
              <motion.article 
                key={area.id}
                className="expertise-card featured"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <Link to={`/services/${area.id}`}>
                  <div className="card-image">
                    <img src={area.image} alt={area.title} />
                    <div className="card-overlay">
                      <div className="overlay-content">
                        <h4>{area.title}</h4>
                        <p>{area.shortDesc}</p>
                        <span className="explore-link">
                          Explore
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12 5 19 12 12 19"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="card-content">
                    <h4>{area.title}</h4>
                    <p>{area.shortDesc}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* All Expertise Areas */}
      <section className="expertise-all">
        <div className="container">
          <motion.h3
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            All Services
          </motion.h3>
          
          <div className="expertise-list">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={area.id}
                className={`expertise-item ${activeExpertise === area.id ? 'active' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <button
                  className="expertise-header"
                  onClick={() => setActiveExpertise(activeExpertise === area.id ? null : area.id)}
                >
                  <div className="expertise-header-left">
                    <span className="expertise-number">{String(index + 1).padStart(2, '0')}</span>
                    <h4>{area.title}</h4>
                  </div>
                  <div className="expertise-header-right">
                    <span className="expertise-short">{area.shortDesc}</span>
                    <motion.span 
                      className="toggle-icon"
                      animate={{ rotate: activeExpertise === area.id ? 45 : 0 }}
                    >
                      +
                    </motion.span>
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeExpertise === area.id && (
                    <motion.div
                      className="expertise-details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="details-grid">
                        <div className="details-image">
                          <img src={area.image} alt={area.title} />
                        </div>
                        <div className="details-content">
                          <p className="details-desc">{area.fullDesc}</p>
                          <div className="details-stats">
                            {area.stats.map((stat, i) => (
                              <div key={i} className="detail-stat">
                                <span className="stat-num">{stat.number}</span>
                                <span className="stat-lbl">{stat.label}</span>
                              </div>
                            ))}
                          </div>
                          <div className="details-services">
                            <h5>Related Services</h5>
                            <ul>
                              {area.subServices.map((service, i) => (
                                <li key={i}>{service}</li>
                              ))}
                            </ul>
                          </div>
                          <Link to={`/services/${area.id}`} className="details-link">
                            Learn More About {area.title}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="5" y1="12" x2="19" y2="12"/>
                              <polyline points="12 5 19 12 12 19"/>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="expertise-cases">
        <div className="container">
          <motion.div 
            className="cases-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="section-title">Featured Work</h3>
            <Link to="/projects" className="view-all-link">
              View All Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </motion.div>
          
          <motion.div 
            className="cases-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {caseStudies.map((study, index) => (
              <motion.article 
                key={index}
                className="case-card"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <Link to={study.link}>
                  <div className="case-image">
                    <img src={study.image} alt={study.imageAlt || study.title} />
                  </div>
                  <div className="case-content">
                    <span className="case-category">{study.category}</span>
                    <h4>{study.title}</h4>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="expertise-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Start Your Project?</h2>
            <p>Let's discuss how our expertise can help bring your vision to life.</p>
            <Link to="/contact" className="cta-button">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
