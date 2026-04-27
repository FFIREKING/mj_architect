import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Mission.css';

export default function Mission() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const words = "Building Tomorrow's World Through Architectural Excellence".split(' ');

  return (
    <section className="mission" ref={ref}>
      <div className="mission-container">
        <motion.h2 
          className="mission-title"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              className="mission-word"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>
        
        <motion.div 
          className="mission-decoration"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        
        <motion.p
          className="mission-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          We are a U.S.-based architecture firm delivering residential and commercial projects—from multi-family and mixed-use to workplace and hospitality. Our culture is collaborative and detail-driven, pairing design excellence with technical rigor to move projects from concept through delivery.
        </motion.p>
      </div>
    </section>
  );
}

