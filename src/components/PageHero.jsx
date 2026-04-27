import { motion } from 'framer-motion';
import './PageHero.css';

export default function PageHero({ title, subtitle, backgroundImage, backgroundAlt }) {
  return (
    <section className="page-hero">
      <div className="page-hero-bg">
        {backgroundImage && (
          <motion.img 
            src={backgroundImage} 
            alt={backgroundAlt || title}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
        <div className="page-hero-overlay"></div>
      </div>
      <div className="page-hero-content">
        {title ? (
          <motion.h1 
            className="page-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title}
          </motion.h1>
        ) : null}
        {subtitle && (
          <motion.p 
            className="page-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}

