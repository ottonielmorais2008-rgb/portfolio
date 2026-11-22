import { describe, expect, it } from 'vitest';
import { FILTERS, projects } from '../src/data/projects';
import {
  countByFilter,
  filterProjects,
  isFilterId,
  matchesFilter,
} from '../src/lib/filters';

describe('matchesFilter', () => {
  const threat = projects.find((p) => p.slug === 'ai-threat-modeler')!;
  const wallet = projects.find((p) => p.slug === 'wallet-explorer')!;
  const hallu = projects.find((p) => p.slug === 'hallucination-detector')!;

  it('returns every project for All', () => {
    expect(matchesFilter(threat, 'All')).toBe(true);
    expect(matchesFilter(wallet, 'All')).toBe(true);
  });

  it('matches a project in more than one category', () => {
    expect(matchesFilter(threat, 'AI')).toBe(true);
    expect(matchesFilter(threat, 'Security')).toBe(true);
    expect(matchesFilter(threat, 'Crypto')).toBe(false);
  });

  it('excludes projects outside the filter', () => {
    expect(matchesFilter(wallet, 'AI')).toBe(false);
    expect(matchesFilter(hallu, 'Crypto')).toBe(false);
    expect(matchesFilter(wallet, 'Crypto')).toBe(true);
  });
});

describe('filterProjects', () => {
  it('returns all eight projects for All', () => {
    expect(filterProjects(projects, 'All')).toHaveLength(8);
  });

  it('returns AI projects including the dual-tagged threat modeler', () => {
    const result = filterProjects(projects, 'AI').map((p) => p.slug);
    expect(result).toEqual([
      'crypto-flow-graph',
      'browser-voice-assistant',
      'ai-threat-modeler',
      'hallucination-detector',
      'text-to-sql-assistant',
    ]);
  });

  it('returns Security projects including the dual-tagged threat modeler', () => {
    const result = filterProjects(projects, 'Security').map((p) => p.slug);
    expect(result).toEqual(['solana-token-risk-checker', 'ai-threat-modeler', 'vuln-tracker']);
  });

  it('returns the flow graph, the token risk checker and the wallet explorer for Crypto', () => {
    const result = filterProjects(projects, 'Crypto').map((p) => p.slug);
    expect(result).toEqual(['crypto-flow-graph', 'solana-token-risk-checker', 'wallet-explorer']);
  });

  it('does not mutate the original list', () => {
    const copy = [...projects];
    filterProjects(projects, 'AI');
    expect(projects).toEqual(copy);
  });
});

describe('countByFilter and isFilterId', () => {
  it('counts each known filter', () => {
    expect(countByFilter(projects, 'All')).toBe(8);
    expect(countByFilter(projects, 'AI')).toBe(5);
    expect(countByFilter(projects, 'Security')).toBe(3);
    expect(countByFilter(projects, 'Crypto')).toBe(3);
  });

  it('accepts only known filter ids', () => {
    for (const id of FILTERS) {
      expect(isFilterId(id)).toBe(true);
    }
    expect(isFilterId('Design')).toBe(false);
    expect(isFilterId('')).toBe(false);
  });
});
