'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  ['Work', '#work'],
  ['What I do', '#capabilities'],
  ['Experience', '#experience'],
  ['About', '#about'],
];

export default function Nav() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${stuck ? 'stuck' : ''}`}>
      <div className="wrap nav-in">
        <a href="#top" className="mark">
          <i />
          Krishna Teja
        </a>
        <nav className="nav-links">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-primary">
          Hire me
        </a>
      </div>
    </header>
  );
}
