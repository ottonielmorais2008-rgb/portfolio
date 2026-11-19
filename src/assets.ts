import portraitUrl from './assets/portrait.webp';
import portraitUrl2x from './assets/portrait@2x.webp';

const workThumbs = import.meta.glob('./assets/work/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export { portraitUrl, portraitUrl2x };

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
