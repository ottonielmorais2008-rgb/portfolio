import portraitUrl from './assets/portrait.webp';

const workThumbs = import.meta.glob('./assets/work/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export { portraitUrl };

export function workThumb(file: string): string {
  const key = `./assets/work/${file}`;
  const url = workThumbs[key];
  if (!url) {
    throw new Error(`Missing thumbnail: ${file}`);
  }
  return url;
}

export function hasWorkThumb(file: string): boolean {
  return Boolean(workThumbs[`./assets/work/${file}`]);
}
