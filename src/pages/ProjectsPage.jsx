import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { projectsCatalog } from '../data/projectsCatalog';
import './ProjectsPage.css';

const projects = projectsCatalog;

export default function ProjectsPage() {
  const [visibleProjects, setVisibleProjects] = useState(12);

  const filteredProjects = projects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="projects-page">
      <PageHero 
        title={null}
        subtitle={null}
        backgroundImage="/images/hero-bg.jpg"
      />

      {/* Projects Grid */}
      <section className="projects-grid-section">
        <div className="container">
          <div className="results-count">
            Showing {Math.min(visibleProjects, filteredProjects.length)} of {filteredProjects.length} projects
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key="projects-grid"
              className="projects-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.slice(0, visibleProjects).map((project) => (
                <motion.article
                  key={project.id}
                  className="project-card"
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  layout
                >
                  <Link to={`/projects/${project.slug || project.id}`}>
                    <div className="project-image">
                      <img src={project.image} alt={project.imageAlt || project.title} />
                      {/* Default state: image + title only */}
                      <div className="project-card-title">
                        <h3 className="project-title">{project.title}</h3>
                      </div>

                      {/* Hover state: show details panel */}
                      <div className="project-hover-details">
                        <div className="project-hover-meta">
                          <span className="project-hover-location">{project.location}</span>
                        </div>

                        <p className="project-hover-desc">{project.description}</p>

                        <div className="project-hover-foot">
                          <div className="project-hover-stats">
                            {project.year && <span className="project-hover-stat">{project.year}</span>}
                            {project.size && <span className="project-hover-stat">{project.size}</span>}
                          </div>

                          <div className="project-hover-link">
                            <span>View Project</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="5" y1="12" x2="19" y2="12"/>
                              <polyline points="12 5 19 12 12 19"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="no-results">
              <p>No projects match your current filters.</p>
            </div>
          )}

          {visibleProjects < filteredProjects.length && (
            <motion.div 
              className="load-more"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button 
                onClick={() => setVisibleProjects(prev => prev + 6)} 
                className="load-more-btn"
              >
                Load More Projects
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="projects-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Have a Project in Mind?</h2>
            <p>Let's discuss how we can bring your vision to life through innovative design.</p>
            <Link to="/contact" className="cta-button">
              Start a Conversation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
