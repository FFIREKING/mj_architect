import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Newsletter from '../components/Newsletter';
import './CareersPage.css';

const departments = ['All', 'Engineering', 'Design', 'Management', 'Administration'];

const jobs = [
  {
    id: 1,
    title: 'Senior Civil Engineer',
    slug: 'senior-civil-engineer',
    department: 'Engineering',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Lead complex civil engineering projects and mentor junior team members.'
  },
  {
    id: 2,
    title: 'Structural Engineer',
    slug: 'structural-engineer',
    department: 'Engineering',
    location: 'Dubai, UAE',
    type: 'Full-time',
    description: 'Design innovative structural systems for iconic buildings and infrastructure.'
  },
  {
    id: 3,
    title: 'Project Manager',
    slug: 'project-manager',
    department: 'Management',
    location: 'London, UK',
    type: 'Full-time',
    description: 'Lead diverse construction and design projects from inception to completion.'
  },
  {
    id: 4,
    title: 'Architectural Designer',
    slug: 'architectural-designer',
    department: 'Design',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Work on innovative architectural projects that shape the urban landscape.'
  },
  {
    id: 5,
    title: 'Interior Designer',
    slug: 'interior-designer',
    department: 'Design',
    location: 'Singapore',
    type: 'Full-time',
    description: 'Create inspiring interior environments for commercial and residential projects.'
  },
  {
    id: 6,
    title: 'Administrative Coordinator',
    slug: 'administrative-coordinator',
    department: 'Administration',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Support our team with administrative coordination and office management.'
  }
];

const benefits = [
  { title: 'Health Insurance', description: 'Comprehensive medical, dental, and vision coverage' },
  { title: 'Retirement Plan', description: '401(k) with company matching' },
  { title: 'Professional Development', description: 'Training and certification support' },
  { title: 'Work-Life Balance', description: 'Flexible scheduling and remote options' },
  { title: 'Paid Time Off', description: 'Generous vacation and holiday policy' },
  { title: 'Team Events', description: 'Regular team building and social activities' }
];

export default function CareersPage() {
  const [activeDepartment, setActiveDepartment] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const filteredJobs = activeDepartment === 'All'
    ? jobs
    : jobs.filter(j => j.department === activeDepartment);

  return (
    <div className="careers-page">
      <PageHero 
        title="Join Our Team"
        subtitle="Build your career with a team dedicated to architectural excellence"
        backgroundImage="/images/gensler-office.jpg"
      />

      {/* Intro Section */}
      <section className="careers-intro" ref={ref}>
        <div className="container">
          <motion.div 
            className="intro-content"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>Shape the Future of Architecture</h2>
            <p>
              We're always looking for talented individuals who share our passion for 
              innovation and excellence. Join us and be part of projects that make a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="careers-benefits">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Work With Us
          </motion.h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="benefit-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="job-listings">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Open Positions
          </motion.h2>

          <motion.div 
            className="filter-tabs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {departments.map((dept) => (
              <button
                key={dept}
                className={`filter-tab ${activeDepartment === dept ? 'active' : ''}`}
                onClick={() => setActiveDepartment(dept)}
              >
                {dept}
              </button>
            ))}
          </motion.div>

          <div className="jobs-list">
            {filteredJobs.map((job, index) => (
              <motion.article
                key={job.id}
                className="job-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ x: 8 }}
              >
                <div className="job-info">
                  <h3>{job.title}</h3>
                  <p>{job.description}</p>
                  <div className="job-meta">
                    <span className="job-department">{job.department}</span>
                    <span className="job-location">{job.location}</span>
                    <span className="job-type">{job.type}</span>
                  </div>
                </div>
                <Link to={`/careers/apply/${job.slug}`} className="apply-btn">
                  Apply Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}

