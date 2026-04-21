export const SITE_URL = 'https://vedarclegal.in';

export const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'VedArc Legal',
  url: SITE_URL,
  logo: `${SITE_URL}/seal.svg`,
  description:
    'Practice-driven legal upskilling for in-house counsel, practising advocates, and law schools.',
  sameAs: ['https://www.linkedin.com/'],
  address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
};

export function courseJsonLd(p: {
  title: string;
  summary: string;
  slug: string;
  audience: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: p.title,
    description: p.summary,
    url: `${SITE_URL}/programs/${p.slug}`,
    provider: { '@type': 'Organization', name: 'VedArc Legal', url: SITE_URL },
    audience: { '@type': 'Audience', audienceType: p.audience },
  };
}
