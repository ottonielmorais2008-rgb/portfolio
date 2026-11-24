import { describe, expect, it } from 'vitest';
import { journey, journeyHeading } from '../src/data/journey';
import { projects } from '../src/data/projects';

const monthName: Record<string, string> = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

describe('journey data', () => {
  it('lists twenty-four real repositories', () => {
    expect(journey).toHaveLength(25);
    expect(journeyHeading).toBe('20+ projects shipped');
  });

  it('has a name, type, valid month and a GitHub repo url', () => {
    const names = journey.map((item) => item.name);
    expect(new Set(names).size).toBe(journey.length);

    for (const item of journey) {
      expect(item.name.length).toBeGreaterThan(3);
      expect(item.type.length).toBeGreaterThan(1);
      expect(item.isoMonth).toMatch(/^\d{4}-(10|11)$/);
      const [, mm] = item.isoMonth.split('-');
      expect(item.month).toBe(`${monthName[mm]} ${item.isoMonth.slice(0, 4)}`);
      expect(item.repoUrl).toMatch(
        /^https:\/\/github.com\/ottonielmorais2008-rgb\/[a-z0-9-]+$/,
      );
      if (item.liveUrl) {
        expect(item.liveUrl).toMatch(/^https:\/\//);
        expect(item.liveUrl).not.toMatch(/localhost/i);
      }
    }
  });

  it('is ordered from newest to oldest', () => {
    const keys = journey.map((item) => item.isoMonth);
    const sorted = [...keys].sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
    expect(keys).toEqual(sorted);
  });

  it('includes every featured project', () => {
    const journeyText = journey.map((item) => item.name.toLowerCase());
    for (const project of projects) {
      const found = journeyText.some((name) =>
        name.includes(project.title.toLowerCase()),
      );
      expect(found, `journey is missing ${project.title}`).toBe(true);
    }
  });
});
