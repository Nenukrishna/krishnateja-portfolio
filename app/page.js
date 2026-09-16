import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Work from '@/components/Work';
import Reveal from '@/components/Reveal';
import { asset } from '@/lib/base';

const MARQUEE = [
  'ScorePro',
  'AlertPay',
  'MyAutoPay',
  'Khatabook',
  'Passbook Pro',
  'Passbook Max',
  'Crafto',
  'Medicover Hospitals',
  'Movement Fitness',
  'Meta Ads',
  'Google Ads',
  'Hindi',
  'Tamil',
  'Telugu',
  'Kannada',
  'Marathi',
  'Bengali',
  'Gujarati',
];

const CAPS = [
  {
    n: '01',
    h: 'Performance ad creatives',
    p: 'Meta and Google video built to a brief and a number — installs, signups, CPI. Hook, problem, proof, CTA, cut to the second.',
  },
  {
    n: '02',
    h: 'Hook-first storytelling',
    p: 'The first 1.5 seconds decide everything. I write and cut openings as pattern interrupts — news desks, interrogations, confessions, absurd devices.',
  },
  {
    n: '03',
    h: 'AI-assisted production',
    p: 'Full films shot without a crew — generated performances, lipsync, voice, B-roll — then treated as raw footage and cut like live action.',
  },
  {
    n: '04',
    h: 'Sound design & mix',
    p: 'Dialogue-led mixes with music beds that duck properly, delivered to broadcast loudness so nothing clips in the feed.',
  },
  {
    n: '05',
    h: 'Motion graphics & VFX',
    p: 'After Effects supers, app UI composites, score meters, badges and end cards — built to drop cleanly over a locked cut.',
  },
  {
    n: '06',
    h: 'Multi-language delivery',
    p: 'One master, seven Indian languages. Dubbing, subtitle passes and pronunciation QC so every regional cut holds up.',
  },
];

const XP = [
  {
    when: 'Jun 2026 — Present',
    role: 'Performance Video Editor & Ad Creative Strategist',
    org: 'Khatabook · Bengaluru',
    now: true,
    points: [
      'Growth creative for ScorePro, AlertPay, MyAutoPay and the Khatabook app',
      'Shipped 120+ delivered 9:16 ad masters across six fintech products',
      'Wrote and cut hook-led scripts aimed at install and retention targets',
      'Built an AI-assisted production pipeline — generation, lipsync, VO, QC',
      'Localised campaigns into seven Indian languages from a single master',
    ],
  },
  {
    when: 'Jun 2025 — May 2026',
    role: 'Performance Video Editor & Creative Strategist',
    org: 'PrimeTrace Technologies',
    points: [
      'High-converting video ads for Meta and Google campaigns',
      'App growth creative for Crafto — AI-generated ads for user acquisition and engagement',
      'Developed hook-based scripts to improve retention',
      'Produced AI-powered ad creatives using ChatGPT, Gemini and Vertex',
    ],
  },
  {
    when: 'Nov 2024 — May 2025',
    role: 'Video Editor & Content Producer',
    org: 'Medicover Hospitals',
    points: [
      'Managed social content for Instagram and YouTube',
      'Handled Facebook ad creatives and campaigns',
      'Produced doctor bite videos and patient testimonials',
      'Worked with the marketing team to lift engagement',
    ],
  },
  {
    when: 'May 2024 — Oct 2024',
    role: 'Videographer & Editor',
    org: 'DNA Skin Clinic',
    points: [
      'Filmed and edited video for social, marketing and internal use',
      'Cut before/after content for marketing',
      'Produced promotional videos and client testimonials',
    ],
  },
  {
    when: 'Aug 2022 — Dec 2023',
    role: 'Video Producer',
    org: 'Movement Fitness Center',
    points: [
      'Produced promotional videos and client testimonials',
      'Edited transformation and before/after content',
      'Supported day-to-day social content production',
    ],
  },
];

const SKILLS = [
  {
    h: 'Craft',
    tags: [
      'Performance ad creatives',
      'Hook-based storytelling',
      'Short-form / Reels',
      'Colour grading',
      'Sound design & mix',
      'Motion graphics',
      'Thumbnails & posters',
      'Short films',
    ],
  },
  {
    h: 'Software',
    tags: [
      'Premiere Pro',
      'After Effects',
      'DaVinci Resolve',
      'Photoshop',
      'Illustrator',
      'Media Encoder',
      'CapCut',
      'FFmpeg',
    ],
  },
  {
    h: 'AI & platforms',
    tags: [
      'Veo',
      'Kling',
      'Magnific',
      'ElevenLabs',
      'ChatGPT',
      'Claude',
      'Gemini / Vertex',
      'Meta Ads Manager',
      'Google Ads',
    ],
  },
];

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <span key={k}>
                {MARQUEE.map((m) => (
                  <span key={m + k}>{m}</span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <Work />

        <section className="section" id="capabilities">
          <div className="wrap">
            <div className="section-head">
              <Reveal>
                <span className="kicker">What I do</span>
                <h2 className="title">
                  Built for the
                  <br />
                  performance brief
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="lede">
                  Not an editor who gets handed footage. I take a growth problem and return a
                  finished, on-brand master that a media buyer can put straight into a campaign.
                </p>
              </Reveal>
            </div>

            <div className="cap-grid">
              {CAPS.map((c, i) => (
                <Reveal key={c.n} delay={Math.min(i, 5) * 65}>
                  <div className="cap">
                    <div className="cap-n">{c.n}</div>
                    <h3>{c.h}</h3>
                    <p>{c.p}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="experience" style={{ background: 'var(--bg-2)' }}>
          <div className="wrap">
            <div className="section-head">
              <Reveal>
                <span className="kicker">Experience</span>
                <h2 className="title">Where I&apos;ve cut</h2>
              </Reveal>
            </div>

            <div className="xp">
              {XP.map((x, i) => (
                <Reveal key={x.org + x.when} delay={Math.min(i, 4) * 60} className={`xp-row ${x.now ? 'now' : ''}`}>
                  <div className="xp-when">{x.when}</div>
                  <div>
                    <div className="xp-role">{x.role}</div>
                    <div className="xp-org">{x.org}</div>
                    <ul className="xp-list">
                      {x.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="wrap about">
            <Reveal>
              <div>
                <div className="about-photo">
                  <img
                    src={asset('/media/krishna.jpg')}
                    alt="Krishna Teja T, performance video editor, Bengaluru"
                    loading="lazy"
                  />
                </div>
                <span className="kicker">About</span>
                <h2 className="title" style={{ marginBottom: 28 }}>
                  Hook first.
                  <br />
                  Everything else second.
                </h2>
                <p>
                  I&apos;m a performance-focused video editor with <b>4+ years</b> of experience
                  making video that has to earn its place in a feed. Most of my work lives at
                  9:16, runs on Meta and Google, and gets judged on a number rather than a vibe.
                </p>
                <p>
                  Right now I build growth creative at <b>Khatabook</b> for ScorePro, AlertPay,
                  MyAutoPay and the core app — writing hooks, generating and directing footage
                  with AI, then cutting, scoring, grading and mixing the master myself. Before
                  that I ran app-growth creative for <b>Crafto</b> at PrimeTrace, and shot and cut
                  branded video for <b>Medicover Hospitals</b>, <b>DNA Skin Clinic</b> and
                  <b>Movement Fitness</b>.
                </p>
                <p>
                  I care about the things that actually move retention: where the first cut lands,
                  whether the line is audible on a phone speaker, whether the payoff arrives before
                  the thumb does. <b>Based in Bengaluru, open to work.</b>
                </p>
              </div>
            </Reveal>

            <Reveal delay={110}>
              <div>
                {SKILLS.map((s) => (
                  <div className="skills" key={s.h}>
                    <h4>{s.h}</h4>
                    <div className="tags">
                      {s.tags.map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-glow" aria-hidden="true" />
          <div className="wrap contact-in">
            <Reveal>
              <span className="kicker" style={{ justifyContent: 'center' }}>
                Available for work
              </span>
              <h2>
                Let&apos;s make something
                <em>worth watching twice.</em>
              </h2>
              <p className="lede">
                Full-time roles, contract work or a one-off batch of creatives — send me the brief
                and I&apos;ll send back a cut.
              </p>
            </Reveal>

            <Reveal delay={90}>
              <div className="contact-rows">
                <a className="btn btn-primary" href="mailto:krishnateja0911@gmail.com">
                  krishnateja0911@gmail.com
                </a>
                <a className="btn btn-ghost" href="tel:+916301062854">
                  +91 63010 62854
                </a>
                <a
                  className="btn btn-ghost"
                  href="https://wa.me/916301062854"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="wrap foot">
        <span>© {new Date().getFullYear()} Krishna Teja T</span>
        <span>Bengaluru, India — 560043</span>
      </footer>
    </>
  );
}
