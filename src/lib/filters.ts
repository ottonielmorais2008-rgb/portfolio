import type { FilterId, Project } from '../data/projects';

export function matchesFilter(project: Project, filter: FilterId): boolean {
  if (filter === 'All') return true;
  return project.categories.includes(filter);
}

export function filterProjects(projects: Project[], filter: FilterId): Project[] {
  return projects.filter((project) => matchesFilter(project, filter));
}

export function countByFilter(
  projects: Project[],
  filter: FilterId,
): number {
  return filterProjects(projects, filter).length;
}

export function isFilterId(value: string): value is FilterId {
  return value === 'All' || value === 'AI' || value === 'Security' || value === 'Crypto';
}
