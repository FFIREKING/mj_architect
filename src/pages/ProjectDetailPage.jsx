import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import { getProjectFromCatalog } from '../data/projectsCatalog';
import './ProjectDetailPage.css';

function ProjectSlideshow({ images, title }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [title]);

  const safeImages = images?.filter(Boolean) || [];
  if (safeImages.length === 0) return null;

  const current = safeImages[index];

  const prev = () => setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
  const next = () => setIndex((i) => (i + 1) % safeImages.length);

  return (
    <section className="project-slideshow" aria-label="Project images">
      <div className="slideshow-frame">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={current.src}
            className="slideshow-image"
            src={current.src}
            alt={current.alt || `${title} image`}
            loading="lazy"
            initial={{ opacity: 0.0 }}
            animate={{ opacity: 1.0 }}
            exit={{ opacity: 0.0 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>

        {safeImages.length > 1 && (
          <>
            <button type="button" className="slideshow-nav prev" onClick={prev} aria-label="Previous image">
              ‹
            </button>
            <button type="button" className="slideshow-nav next" onClick={next} aria-label="Next image">
              ›
            </button>

            <div className="slideshow-count" aria-hidden="true">
              {index + 1}/{safeImages.length}
            </div>
          </>
        )}
      </div>

      {safeImages.length > 1 && (
        <div className="slideshow-dots" aria-label="Choose an image">
          {safeImages.map((img, i) => (
            <button
              key={img.src}
              type="button"
              className={`slideshow-dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const catalogProject = getProjectFromCatalog(slug);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return;

    const update = () => setPrefersReducedMotion(media.matches);
    update();

    if (media.addEventListener) media.addEventListener('change', update);
    else media.addListener(update);

    return () => {
      if (media.removeEventListener) media.removeEventListener('change', update);
      else media.removeListener(update);
    };
  }, []);

  const categoryLabel = (value) =>
    String(value || '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (m) => m.toUpperCase());

  const project = catalogProject;

  if (!project) {
    return (
      <div className="project-detail">
        <PageHero 
          title="Project Not Found"
          subtitle="The project you're looking for doesn't exist"
        />
        <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <Link to="/projects" className="back-link">← Back to Projects</Link>
        </div>
      </div>
    );
  }

  const heroPoster = project.heroPoster || project.image;
  const heroVideo = project.heroVideo;

  const gallery = (project.gallery || []).map((img) => (typeof img === 'string' ? { src: img, alt: '' } : img));
  const highlights = project.highlights || [];
  const quote = project.quote;

  return (
    <div className="project-detail">
      <header className="project-hero">
        <div className="project-hero-media" aria-hidden="true">
          {heroVideo && !prefersReducedMotion ? (
            <video
              className="project-hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={heroPoster}
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          ) : (
            <img className="project-hero-image" src={heroPoster} alt={project.imageAlt || project.title} />
          )}
          <div className="project-hero-overlay" />
        </div>

        <div className="project-hero-content container">
          <Link to="/projects" className="project-hero-back">
            ← Back to Projects
          </Link>
          <h1 className="project-hero-title">{project.title}</h1>
          <div className="project-hero-location">{project.location}</div>
        </div>
      </header>

      <article className="project-content">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="project-intro">
              <div className="project-kicker">
                <span className="project-kicker-pill">{categoryLabel(project.category)}</span>
                <span className="project-kicker-sep" aria-hidden="true">
                  •
                </span>
                <span className="project-kicker-pill">{project.region?.replace(/-/g, ' ')}</span>
              </div>

              <p className="project-lede">{project.description}</p>
            </div>

            {highlights.length ? (
              <section className="project-highlights">
                <h2 className="section-title">Highlights</h2>
                <ul className="highlights-list">
                  {highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            <ProjectSlideshow images={gallery} title={project.title} />

            {quote?.text ? (
              <section className="project-quote" aria-label="Project quote">
                <blockquote>
                  <p>“{quote.text}”</p>
                  {quote.author ? <footer>—{quote.author}</footer> : null}
                </blockquote>
              </section>
            ) : null}

            {/* Footer */}
            <div className="project-footer">
              <Link to="/projects" className="back-link">
                ← Back to All Projects
              </Link>
              <Link to="/contact" className="contact-link">
                Start Your Project →
              </Link>
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
}

