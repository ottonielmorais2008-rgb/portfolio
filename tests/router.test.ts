import { describe, expect, it } from 'vitest';
import { parseHash, titleFor, toHash } from '../src/lib/router';

describe('router', () => {
  it('parses the home hash in a few equivalent forms', () => {
    expect(parseHash('')).toEqual({ name: 'home' });
    expect(parseHash('#')).toEqual({ name: 'home' });
    expect(parseHash('#/')).toEqual({ name: 'home' });
    expect(parseHash('#/skills')).toEqual({ name: 'home' });
  });

  it('parses a work detail hash', () => {
    expect(parseHash('#/work/ai-threat-modeler')).toEqual({
      name: 'project',
      slug: 'ai-threat-modeler',
    });
    expect(parseHash('#work/wallet-explorer')).toEqual({
      name: 'project',
      slug: 'wallet-explorer',
    });
  });

  it('builds hashes and document titles', () => {
    expect(toHash({ name: 'home' })).toBe('#/');
    expect(toHash({ name: 'project', slug: 'vuln-tracker' })).toBe(
      '#/work/vuln-tracker',
    );
    expect(titleFor({ name: 'home' })).toBe('Ottoniel Morais — Developer');
    expect(
      titleFor({ name: 'project', slug: 'vuln-tracker' }, 'Vulnerability Tracker'),
    ).toBe('Vulnerability Tracker — Ottoniel Morais');
  });
});
