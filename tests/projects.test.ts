import { describe, expect, it } from 'vitest';
import {
  ALL_WORK_URL,
  CATEGORIES,
  FILTERS,
  getProject,
  projects,
  type Category,
} from '../src/data/projects';

const httpsUrl = /^https:\/\/[^\s]+$/;
const allowed = new Set<string>(CATEGORIES);

describe('featured project data', () => {
  it('lists exactly six featured projects', () => {
    expect(projects).toHaveLength(6);
  });

  it('uses unique slugs and titles', () => {
    const slugs = projects.map((p) => p.slug);
    const titles = projects.map((p) => p.title);
    expect(new Set(slugs).size).toBe(6);
    expect(new Set(titles).size).toBe(6);
  });

  it('has the required fields, https links and allowed categories', () => {
    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9-]+$/);
      expect(project.title.length).toBeGreaterThan(3);
      expect(project.summary.length).toBeGreaterThan(20);
      expect(project.description.length).toBeGreaterThan(project.summary.length);
      expect(project.stack.length).toBeGreaterThanOrEqual(2);
      expect(project.categories.length).toBeGreaterThanOrEqual(1);
      expect(project.liveUrl).toMatch(httpsUrl);
      expect(project.sourceUrl).toMatch(httpsUrl);
      expect(project.liveUrl).not.toMatch(/localhost/i);
      expect(project.sourceUrl).toMatch(
        /^https:\/\/github\.com\/ottonielmorais2008-rgb\//,
      );
      expect(project.thumbnail).toBe(`${project.slug}.webp`);
      expect(project.created).toMatch(/^\d{4}-\d{2}$/);
      for (const category of project.categories) {
        expect(allowed.has(category)).toBe(true);
      }
    }
  });

  it('covers every filter category with at least one project', () => {
    for (const filter of FILTERS) {
      if (filter === 'All') continue;
      const found = projects.some((p) => p.categories.includes(filter as Category));
      expect(found, `missing project for ${filter}`).toBe(true);
    }
  });

  it('looks up projects by slug and ignores unknown slugs', () => {
    expect(getProject('wallet-explorer')?.title).toBe('Wallet Explorer');
    expect(getProject('missing')).toBeUndefined();
  });

  it('points "view all work" at the public GitHub repositories list', () => {
    expect(ALL_WORK_URL).toBe(
      'https://github.com/ottonielmorais2008-rgb?tab=repositories',
    );
  });

  it('does not mention school, course, grade or a city in public copy', () => {
    const text = projects
      .map((p) => [p.title, p.summary, p.description, p.stack.join(' ')].join(' '))
      .join('\n')
      .toLowerCase();
    expect(text).not.toMatch(/\b(school|universit|course|grade|internato)\b/);
    expect(text).not.toMatch(/\b(lisbon|lisboa|porto|maia|portugal)\b/);
  });
});
