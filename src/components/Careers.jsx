import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import './Careers.css';

export default function Careers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section className="careers" ref={ref}>
      <div className="careers-image-container">
        <motion.div 
          className="careers-image"
          style={{ scale: imageScale }}
        >
          <img src="/images/gensler-office.jpg" alt="Office Interior" />
          <div className="careers-overlay"></div>
        </motion.div>
      </div>
      
      <motion.div 
        className="careers-content"
        style={{ y: contentY }}
      >
        <motion.div 
          className="careers-card"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span 
            className="careers-label"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Join Our Team
          </motion.span>
          
          <motion.h2 
            className="careers-title"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Shape the Future of Architecture
          </motion.h2>
          
          <motion.p 
            className="careers-description"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            We believe that architecture has the power to transform lives and 
            communities. Join our team of dedicated professionals 
            and be part of projects that make a lasting difference.
          </motion.p>
          
          <motion.div 
            className="careers-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Team Members</span>
            </div>
            <div className="stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </motion.div>
          
          <motion.a 
            href="#" 
            className="careers-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Careers
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

