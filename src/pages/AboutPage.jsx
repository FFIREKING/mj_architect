import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import './AboutPage.css';

// Practice values
const values = [
  {
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    title: 'Design Excellence',
    description: 'I pursue design excellence in every project, creating spaces that inspire, perform, and endure.'
  },
  {
    icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
    title: 'Client Partnership',
    description: 'My strength lies in close collaboration with clients, consultants, and communities.'
  },
  {
    icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    title: 'Sustainability',
    description: 'I design for a sustainable future, minimizing environmental impact while maximizing human well-being.'
  },
  {
    icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    title: 'Innovation',
    description: 'I embrace innovation, exploring new ideas, technologies, and design methods that add real value.'
  }
];

// Timeline / History
const timeline = [
  {
    year: '2012',
    title: 'Practice Founded',
    description: 'I launched my independent practice with a focus on thoughtful, people-centered architecture.'
  },
  {
    year: '2015',
    title: 'Project Portfolio Growth',
    description: 'Expanded into larger mixed-use and commercial assignments with multidisciplinary coordination.'
  },
  {
    year: '2018',
    title: 'Sustainability Focus',
    description: 'Introduced a stronger sustainability framework into concept development and technical design.'
  },
  {
    year: '2021',
    title: 'Integrated Delivery',
    description: 'Refined the workflow connecting design direction, technical documentation, and stakeholder communication.'
  },
  {
    year: '2024',
    title: 'MJ Architect Brand',
    description: 'Repositioned as MJ Architect, a principal-led studio built around clarity and quality.'
  },
  {
    year: '2026',
    title: 'Future-Ready Platform',
    description: 'Built a stronger digital foundation for long-term growth and future collaborators.'
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
  { number: '14+', label: 'Years in Practice' },
  { number: '100+', label: 'Projects Completed' },
  { number: '1', label: 'Principal Lead' },
  { number: '10+', label: 'Partner Disciplines' }
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
        backgroundImage="/images/masters-scale.jpg"
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

      {/* Story */}
      <section className="about-story" ref={storyRef}>
        <div className="container">
          <div className="story-grid">
            <motion.div 
              className="story-content"
              initial={{ opacity: 0, x: -40 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="section-label">My Story</span>
              <h2>Designing Better Outcomes Through Clear Architecture</h2>
              <p className="lead">
                MJ Architect is built around direct principal involvement from concept to completion.
              </p>
              <p>
                I work closely with clients to define project goals, align technical constraints,
                and maintain design integrity throughout delivery. The focus is always on creating
                spaces that are meaningful, buildable, and enduring.
              </p>
              <p>
                My approach combines research, collaboration, and practical execution.
                Each project balances design quality, performance, and long-term value.
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
                alt="Matthew Johnson studio"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values" ref={valuesRef}>
        <div className="container">
          <motion.div 
            className="values-header"
            initial={{ opacity: 0, y: 20 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Values</span>
            <h2>What Drives My Work</h2>
            <p>These principles shape every project from early strategy to final delivery.</p>
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
            <span className="section-label">Journey</span>
            <h2>Milestones That Shaped My Practice</h2>
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
            <p>Ready to start your next project? I&apos;d love to hear from you.</p>
            <Link to="/contact" className="cta-button">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
