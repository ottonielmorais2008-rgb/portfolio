export interface SocialLink {
  name: string;
  href: string;
  icon: 'github' | 'linkedin' | 'x' | 'instagram';
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/ottonielmorais2008-rgb',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/manuel-ottoniel-morais',
    icon: 'linkedin',
  },
  {
    name: 'X',
    href: 'https://x.com/ele35955',
    icon: 'x',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/m_m0rais_/',
    icon: 'instagram',
  },
];
