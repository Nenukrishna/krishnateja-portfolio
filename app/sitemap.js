export const dynamic = 'force-static';

export default function sitemap() {
  return [
    {
      url: 'https://krishnateja-portfolio.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
