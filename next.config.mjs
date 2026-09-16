/** @type {import('next').NextConfig} */
const nextConfig = {
  // No `output: 'export'`. Every route in this site is already statically
  // prerendered, so Vercel serves the same files from its edge either way —
  // but `export` writes to `out/`, which only works if Vercel's detected
  // Output Directory agrees. Leaving it off keeps us on Vercel's default
  // Next.js path and removes that failure mode. To host somewhere else
  // (Netlify, S3, any static host), add `output: 'export'` back and deploy
  // the generated `out/` directory.
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
