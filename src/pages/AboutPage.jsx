import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import './AboutPage.css';

// Company values
const values = [
  {
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    title: 'Design Excellence',
    description: 'We pursue design excellence in everything we do, creating spaces that inspire, perform, and endure.'
  },
  {
    icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
    title: 'Collaboration',
    description: 'Our strength lies in collaboration—with each other, our clients, and the communities we serve.'
  },
  {
    icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    title: 'Sustainability',
    description: 'We design for a sustainable future, minimizing environmental impact while maximizing human well-being.'
  },
  {
    icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    title: 'Innovation',
    description: 'We embrace innovation, constantly exploring new ideas, technologies, and approaches to design.'
  }
];

// Timeline / History
const timeline = [
  {
    year: '2012',
    title: 'Founded',
    description: 'Our firm was established with a vision to transform how architecture impacts communities.'
  },
  {
    year: '2002',
    title: 'First International Project',
    description: 'Expanded our reach globally with our first international commission in Europe.'
  },
  {
    year: '2010',
    title: 'Sustainability Commitment',
    description: 'Launched our sustainability initiative, committing to carbon-neutral design by 2030.'
  },
  {
    year: '2015',
    title: '1000th Project',
    description: 'Celebrated the completion of our 1000th project across multiple continents.'
  },
  {
    year: '2020',
    title: 'Global Expansion',
    description: 'Opened new offices in Asia and the Middle East, expanding our global presence.'
  },
  {
    year: '2025',
    title: 'Design for Tomorrow',
    description: 'Continuing to innovate with AI-driven design and regenerative architecture.'
  }
];

// Awards
const awards = [
  { year: '2025', name: 'AIA Firm Award', org: 'American Institute of Architects' },
  { year: '2024', name: 'World Architecture Award', org: 'World Architecture Festival' },
  { year: '2024', name: 'Sustainability Leader', org: 'Green Building Council' },
  { year: '2023', name: 'Design Excellence', org: 'Design Museum London' },
  { year: '2023', name: 'Innovation in Architecture', org: 'Architectural Digest' },
  { year: '2022', name: 'Best Workplace Design', org: 'CoreNet Global' }
];

// Stats
const stats = [
  { number: '15+', label: 'Years of Excellence' },
  { number: '100+', label: 'Projects Completed' },
  { number: '45', label: 'Team Members' },
  { number: '10+', label: 'Countries' }
];

export default function AboutPage() {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const isStoryInView = useInView(storyRef, { once: true, amount: 0.3 });
  const isValuesInView = useInView(valuesRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll();
  useTransform(scrollYProgress, [0, 1], [0, -100]);

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
    <div className="about-page">
      <PageHero 
        title="About Matthew Johnson"
        subtitle="A principal-led architecture practice focused on clarity, quality, and long-term value."
        backgroundImage="/images/gensler-office.jpg"
      />

      {/* Stats Bar */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="about-story" ref={storyRef}>
        <div className="container">
          <div className="story-grid">
            <motion.div 
              className="story-content"
              initial={{ opacity: 0, x: -40 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="section-label">Our Story</span>
              <h2>Designing Change for People, Places, and the Planet</h2>
              <p className="lead">
                For over three decades, we have been at the forefront of architectural innovation, 
                creating spaces that transform how people live, work, and connect.
              </p>
              <p>
                Founded on the belief that design has the power to change the world, our firm has 
                grown from a small studio to a global practice with offices across five continents. 
                We bring together architects, designers, planners, and strategists who share a 
                passion for creating meaningful, sustainable, and beautiful spaces.
              </p>
              <p>
                Our approach is rooted in research, collaboration, and a deep understanding of 
                human needs. We work closely with our clients to understand their vision and 
                translate it into design solutions that exceed expectations and stand the test of time.
              </p>
            </motion.div>
            <motion.div 
              className="story-image"
              initial={{ opacity: 0, x: 40 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src="/images/gensler-office.jpg"
                alt="Our office" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="about-values" ref={valuesRef}>
        <div className="container">
          <motion.div 
            className="values-header"
            initial={{ opacity: 0, y: 20 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Our Values</span>
            <h2>What Drives Us</h2>
            <p>These core values guide everything we do and shape how we approach every project.</p>
          </motion.div>

          <motion.div 
            className="values-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isValuesInView ? "visible" : "hidden"}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <div className="value-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={value.icon} />
                  </svg>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline">
        <div className="container">
          <motion.div 
            className="timeline-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Our Journey</span>
            <h2>Milestones That Define Us</h2>
          </motion.div>

          <div className="timeline">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="timeline-marker">
                  <span className="timeline-year">{item.year}</span>
                </div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="about-awards">
        <div className="container">
          <motion.div 
            className="awards-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Recognition</span>
            <h2>Awards & Honors</h2>
          </motion.div>

          <div className="awards-list">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                className="award-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <span className="award-year">{award.year}</span>
                <div className="award-details">
                  <h4>{award.name}</h4>
                  <span className="award-org">{award.org}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Let's Create Something Extraordinary</h2>
            <p>Ready to start your next project? We'd love to hear from you.</p>
            <Link to="/contact" className="cta-button">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
