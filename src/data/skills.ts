export interface SkillGroup {
  id: string;
  title: string;
  summary: string;
  thumbnails: string[];
}

export const skills: SkillGroup[] = [
  {
    id: 'ai-apps',
    title: 'AI Apps',
    summary:
      'I build compact AI tools with Gemini and the AI SDK, and I check them with evals so the output stays useful — threat models, grounded answers, text-to-SQL, and CV matching.',
    thumbnails: [
      'ai-threat-modeler.webp',
      'hallucination-detector.webp',
      'ai-cv-analyzer.webp',
    ],
  },
  {
    id: 'web-dev',
    title: 'Web Dev',
    summary:
      'TypeScript-first interfaces in Next.js and Vite — fast to load, clear to read, and straightforward to run. I keep the tools small and the demos public.',
    thumbnails: [
      'text-to-sql-assistant.webp',
      'vuln-tracker.webp',
      'csv-cleaner.webp',
    ],
  },
  {
    id: 'security',
    title: 'Security',
    summary:
      'Threat modeling, OWASP-minded reviews, and practical Linux auditing. I treat security as part of the build, not a later pass.',
    thumbnails: [
      'ai-threat-modeler.webp',
      'vuln-tracker.webp',
      'linux-security-audit.webp',
    ],
  },
  {
    id: 'crypto',
    title: 'Crypto',
    summary:
      'Read-only on-chain lookups and devnet experiments. I do not touch real funds or sign with a personal wallet in these projects.',
    thumbnails: ['wallet-explorer.webp', 'solana-tip-jar.webp'],
  },
];
