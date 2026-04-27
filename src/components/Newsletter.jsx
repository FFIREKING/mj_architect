import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Newsletter.css';

export default function Newsletter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [email, setEmail] = useState('');

  return (
    <section className="newsletter" ref={ref}>
      <div className="newsletter-bg">
        <div className="newsletter-gradient"></div>
        <div className="newsletter-pattern"></div>
      </div>
      
      <div className="newsletter-container">
        <motion.div
          className="newsletter-grid"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="newsletter-copy">
            <motion.h2 
              className="newsletter-title"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Stay updated with our latest work.
            </motion.h2>
            
            <motion.p 
              className="newsletter-description"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Project launches, residential and commercial insights, and occasional studio news—sent thoughtfully, not frequently.
            </motion.p>
          </div>

          <div className="newsletter-actions">
            <motion.form 
              className="newsletter-form"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="email-input"
                />
                <motion.button 
                  type="submit" 
                  className="submit-btn"
                >
                  Subscribe
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </motion.button>
              </div>
            </motion.form>
            
            <motion.p 
              className="newsletter-privacy"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              By subscribing, you agree to our <a href="#">Privacy Policy</a>.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

