import { useEffect, useMemo, useRef, useState } from 'react';
import './HorizontalScroller.css';

export default function HorizontalScroller({
  label,
  children,
  itemSelector = '[data-hscroll-item]',
  step = 'auto',
}) {
  const viewportRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const drag = useRef({
    isDown: false,
    startX: 0,
    startScrollLeft: 0,
    pointerId: null,
  });

  const updateButtons = () => {
    const el = viewportRef.current;
    if (!el) return;

    // small tolerance to avoid jitter
    const maxLeft = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft;

    setCanPrev(left > 2);
    setCanNext(left < maxLeft - 2);
  };

  useEffect(() => {
    updateButtons();
    const el = viewportRef.current;
    if (!el) return;

    const onScroll = () => updateButtons();
    el.addEventListener('scroll', onScroll, { passive: true });

    const ro = new ResizeObserver(() => updateButtons());
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, []);

  const getStep = () => {
    const el = viewportRef.current;
    if (!el) return 0;
    if (typeof step === 'number') return step;

    // auto: scroll by one card width (first visible item)
    const item = el.querySelector(itemSelector);
    if (!item) return Math.round(el.clientWidth * 0.85);

    const style = window.getComputedStyle(el);
    const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
    return item.getBoundingClientRect().width + gap;
  };

  const scrollByAmount = (dir) => {
    const el = viewportRef.current;
    if (!el) return;
    const amount = getStep() * dir;
    el.scrollTo({ left: el.scrollLeft + amount, behavior: 'smooth' });
  };

  const onPointerDown = (e) => {
    const el = viewportRef.current;
    if (!el) return;

    drag.current.isDown = true;
    drag.current.startX = e.clientX;
    drag.current.startScrollLeft = el.scrollLeft;
    drag.current.pointerId = e.pointerId;

    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const onPointerMove = (e) => {
    const el = viewportRef.current;
    if (!el || !drag.current.isDown) return;

    const dx = e.clientX - drag.current.startX;
    el.scrollLeft = drag.current.startScrollLeft - dx;
  };

  const onPointerUp = () => {
    const el = viewportRef.current;
    if (!el) return;

    drag.current.isDown = false;

    if (drag.current.pointerId != null) {
      try {
        el.releasePointerCapture(drag.current.pointerId);
      } catch {
        // ignore
      }
    }

    drag.current.pointerId = null;
    updateButtons();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') scrollByAmount(-1);
    if (e.key === 'ArrowRight') scrollByAmount(1);
  };

  const aria = useMemo(() => {
    if (!label) return undefined;
    return { 'aria-label': label };
  }, [label]);

  return (
    <div className="hscroll" {...aria}>
      <button
        type="button"
        className="hscroll-arrow left"
        onClick={() => scrollByAmount(-1)}
        disabled={!canPrev}
        aria-label="Scroll left"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>

      <div
        className="hscroll-viewport"
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
        onKeyDown={onKeyDown}
        role="region"
        tabIndex={0}
      >
        <div className="hscroll-track">{children}</div>
      </div>

      <button
        type="button"
        className="hscroll-arrow right"
        onClick={() => scrollByAmount(1)}
        disabled={!canNext}
        aria-label="Scroll right"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </div>
  );
}
