export type NavItem = {
  title: string;
  href: string;
};

export const siteConfig = {
  name: 'Türkiye Bal Üreticileri Merkez Birliği',
  brandName: 'Türkiye Bal Üreticileri Merkez Birliği',
  shortName: 'TABÜB',
  url: 'https://www.balmerkezbirligi.org',
  locale: 'tr-TR',
  description:
    'Arıcılık ve arı ürünlerinde kaliteyi, sürdürülebilirliği ve üretici refahını destekleyen Türkiye Bal Üreticileri Merkez Birliği.',
  slogan: '',
  ogImage: '/assets/brand/og-default.png',
  twitterHandle: '@bal_birligi',
  nav: [
    { title: 'Ana Sayfa', href: '/' },
    { title: 'Hakkımızda', href: '/hakkimizda' },
    { title: 'Yönetim Kurulu', href: '/yonetim-kurulu' },
    { title: 'Duyurular', href: '/faaliyetler' },
    { title: 'Alt Birlikler', href: '/altbirlikler' },
    { title: 'İletişim', href: '/iletisim' }
  ] satisfies NavItem[],
  contacts: {
    phone: '+90 530 933 36 01',
    email: 'merbalbir@gmail.com',
    address: '',
    mapsUrl: '',
    workingHours: 'Hafta içi 09:00 - 17:00'
  },
  socials: {
    linkedin: '',
    instagram: 'https://www.instagram.com/merkez_bal_ureticiler_birligi/',
    youtube: '',
    twitter: 'https://x.com/bal_birligi',
    facebook: 'https://www.facebook.com/turkiyebalbirlik/?locale=tr_TR'
  }
};
