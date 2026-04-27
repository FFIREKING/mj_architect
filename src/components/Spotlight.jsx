import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import './Spotlight.css';

export default function Spotlight() {
  const ref = useRef(null);
  useInView(ref, { once: true, amount: 0.2 });
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

  const videoSrc =
    'https://data.openasset.com/3f741c2e/9f1359e04e9d83fcc3d3109eb6d8c8b9/019_7092_000_N43_mov/019_7092_000_N43_videolarge.mp4';
  const posterSrc =
    'https://static2.gensler.com/uploads/image/103386/1763496739432/t-rowe-price-harbor-point-2000x1125.jpg';
  const posterAlt = 'lazyload parallax-background__bg-elm';

  return (
    <section className="spotlight" ref={ref}>
      <div className="spotlight-media" aria-hidden="true">
        {!prefersReducedMotion ? (
          <video
            className="spotlight-bg-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={posterSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img className="spotlight-bg-image" src={posterSrc} alt={posterAlt} />
        )}
        <div className="spotlight-dim" />
      </div>
    </section>
  );
}

