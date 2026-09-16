'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Reveal from './Reveal';
import works from '@/lib/works.json';
import { asset } from '@/lib/base';

// Filter on `tag`, not `brand`: the non-fintech pieces each have their own
// client name but belong together under one chip.
const TAGS = ['All', ...Array.from(new Set(works.map((w) => w.tag)))];

function Card({ work, onOpen }) {
  const vid = useRef(null);
  const [playing, setPlaying] = useState(false);

  const enter = () => {
    const v = vid.current;
    if (!v) return;
    v.currentTime = 0;
    const p = v.play();
    if (p) p.then(() => setPlaying(true)).catch(() => {});
    else setPlaying(true);
  };

  const leave = () => {
    const v = vid.current;
    setPlaying(false);
    if (v) v.pause();
  };

  return (
    <article
      className={`card ${playing ? 'playing' : ''}`}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={() => onOpen(work)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(work);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Play ${work.brand} — ${work.title}`}
    >
      <img src={asset(`/media/posters/${work.slug}.jpg`)} alt="" loading="lazy" decoding="async" />
      <video ref={vid} src={asset(`/media/previews/${work.slug}.mp4`)} muted loop playsInline preload="none" />
      <div className="card-shade" />
      <div className="card-play">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 4.5v15l13-7.5z" />
        </svg>
      </div>
      <div className="card-body">
        <div className="card-brand">{work.brand}</div>
        <h3 className="card-title">{work.title}</h3>
        <div className="card-fmt">{work.fmt}</div>
      </div>
    </article>
  );
}

function Lightbox({ list, index, setIndex, onClose }) {
  const work = list[index];

  const go = useCallback(
    (d) => setIndex((i) => (i + d + list.length) % list.length),
    [list.length, setIndex]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [go, onClose]);

  if (!work || typeof document === 'undefined') return null;

  // Portalled to <body>: the #work section creates its own stacking context,
  // which would otherwise trap the overlay underneath the fixed nav.
  return createPortal(
    <div className="lb" onClick={onClose} role="dialog" aria-modal="true" aria-label={work.title}>
      <button className="icon-btn lb-x" onClick={onClose} aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div className="lb-box" onClick={(e) => e.stopPropagation()}>
        <div className={`lb-video ar-${(work.ar || '9:16').replace(':', '-')}`}>
          <video
            key={work.slug}
            src={asset(`/media/ads/${work.slug}.mp4`)}
            poster={asset(`/media/posters/${work.slug}.jpg`)}
            controls
            autoPlay
            playsInline
          />
        </div>

        <div className="lb-meta">
          <span className="kicker">{work.brand}</span>
          <h3>{work.title}</h3>
          <p>{work.hook}</p>

          <dl className="lb-facts">
            <div className="lb-fact">
              <dt>Product</dt>
              <dd>{work.brand}</dd>
            </div>
            <div className="lb-fact">
              <dt>Placement</dt>
              <dd>{work.fmt}</dd>
            </div>
            <div className="lb-fact">
              <dt>Role</dt>
              <dd>{work.role || 'Script · Edit · Sound · Grade'}</dd>
            </div>
          </dl>

          <div className="lb-nav">
            <button className="btn btn-ghost" onClick={() => go(-1)}>
              ← Prev
            </button>
            <button className="btn btn-ghost" onClick={() => go(1)}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Work() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const list = useMemo(
    () => (filter === 'All' ? works : works.filter((w) => w.tag === filter)),
    [filter]
  );

  const openWork = (w) => {
    setIndex(list.findIndex((x) => x.slug === w.slug));
    setOpen(true);
  };

  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head">
          <Reveal>
            <span className="kicker">Selected work</span>
            <h2 className="title">
              Best performing
              <br />
              ad creatives
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="lede">
              Hook-first films built for the feed, plus the brand and long-form work that came
              before. Every one is a finished master — concept, script, edit, sound and grade.
            </p>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <div className="filters" style={{ marginBottom: 28 }}>
            {TAGS.map((b) => (
              <button
                key={b}
                className={`chip ${filter === b ? 'on' : ''}`}
                onClick={() => setFilter(b)}
              >
                {b}
                {b !== 'All' && (
                  <span style={{ opacity: 0.55, marginLeft: 6 }}>
                    {works.filter((w) => w.tag === b).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid">
          {list.map((w, i) => (
            <Reveal key={w.slug} delay={Math.min(i, 7) * 55}>
              <Card work={w} onOpen={openWork} />
            </Reveal>
          ))}
        </div>
      </div>

      {open && (
        <Lightbox list={list} index={index} setIndex={setIndex} onClose={() => setOpen(false)} />
      )}
    </section>
  );
}
