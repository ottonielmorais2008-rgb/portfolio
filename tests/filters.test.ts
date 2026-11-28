import { describe, expect, it } from 'vitest';
import { FILTERS, projects } from '../src/data/projects';
import {
  countByFilter,
  filterProjects,
  isFilterId,
  matchesFilter,
} from '../src/lib/filters';

describe('matchesFilter', () => {
  const auditor = projects.find((p) => p.slug === 'ai-code-auditor')!;
  const explorer = projects.find((p) => p.slug === 'erc8004-agent-explorer')!;
  it('returns every project for All', () => {
    expect(matchesFilter(auditor, 'All')).toBe(true);
    expect(matchesFilter(explorer, 'All')).toBe(true);
  });

  it('matches a project in more than one category', () => {
    expect(matchesFilter(auditor, 'AI')).toBe(true);
    expect(matchesFilter(auditor, 'Security')).toBe(true);
    expect(matchesFilter(auditor, 'Crypto')).toBe(false);
  });

  it('excludes projects outside the filter', () => {
    expect(matchesFilter(explorer, 'Security')).toBe(false);
    expect(matchesFilter(auditor, 'Crypto')).toBe(false);
    expect(matchesFilter(explorer, 'Crypto')).toBe(true);
    expect(matchesFilter(explorer, 'AI')).toBe(true);
  });
});

describe('filterProjects', () => {
  it('returns all eight projects for All', () => {
    expect(filterProjects(projects, 'All')).toHaveLength(8);
  });

  it('returns AI projects including the dual-tagged code auditor', () => {
    const result = filterProjects(projects, 'AI').map((p) => p.slug);
    expect(result).toEqual([
      'erc8004-agent-explorer',
      'calibrated-llm-judge',
      'ai-code-auditor',
      'typed-agent-team',
      'solana-aml-risk-flagger',
      'address-poisoning-detector',
      'crypto-flow-graph',
      'browser-voice-assistant',
    ]);
  });

  it('returns Security projects including the dual-tagged code auditor', () => {
    const result = filterProjects(projects, 'Security').map((p) => p.slug);
    expect(result).toEqual(['ai-code-auditor', 'solana-aml-risk-flagger', 'address-poisoning-detector']);
  });

  it('returns the explorer, the AML flagger, the poisoning detector and the flow graph for Crypto', () => {
    const result = filterProjects(projects, 'Crypto').map((p) => p.slug);
    expect(result).toEqual(['erc8004-agent-explorer', 'solana-aml-risk-flagger', 'address-poisoning-detector', 'crypto-flow-graph']);
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
    expect(countByFilter(projects, 'AI')).toBe(8);
    expect(countByFilter(projects, 'Security')).toBe(3);
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
