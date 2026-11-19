import { describe, expect, it } from 'vitest';
import { SOCIAL_LINKS } from '../src/data/socials';
import { socialPillsMarkup } from '../src/ui/social-icons';

describe('SOCIAL_LINKS', () => {
  it('lists GitHub, LinkedIn, X and Instagram in that order', () => {
    expect(SOCIAL_LINKS.map((link) => link.name)).toEqual([
      'GitHub',
      'LinkedIn',
      'X',
      'Instagram',
    ]);
    expect(SOCIAL_LINKS.map((link) => link.href)).toEqual([
      'https://github.com/ottonielmorais2008-rgb',
      'https://www.linkedin.com/in/manuel-ottoniel-morais',
      'https://x.com/ele35955',
      'https://www.instagram.com/m_m0rais_/',
    ]);
  });

  it('renders pill markup with the X logo as inline SVG', () => {
    const html = socialPillsMarkup();
    expect(html).toContain('href="https://x.com/ele35955"');
    expect(html).toMatch(/<svg[^>]*viewBox="0 0 24 24"/);
    expect(html).toContain('>X</span>');
    expect((html.match(/<svg /g) ?? []).length).toBe(4);
  });
});
