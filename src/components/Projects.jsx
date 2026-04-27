import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import HorizontalScroller from './HorizontalScroller';
import { projectsCatalog } from '../data/projectsCatalog';
import './Projects.css';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const projects = projectsCatalog.filter((p) => p.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="projects" ref={ref}>
      <div className="projects-container">
        <motion.div 
          className="projects-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="projects-section-title">Featured Projects</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <HorizontalScroller label="Featured projects" itemSelector="[data-hscroll-item]">
            {projects.map((project) => (
              <Link
                key={project.slug || project.id}
                to="/projects"
                className="project-card-link"
                data-hscroll-item
              >
                <motion.article
                  className="project-card project-card--hscroll"
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="project-image">
                    <img
                      src={project.image}
                      alt={project.imageAlt || project.title}
                    />
                    <div className="project-overlay">
                      <div className="project-meta">
                        <h3 className="project-title project-title--hover">{project.title}</h3>
                        {project.location ? (
                          <div className="project-location">{project.location}</div>
                        ) : null}
                        <p className="project-description">{project.description}</p>
                      </div>
                    </div>

                    <div className="project-card-titlebar" aria-hidden="true">
                      <h3 className="project-title project-title--default">{project.title}</h3>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </HorizontalScroller>
        </motion.div>
      </div>
    </section>
  );
}

