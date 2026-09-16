'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { asset } from '@/lib/base';

const STATS = [
  ['127', 'Ad masters delivered'],
  ['6', 'Fintech products'],
  ['7', 'Indian languages'],
  ['4+', 'Years in the cut'],
];

function IconSound({ muted }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      {muted ? (
        <>
          <line x1="22" y1="9" x2="16" y2="15" />
          <line x1="16" y1="9" x2="22" y2="15" />
        </>
      ) : (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </>
      )}
    </svg>
  );
}

function IconPlay({ paused }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      {paused ? <path d="M7 4.5v15l13-7.5z" /> : <path d="M7 4.5h4v15H7zM13 4.5h4v15h-4z" />}
    </svg>
  );
}

export default function Hero() {
  const vid = useRef(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [pct, setPct] = useState(0);

  const toggleSound = useCallback(() => {
    const v = vid.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) v.play().catch(() => {});
  }, []);

  const togglePlay = useCallback(() => {
    const v = vid.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  }, []);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const onTime = () => v.duration && setPct((v.currentTime / v.duration) * 100);
    v.addEventListener('timeupdate', onTime);
    return () => v.removeEventListener('timeupdate', onTime);
  }, []);

  // Mobile browsers routinely refuse the initial autoplay even when muted, and
  // every browser pauses media in a backgrounded tab.
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const kick = () => {
      if (v.paused && !paused) v.play().catch(() => {});
    };
    kick();
    v.addEventListener('loadeddata', kick);
    const opts = { passive: true };
    ['pointerdown', 'touchstart', 'keydown', 'scroll'].forEach((e) =>
      window.addEventListener(e, kick, opts)
    );
    document.addEventListener('visibilitychange', kick);
    return () => {
      v.removeEventListener('loadeddata', kick);
      ['pointerdown', 'touchstart', 'keydown', 'scroll'].forEach((e) =>
        window.removeEventListener(e, kick, opts)
      );
      document.removeEventListener('visibilitychange', kick);
    };
  }, [paused]);

  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-glow b" aria-hidden="true" />

      <div className="wrap hero-top">
        <Reveal>
          <span className="kicker">Performance Video Editor · Bengaluru</span>
        </Reveal>

        <Reveal delay={70}>
          <h1>
            I cut ads that survive
            <em>the first second.</em>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="hero-sub">
            I&apos;m <b>Krishna Teja</b> — a performance video editor and ad creative
            strategist building hook-first video for <b>Meta &amp; Google</b>, from script and
            AI-generated footage through to the final graded master.
          </p>
        </Reveal>

        <Reveal delay={210}>
          <div className="hero-cta">
            <a href="#work" className="btn btn-primary">
              See the work
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="mailto:krishnateja0911@gmail.com" className="btn btn-ghost">
              krishnateja0911@gmail.com
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <div className="wrap">
          <div className="reel">
            <span className="reel-tag">
              <i />
              Showreel 2026
            </span>

            <video
              ref={vid}
              poster={asset("/media/showreel-poster.jpg")}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={asset("/media/showreel-1600.mp4")} type="video/mp4" media="(min-width: 861px)" />
              <source src={asset("/media/showreel-1024.mp4")} type="video/mp4" />
            </video>

            <div className="reel-ctl">
              <button className="icon-btn" onClick={togglePlay} aria-label={paused ? 'Play showreel' : 'Pause showreel'}>
                <IconPlay paused={paused} />
              </button>
              <button className="icon-btn" onClick={toggleSound} aria-label={muted ? 'Unmute showreel' : 'Mute showreel'}>
                <IconSound muted={muted} />
              </button>
            </div>

            <div className="reel-bar">
              <i style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="wrap">
          <div className="stats">
            {STATS.map(([n, l]) => (
              <div className="stat" key={l}>
                <b>{n}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
