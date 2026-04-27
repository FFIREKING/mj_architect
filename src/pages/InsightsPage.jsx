import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import './InsightsPage.css';

// Categories for filtering
const categories = [
  { id: 'all', label: 'All Blogs' },
  { id: 'trends', label: 'Trends to Watch' },
  { id: 'workplace', label: 'Workplace' },
  { id: 'sports', label: 'Sports' },
  { id: 'aviation', label: 'Airports + Aviation' },
  { id: 'technology', label: 'Technology' },
  { id: 'community', label: 'Community' }
];

// Featured article
const featuredArticle = {
  id: 'seattles-office-to-residential-future',
  title: 'Seattle’s Office-to-Residential Future: How Policy and Design Will Transform Downtown',
  excerpt:
    'A combination of code changes, design expertise, and market conditions is proving that now is the time to start planning new housing in Downtown Seattle.',
  category: 'trends',
  author: 'JP Emery and Bruce Kinnan',
  image: 'https://static1.gensler.com/uploads/image/103937/1765905846632/Pearl_House_N69_1024.jpg',
  imageAlt: 'A person walking in a room.',
  link: '/insights/seattles-office-to-residential-future',
  featured: true
};

const categoryLabel = (id) => categories.find((c) => c.id === id)?.label || 'Blog';

// All articles
const articles = [
  {
    id: 'trends-to-watch-airports-and-aviation',
    title: 'Trends to Watch: What’s Next for Airports and Aviation',
    excerpt:
      "Ardent's Aviation leaders take a closer look at the trends shaping the future of travel, and what’s next for the industry.",
    category: 'aviation',
    author: 'William Jenkinson, Charles G. Morley, and Tim Sullivan',
    image: 'https://static1.gensler.com/uploads/image/103838/1764977164653/PIT_N19_1024.jpg',
    imageAlt: 'People walking in a large building.',
    link: '/insights/trends-to-watch-airports-and-aviation',
  },
  {
    id: 'trends-to-watch-sports',
    title: 'Trends to Watch Shaping the Future of Sports',
    excerpt:
      'Ardent’s Sports leaders explore the design trends redefining the next era of sports design, from fan-first districts to athlete-driven spaces.',
    category: 'sports',
    image: 'https://static2.gensler.com/uploads/image/103848/1765228455459/Al-Ahly-Stadium_aerial_1024.jpg',
    imageAlt: 'A large crowd of people at a beach.',
    link: '/insights/trends-to-watch-sports',
  },
  {
    id: 'workplace-trends-2026',
    title: '10 Workplace Trends for 2026: What’s In and What’s Out?',
    excerpt: 'This is the year of bold moves, human-first thinking, and AI that doesn’t just answer questions but joins the team.',
    category: 'workplace',
    author: 'Janet Pogue McLaurin and Louis Schump',
    image: 'https://static1.gensler.com/uploads/image/103815/1764884329663/BioMed_Realty_1024x576.jpg',
    imageAlt: 'A group of people in a room.',
    link: '/insights/workplace-trends-2026',
  },
  {
    id: 'design-can-advance-diverse-nonprofit-missions',
    title: 'How Design Can Advance Diverse Nonprofit Missions',
    excerpt:
      'Nonprofits can use architecture and design strategies in campus development to amplify their mission impact and operational excellence',
    category: 'community',
    author: 'Jay Chokshi',
    image: 'https://static1.gensler.com/uploads/image/103658/1764197201241/Covenant-House-Texas_Gay_15_1024.jpg',
    imageAlt: 'A courtyard with a brick walkway and a building with a tree and people.',
    link: '/insights/design-can-advance-diverse-nonprofit-missions',
  },
  {
    id: 'nokia-new-r-and-d-campus-canada-tech-ecosystem',
    title: 'How Nokia’s New R&D Campus Raises the Bar for Canada’s Tech Ecosystem',
    excerpt: 'The company’s new space in Ottawa replaces the traditional workplace model with one centered on employee experience.',
    category: 'technology',
    author: 'Kevin Katigbak and Sarah Taylor',
    image: 'https://static2.gensler.com/uploads/image/103758/1764713397397/NOIC-StreetLevel-1024px.jpg',
    imageAlt: 'A building with a parking lot.',
    link: '/insights/nokia-new-r-and-d-campus-canada-tech-ecosystem',
  },
  {
    id: 'trends-to-watch-global-events-build-magnetic-place-brands',
    title: 'Trends to Watch: How Global Events Build Magnetic Place Brands',
    excerpt:
      'From the Super Bowl to the FIFA World Cup, marquee events transform urban environments into platforms that amplify civic pride and create lasting impact.',
    category: 'trends',
    author: 'Amy Bixler and Janice Cavaliere',
    image: 'https://static2.gensler.com/uploads/image/103527/1763768035376/Seattle_Mariners_N6_1024.jpg',
    imageAlt: 'People crossing a street.',
    link: '/insights/trends-to-watch-global-events-build-magnetic-place-brands',
  },
  {
    id: 'transforming-pier-94',
    title: 'Transforming Pier 94: A Collaborative Journey in Sustainable Design and Adaptive Reuse',
    excerpt:
      'Pier 94 on Manhattan’s Hudson River waterfront will soon be home to New York City’s first purpose-built, state-of-the-art film and television production facility: Sunset Pier 94 Studios.',
    category: 'community',
    author: 'Keith Hanadel in conversation with Leslie Jabs, Stephen Newbold, and John Wiedner',
    image: 'https://static2.gensler.com/uploads/image/98947/Sunset-Pier-94_HERO-1024px_1752536098.jpg',
    imageAlt: 'A building with a sign on it.',
    link: '/insights/transforming-pier-94',
  },
];

// Newsletter signup topics
const newsletterTopics = [
  'Design Trends',
  'Sustainability',
  'Workplace Strategy',
  'Urban Planning',
  'Technology & Innovation'
];

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleArticles, setVisibleArticles] = useState(9);
  const introRef = useRef(null);
  const isIntroInView = useInView(introRef, { once: true, amount: 0.3 });

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

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

  const loadMore = () => {
    setVisibleArticles(prev => prev + 6);
  };

  return (
    <div className="insights-page">
      <PageHero 
        title="Insights"
        subtitle="Stories, trends, and ideas shaping the future of design"
        backgroundImage="/images/meta-trends.jpg"
      />
      
      {/* Featured Article */}
      <section className="insights-featured" ref={introRef}>
        <div className="container">
          <motion.article 
            className="featured-article"
            initial={{ opacity: 0, y: 40 }}
            animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Link to={featuredArticle.link}>
              <div className="featured-image">
                <img src={featuredArticle.image} alt={featuredArticle.imageAlt || featuredArticle.title} />
                <div className="featured-overlay">
                  <span className="featured-badge">Featured</span>
                </div>
              </div>
              <div className="featured-content">
                <div className="article-meta">
                  <span className="meta-category">{categoryLabel(featuredArticle.category)}</span>
                </div>
                <h2>{featuredArticle.title}</h2>
                <p>{featuredArticle.excerpt}</p>
                {featuredArticle.author && (
                  <div className="article-author">
                    <span>By {featuredArticle.author}</span>
                  </div>
                )}
                <span className="read-more">
                  Read Insight
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              </div>
            </Link>
          </motion.article>
        </div>
      </section>

      {/* Category Filter */}
      <section className="insights-filter">
        <div className="container">
          <div className="filter-bar">
            {categories.map(cat => (
              <motion.button
                key={cat.id}
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleArticles(9);
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="insights-grid">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              className="articles-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredArticles.slice(0, visibleArticles).map((article) => (
                <motion.article
                  key={article.id}
                  className="article-card"
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  layout
                >
                  <Link to={article.link}>
                    <div className="article-image">
                      <img src={article.image} alt={article.imageAlt || article.title} />
                      <div className="image-overlay"></div>
                    </div>
                    <div className="article-content">
                      <div className="article-meta">
                        <span className="meta-category">{categoryLabel(article.category)}</span>
                      </div>
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                      {(article.author || article.readTime) && (
                        <div className="article-footer">
                          {article.author && <span className="article-author">By {article.author}</span>}
                          {article.readTime && <span className="article-read">{article.readTime}</span>}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {visibleArticles < filteredArticles.length && (
            <motion.div 
              className="load-more"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button onClick={loadMore} className="load-more-btn">
                Load More Insights
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="insights-newsletter">
        <div className="container">
          <motion.div 
            className="newsletter-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="newsletter-text">
              <h2>Stay Informed</h2>
              <p>Subscribe to receive the latest blogs, research, and trends directly to your inbox.</p>
              <div className="newsletter-topics">
                <span className="topics-label">Topics we cover:</span>
                <div className="topics-list">
                  {newsletterTopics.map((topic, index) => (
                    <span key={index} className="topic-tag">{topic}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="newsletter-form">
              <div className="form-group">
                <input type="email" placeholder="Enter your email" />
                <button type="submit" className="submit-btn">
                  Subscribe
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
              <p className="form-disclaimer">
                By subscribing, you agree to our <Link to="/privacy">Privacy Policy</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="insights-topics">
        <div className="container">
          <motion.h3
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Explore by Topic
          </motion.h3>
          
          <div className="topics-grid">
            {categories.filter(c => c.id !== 'all').map((cat, index) => (
              <motion.button
                key={cat.id}
                className="topic-card"
                onClick={() => {
                  setActiveCategory(cat.id);
                  window.scrollTo({ top: 600, behavior: 'smooth' });
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <span className="topic-name">{cat.label}</span>
                <span className="topic-count">
                  {articles.filter(a => a.category === cat.id).length} articles
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
