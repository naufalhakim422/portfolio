export default function sitemap() {
  return [
    {
      url: 'https://naufalhakim.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://naufalhakim.dev/animation-test',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
