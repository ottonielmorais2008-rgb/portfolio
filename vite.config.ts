import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/portfolio/',
  build: {
    target: 'es2022',
    assetsInlineLimit: 4096,
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
