'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { asset } from '@/lib/base';

const STATS = [
  ['1,000+', 'Ad masters delivered'],
  ['7', 'Apps shipped for'],
  ['7', 'Languages delivered'],
  ['4+', 'Years in the cut'],
];

function fmt(t) {
  if (!Number.isFinite(t) || t < 0) t = 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

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

function IconSkip({ back }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {back ? (
        <>
          <path d="M12 3.5A8.5 8.5 0 1 0 20.5 12" />
          <path d="M12 3.5 15.4 6.2 12 8.9" />
        </>
      ) : (
        <>
          <path d="M12 3.5A8.5 8.5 0 1 1 3.5 12" />
          <path d="M12 3.5 8.6 6.2 12 8.9" />
        </>
      )}
      <text x="12" y="16.2" textAnchor="middle" fontSize="9" fontWeight="700" fill="currentColor" stroke="none">
        10
      </text>
    </svg>
  );
}

export default function Hero() {
  const vid = useRef(null);
  const track = useRef(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [pct, setPct] = useState(0);
  const [now, setNow] = useState(0);
  const [dur, setDur] = useState(0);
  const scrubbing = useRef(false);

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

  const skip = useCallback((d) => {
    const v = vid.current;
    if (!v || !Number.isFinite(v.duration)) return;
    v.currentTime = Math.min(Math.max(v.currentTime + d, 0), v.duration - 0.05);
  }, []);

  // Seeking. The <video> has no native controls, so the progress line doubles as
  // the scrub track: press anywhere on it to jump, drag to scrub.
  const seekTo = useCallback((clientX) => {
    const v = vid.current;
    const el = track.current;
    if (!v || !el || !Number.isFinite(v.duration)) return;
    const r = el.getBoundingClientRect();
    const ratio = Math.min(Math.max((clientX - r.left) / r.width, 0), 1);
    v.currentTime = ratio * v.duration;
    setPct(ratio * 100);
    setNow(ratio * v.duration);
  }, []);

  const onDown = useCallback(
    (e) => {
      scrubbing.current = true;
      seekTo(e.clientX);
      // setPointerCapture throws if the id is not an active pointer, and a
      // failed capture must not cost us the seek itself.
      try {
        track.current?.setPointerCapture?.(e.pointerId);
      } catch {}
    },
    [seekTo]
  );

  const onMove = useCallback(
    (e) => {
      if (scrubbing.current) seekTo(e.clientX);
    },
    [seekTo]
  );

  const onUp = useCallback((e) => {
    scrubbing.current = false;
    try {
      track.current?.releasePointerCapture?.(e.pointerId);
    } catch {}
  }, []);

  const onTrackKey = useCallback(
    (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        skip(5);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        skip(-5);
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        togglePlay();
      }
    },
    [skip, togglePlay]
  );

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const onTime = () => {
      if (scrubbing.current) return;
      setNow(v.currentTime);
      if (v.duration) setPct((v.currentTime / v.duration) * 100);
    };
    const onMeta = () => setDur(v.duration || 0);
    const onPlay = () => setPaused(false);
    const onPause = () => setPaused(true);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onMeta);
    v.addEventListener('durationchange', onMeta);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    onMeta();
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('loadedmetadata', onMeta);
      v.removeEventListener('durationchange', onMeta);
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, []);

  // Mobile browsers routinely refuse the initial autoplay even when muted, and
  // every browser pauses media in a backgrounded tab. Only nudge it back while
  // the viewer has not deliberately paused.
  const userPaused = useRef(false);
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const kick = () => {
      if (v.paused && !userPaused.current) v.play().catch(() => {});
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
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-glow b" aria-hidden="true" />

      <div className="wrap hero-top">
        <Reveal>
          <div className="id-badge">
            <img src={asset('/media/krishna-avatar.jpg')} alt="Krishna Teja T" width={52} height={52} />
            <div>
              <b>Krishna Teja T</b>
              <span>Performance Video Editor · Bengaluru</span>
            </div>
          </div>
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
              poster={asset('/media/showreel-poster.jpg')}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onClick={togglePlay}
            >
              <source src={asset('/media/showreel-1600.mp4')} type="video/mp4" media="(min-width: 861px)" />
              <source src={asset('/media/showreel-1024.mp4')} type="video/mp4" />
            </video>

            <div className="reel-ctl">
              <button
                className="icon-btn"
                onClick={() => {
                  userPaused.current = !paused;
                  togglePlay();
                }}
                aria-label={paused ? 'Play showreel' : 'Pause showreel'}
              >
                <IconPlay paused={paused} />
              </button>
              <button className="icon-btn" onClick={() => skip(-10)} aria-label="Back 10 seconds">
                <IconSkip back />
              </button>
              <button className="icon-btn" onClick={() => skip(10)} aria-label="Forward 10 seconds">
                <IconSkip />
              </button>
              <button className="icon-btn" onClick={toggleSound} aria-label={muted ? 'Unmute showreel' : 'Mute showreel'}>
                <IconSound muted={muted} />
              </button>
              <span className="reel-time">
                {fmt(now)} <i>/</i> {fmt(dur)}
              </span>
            </div>

            <div
              className="reel-bar"
              ref={track}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              onKeyDown={onTrackKey}
              role="slider"
              tabIndex={0}
              aria-label="Seek showreel"
              aria-valuemin={0}
              aria-valuemax={Math.round(dur)}
              aria-valuenow={Math.round(now)}
              aria-valuetext={`${fmt(now)} of ${fmt(dur)}`}
            >
              <div className="reel-bar-line">
                <i style={{ width: `${pct}%` }} />
                <b style={{ left: `${pct}%` }} />
              </div>
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
