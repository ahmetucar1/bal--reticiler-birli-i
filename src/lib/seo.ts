import { siteConfig } from '../config/site';

export type MetaOptions = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
};

export const buildTitle = (pageTitle?: string) =>
  pageTitle ? `${pageTitle} | ${siteConfig.shortName}` : siteConfig.name;

export const buildCanonical = (path?: string, canonical?: string) => {
  if (canonical) return canonical;
  if (!path) return siteConfig.url;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalized, siteConfig.url).toString();
};

export const buildMeta = (options: MetaOptions = {}) => {
  const title = buildTitle(options.title);
  const description = options.description ?? siteConfig.description;
  const canonical = buildCanonical(undefined, options.canonical);
  const image = (() => {
    const raw = options.image ?? siteConfig.ogImage;
    try {
      return new URL(raw, siteConfig.url).toString();
    } catch (_err) {
      return raw;
    }
  })();

  return {
    title,
    description,
    canonical,
    image,
    noIndex: options.noIndex ?? false,
    type: options.type ?? 'website'
  };
};

export const organizationJsonLd = () => {
  const contactPoint =
    siteConfig.contacts.phone || siteConfig.contacts.email
      ? [
          {
            '@type': 'ContactPoint',
            telephone: siteConfig.contacts.phone || undefined,
            email: siteConfig.contacts.email || undefined,
            contactType: 'customer support',
            areaServed: 'TR',
            availableLanguage: ['tr']
          }
        ]
      : undefined;

  const sameAs = [
    siteConfig.socials.linkedin,
    siteConfig.socials.instagram,
    siteConfig.socials.twitter,
    siteConfig.socials.facebook,
    siteConfig.socials.youtube
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: new URL(siteConfig.ogImage, siteConfig.url).toString(),
    description: siteConfig.description,
    brand: {
      '@type': 'Brand',
      name: siteConfig.shortName
    },
    contactPoint,
    sameAs: sameAs.length ? sameAs : undefined
  };
};

export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  inLanguage: siteConfig.locale
});
