import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import HorizontalScroller from './HorizontalScroller';
import './Hero.css';

// Hero slides showcasing ARDENT's architectural excellence
const heroSlides = [
  {
    type: 'video',
    video: 'https://data.openasset.com/3f741c2e/39e593b318acb731a47008efdb7d8b37/F_251125_burlingame_design_forecast_hero_mp4/F_251125_burlingame_design_forecast_hero_videolarge.mp4',
    poster: 'https://static2.gensler.com/uploads/image/103619/1764096961680/df26-burlingame-video-2000x1125.jpg',
    category: 'COMMERCIAL ARCHITECTURE',
    titleWords: ['REDEFINING', 'MODERN', 'SKYLINES'],
    subtitle: 'Architectural Excellence',
    description: 'Creating iconic structures that shape the future of urban living and commercial spaces.',
    link: '/projects',
    location: 'Downtown Business District',
  },
  {
    type: 'video',
    video: 'https://data.openasset.com/3f741c2e/971bf3c36b6f794a6d209af2b8a01d1a/F_251118_pittsburgh_airport_web_edit_new.mp4',
    poster: 'https://static1.gensler.com/uploads/image/103325/1763409912128/project-pittsburgh-airport-still-2000x1125.jpg',
    category: 'SUSTAINABLE DESIGN',
    titleWords: ['GREEN', 'BUILDING', 'INNOVATION'],
    subtitle: 'Eco-Conscious Architecture',
    description: 'Pioneering sustainable design solutions that harmonize with the environment.',
    link: '/insights',
    location: 'LEED Platinum Projects',
  },
  {
    type: 'video',
    video: 'https://data.openasset.com/3f741c2e/021dbbaf3cbf13fc044f82416ffa7da9/F_250519_gensler_city_pulse_2025_hero_mp4/F_250519_gensler_city_pulse_2025_hero_videolarge.mp4',
    poster: 'https://static2.gensler.com/uploads/image/97953/citypulse20250-vid-2000x1125_1747668071.jpg',
    category: 'URBAN PLANNING',
    titleWords: ['SHAPING', 'CITY', 'FUTURES'],
    subtitle: 'Strategic Urban Design',
    description: 'Transforming urban landscapes into thriving, livable communities for generations.',
    link: '/about',
    location: 'Metropolitan Masterplans',
  },
];

// Top blogs for right sidebar
const topBlogs = [
  {
    title: 'Seattle’s Office-to-Residential Future: How Policy and Design Will Transform Downtown',
    image: 'https://static1.gensler.com/uploads/image/103937/1765905846632/Pearl_House_N69_1024.jpg',
    imageAlt: 'A person walking in a room.',
    link: '/insights/seattles-office-to-residential-future',
  },
  {
    title: 'Trends to Watch: What’s Next for Airports and Aviation',
    image: 'https://static1.gensler.com/uploads/image/103838/1764977164653/PIT_N19_1024.jpg',
    imageAlt: 'People walking in a large building.',
    link: '/insights/trends-to-watch-airports-and-aviation',
  },
];

// Featured articles below hero - Now expanded to showcase ARDENT's expertise
const articles = [
  {
    image: '/images/meta-trends.jpg',
    category: 'Design Trends',
    title: 'The Future of Sustainable Architecture in 2026',
    description: 'Exploring innovative approaches to eco-friendly building design, from passive cooling systems to renewable materials that are reshaping modern architecture.',
    link: '/insights/sustainable-architecture',
  },
  {
    image: '/images/workplace-trends.jpg',
    category: 'Case Study',
    title: 'Transforming Urban Spaces: Mixed-Use Development',
    description: 'How integrated planning and community-focused design created vibrant urban centers that blend residential, commercial, and recreational spaces seamlessly.',
    link: '/insights/urban-transformation',
  },
  {
    image: '/images/healthcare.jpg',
    category: 'Innovation',
    title: 'Smart Buildings: IoT Integration in Modern Design',
    description: 'Leveraging cutting-edge technology to create intelligent spaces that adapt to occupant needs while optimizing energy efficiency and comfort.',
    link: '/insights/smart-buildings',
  },
];


export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const intervalRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return;

    const update = () => setPrefersReducedMotion(media.matches);
    update();

    // Safari < 14 fallback
    if (media.addEventListener) media.addEventListener('change', update);
    else media.addListener(update);

    return () => {
      if (media.removeEventListener) media.removeEventListener('change', update);
      else media.removeListener(update);
    };
  }, []);

  const startAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 10000); // Change slide every 10 seconds
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    startAutoPlay(); // Reset autoplay timer
  };

  const slide = heroSlides[currentSlide];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="hero" ref={ref}>
      <div className="hero-carousel">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={currentSlide}
            className="carousel-slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: 'easeInOut' }}
          >
            <div className="slide-media">
              {slide.type === 'video' && slide.video && !prefersReducedMotion ? (
                <video
                  className="slide-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={slide.poster}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              ) : (
                <img
                  className="slide-image"
                  src={slide.poster}
                  alt={slide.titleWords?.join(' ') || 'Hero media'}
                />
              )}
              <div className="slide-overlay"></div>
            </div>

            <div className="slide-content">
              <motion.div
                className="slide-title-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {slide.titleWords.map((word) => (
                  <motion.div key={word} className="slide-title-word" variants={itemVariants}>
                    {word}
                  </motion.div>
                ))}
              </motion.div>
              <motion.button
                className="slide-explore-btn"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.55 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={slide.link}>Explore</Link>
              </motion.button>
            </div>

            {slide.location && (
              <motion.div
                className="slide-location"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.55 }}
              >
                <Link to={slide.link}>{slide.location}</Link>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="carousel-controls">
          <div className="carousel-dots">
            {heroSlides.map((_, index) => (
              <motion.button
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span className="dot-fill" aria-hidden="true" />
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          className="trending-topics-panel"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <h4 className="panel-title">TOP BLOGS</h4>
          <ul className="panel-list">
            {topBlogs.map((topic, index) => (
              <motion.li
                key={index}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ x: 5 }}
              >
                <Link to={topic.link}>
                  <div className="topic-image-container">
                    <img src={topic.image} alt={topic.imageAlt || topic.title} />
                  </div>
                  <span>{topic.title}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="articles-section"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="container">
          <HorizontalScroller label="Latest blogs" itemSelector="[data-hscroll-item]">
            {articles.map((article, index) => (
              <motion.article
                key={index}
                className="article-card article-card--hscroll"
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260 }}
                data-hscroll-item
              >
                <Link to={article.link}>
                  <div className="article-image">
                    <motion.img
                      src={article.image}
                      alt={article.title}
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="article-overlay"></div>
                  </div>
                  <div className="article-content">
                    <span className="article-category">{article.category}</span>
                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-description">{article.description}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </HorizontalScroller>

          <motion.div
            className="view-all-buttons"
            variants={itemVariants}
          >
            <Link to="/insights" className="view-all-btn">VIEW ALL BLOGS</Link>
            <Link to="/projects" className="view-all-btn">VIEW FEATURED PROJECTS</Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
