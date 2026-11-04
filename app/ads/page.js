import { asset } from '@/lib/base';
import './ads.css';

// A one-link proof sheet for job posts that ask for "live ad work, links not a CV".
// Five shipped ads, each with the opening line, the format, why the hook works and what I did.

export const metadata = {
  title: 'Live ads — Krishna Teja, Performance Video Editor',
  description:
    'Five live Meta ads with the hook, the format and my role on each: AI casting and generation, edit, UI motion and sound.',
  alternates: { canonical: '/ads/' },
};

const ROLE_AI = 'AI casting and shot generation (Nano Banana Pro, Veo 3.1), performance direction, edit, UI motion in After Effects, sound mix';

const ADS = [
  {
    slug: 'ap-message-soundboxes',
    brand: 'AlertPay',
    title: 'A Message to Soundboxes',
    format: 'Direct address · Product reveal',
    lang: 'Hindi · Meta · 9:16 · 23s',
    hook: '“This message is for every UPI soundbox. This is the AlertPay app, and it will finish the soundbox.”',
    why: 'A photoreal AI actor with real authority speaks straight to the old hardware, then destroys it. Bold red type lands each beat; the product closes it.',
    role: ROLE_AI,
  },
  {
    slug: 'ma-phone-fight',
    brand: 'MyAutoPay',
    title: 'What Did You Download?',
    format: 'Conflict open · Problem → solution',
    lang: 'Hindi · Meta · 9:16 · 30s',
    hook: '“What all did you download on my phone? Now money gets cut every month!”',
    why: 'Two AI actors grabbing each other on a real street. The fight makes the problem obvious in two seconds, then the app UI shows every autopay and how to stop it.',
    role: ROLE_AI,
  },
  {
    slug: 'sp-score-badgaya',
    brand: 'ScorePro',
    title: 'Score Badh Gaya',
    format: 'Testimonial · Before / after',
    lang: 'Hindi · Meta · 9:16 · 23s',
    hook: '“My credit score went up and I got a better loan. Before, it was near 550…”',
    why: 'Opens on the win, then cuts to a grayscale flashback of the rejection: 750 against 550 in one visual beat.',
    proof: 'The top hook for installs in its reporting cycle.',
    role: ROLE_AI,
  },
  {
    slug: 'sp-loan-rejected',
    brand: 'ScorePro',
    title: 'Rejected Again',
    format: 'Problem · Mechanism reveal',
    lang: 'Hindi · Meta · 9:16 · 39s',
    hook: '“Loan getting rejected again and again? Know the reason? Credit score and credit history.”',
    why: 'A loan bar stalls at 63% and flips to Rejected. It names the mechanism, not just the outcome, so the app is the obvious next step.',
    proof: 'A top hook for installs in its reporting cycle.',
    role: ROLE_AI,
  },
  {
    slug: 'mg-scalehouse-s02',
    brand: 'ScaleHouse · US e-commerce agency',
    title: '3 Ways People Buy on TikTok Shop',
    format: 'Talking head · Real-footage B-roll',
    lang: 'English · TikTok / Reels · 9:16 · 46s',
    hook: '“What is TikTok Shop? Here’s a simple version, the way it actually works in 2026.”',
    why: 'Speaker over real TikTok Shop screens, creator videos and packing footage, with designed cards only where a number lands.',
    role: 'Edit from the client’s raw talking head, B-roll sourcing, colour grade, captions, motion graphics, sound',
  },
];

export default function AdsPage() {
  return (
    <main className="ads">
      <div className="wrap">
        <header className="ads-head">
          <a className="ads-back" href={asset('/')}>
            ← krishnateja-portfolio
          </a>
          <p className="ads-eyebrow">Krishna Teja · Performance video editor · Bengaluru</p>
          <h1>
            Five live ads, <span>and what I did on each.</span>
          </h1>
          <p className="ads-lede">
            Direct-response video for Meta and TikTok. Four are app-install ads for Indian fintech apps in Hindi;
            one is for a US e-commerce agency. The AI actors are generated, and every one hooks inside the first three seconds.
          </p>
          <ul className="ads-tools">
            <li>Premiere Pro</li>
            <li>After Effects</li>
            <li>Veo 3.1</li>
            <li>Nano Banana Pro</li>
            <li>Seedance</li>
            <li>ElevenLabs</li>
            <li>CapCut</li>
          </ul>
        </header>

        <ol className="ads-list">
          {ADS.map((ad, i) => (
            <li className="ad" key={ad.slug} id={ad.slug}>
              <div className="ad-video">
                <video
                  src={asset(`/media/ads/${ad.slug}.mp4`)}
                  poster={asset(`/media/posters/${ad.slug}.jpg`)}
                  controls
                  playsInline
                  preload="none"
                />
              </div>
              <div className="ad-body">
                <div className="ad-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="ad-brand">{ad.brand}</div>
                <h2>{ad.title}</h2>
                <div className="ad-meta">
                  <span>{ad.format}</span>
                  <span>{ad.lang}</span>
                </div>
                <dl>
                  <dt>Hook, first 3 seconds</dt>
                  <dd className="ad-hook">{ad.hook}</dd>
                  <dt>Why it works</dt>
                  <dd>{ad.why}</dd>
                  {ad.proof && (
                    <>
                      <dt>Result</dt>
                      <dd>{ad.proof}</dd>
                    </>
                  )}
                  <dt>My role</dt>
                  <dd>{ad.role}</dd>
                </dl>
              </div>
            </li>
          ))}
        </ol>

        <footer className="ads-foot">
          <p>Freelance and contract, remote. Hook variants and multi-language versions from one master.</p>
          <div className="ads-cta">
            <a className="btn btn-primary" href="mailto:krishnateja0911@gmail.com">
              krishnateja0911@gmail.com
            </a>
            <a className="btn btn-ghost" href={asset('/#work')}>
              Full portfolio
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
