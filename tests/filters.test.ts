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
  const token = projects.find((p) => p.slug === 'solana-token-risk-checker')!;
  const hallu = projects.find((p) => p.slug === 'hallucination-detector')!;

  it('returns every project for All', () => {
    expect(matchesFilter(threat, 'All')).toBe(true);
    expect(matchesFilter(token, 'All')).toBe(true);
  });

  it('matches a project in more than one category', () => {
    expect(matchesFilter(threat, 'AI')).toBe(true);
    expect(matchesFilter(threat, 'Security')).toBe(true);
    expect(matchesFilter(threat, 'Crypto')).toBe(false);
  });

  it('excludes projects outside the filter', () => {
    expect(matchesFilter(token, 'AI')).toBe(false);
    expect(matchesFilter(hallu, 'Crypto')).toBe(false);
    expect(matchesFilter(token, 'Crypto')).toBe(true);
  });
});

describe('filterProjects', () => {
  it('returns all eight projects for All', () => {
    expect(filterProjects(projects, 'All')).toHaveLength(8);
  });

  it('returns AI projects including the dual-tagged threat modeler', () => {
    const result = filterProjects(projects, 'AI').map((p) => p.slug);
    expect(result).toEqual([
      'typed-agent-team',
      'solana-aml-risk-flagger',
      'address-poisoning-detector',
      'crypto-flow-graph',
      'browser-voice-assistant',
      'ai-threat-modeler',
      'hallucination-detector',
    ]);
  });

  it('returns Security projects including the dual-tagged threat modeler', () => {
    const result = filterProjects(projects, 'Security').map((p) => p.slug);
    expect(result).toEqual(['solana-aml-risk-flagger', 'address-poisoning-detector', 'solana-token-risk-checker', 'ai-threat-modeler']);
  });

  it('returns the AML flagger, the poisoning detector, the flow graph and the token risk checker for Crypto', () => {
    const result = filterProjects(projects, 'Crypto').map((p) => p.slug);
    expect(result).toEqual(['solana-aml-risk-flagger', 'address-poisoning-detector', 'crypto-flow-graph', 'solana-token-risk-checker']);
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
    expect(countByFilter(projects, 'AI')).toBe(7);
    expect(countByFilter(projects, 'Security')).toBe(4);
    expect(countByFilter(projects, 'Crypto')).toBe(4);
  });

  it('accepts only known filter ids', () => {
    for (const id of FILTERS) {
      expect(isFilterId(id)).toBe(true);
    }
    expect(isFilterId('Design')).toBe(false);
    expect(isFilterId('')).toBe(false);
  });
});
