'use client';

import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setSeen(true);
      cleanup();
    };

    // Rect check — covers fast/programmatic scrolls and #anchor jumps, where
    // IntersectionObserver can miss an element that enters and leaves between frames.
    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.top < (window.innerHeight || 0) - 60 && r.bottom > 0;
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        // Reveal anything at or above the fold, including content already scrolled past.
        if (inView() || el.getBoundingClientRect().bottom <= 0) show();
      });
    };

    let io;
    const cleanup = () => {
      if (io) io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };

    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) show();
        },
        { threshold: 0, rootMargin: '0px 0px -60px 0px' }
      );
      io.observe(el);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return cleanup;
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? 'in' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
