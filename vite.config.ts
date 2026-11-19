import { defineConfig } from 'vitest/config';

const env =
  (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env ?? {};

// GitHub Pages is served from /portfolio/. Vercel sets VERCEL=1 and
// is served from the domain root. VITE_BASE overrides either case.
const base = env.VITE_BASE ?? (env.VERCEL ? '/' : '/portfolio/');

export default defineConfig({
  base,
  build: {
    target: 'es2022',
    assetsInlineLimit: 4096,
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
