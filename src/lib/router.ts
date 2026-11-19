export type Route = { name: 'home' } | { name: 'project'; slug: string };

export function parseHash(hash: string): Route {
  const cleaned = hash.replace(/^#/, '').replace(/^\/+/, '');
  const parts = cleaned.split('/').filter(Boolean);
  if (parts[0] === 'work' && parts[1]) {
    return { name: 'project', slug: parts[1] };
  }
  return { name: 'home' };
}

export function toHash(route: Route): string {
  if (route.name === 'project') return `#/work/${route.slug}`;
  return '#/';
}

export const TITLE_HOME = 'Ottoniel Morais — Developer';

export function titleFor(route: Route, projectTitle?: string): string {
  if (route.name === 'project' && projectTitle) {
    return `${projectTitle} — Ottoniel Morais`;
  }
  return TITLE_HOME;
}
