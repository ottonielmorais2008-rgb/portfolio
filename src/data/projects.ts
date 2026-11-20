export const CATEGORIES = ['AI', 'Security', 'Crypto'] as const;

export type Category = (typeof CATEGORIES)[number];
export type FilterId = 'All' | Category;

export interface Project {
  slug: string;
  title: string;
  categories: Category[];
  stack: string[];
  summary: string;
  description: string;
  liveUrl: string;
  sourceUrl: string;
  thumbnail: string;
  created: string;
}

export const FILTERS: FilterId[] = ['All', 'AI', 'Security', 'Crypto'];

export const projects: Project[] = [
  {
    slug: 'solana-token-risk-checker',
    title: 'Solana Token Risk Checker',
    categories: ['Crypto', 'Security'],
    stack: ['React', 'TypeScript', 'Vite', 'Solana RPC'],
    summary: 'Read-only inspection of mint authority, freeze authority, holder concentration and Token-2022 extensions.',
    description:
      'Paste a Solana token mint address to see who can still mint, who can freeze accounts, how concentrated the supply is, and whether Token-2022 extensions add extra rules. Each check is rated Pass, Warn, Risk or Unknown. Missing or failed data is shown as Unknown, never as safe. There is no wallet connection and no signing. An optional explanation can be generated from the structured report.',
    liveUrl: 'https://solana-token-risk-checker.vercel.app',
    sourceUrl: 'https://github.com/ottonielmorais2008-rgb/solana-token-risk-checker',
    thumbnail: 'solana-token-risk-checker.webp',
    created: '2026-11',
  },
  {
    slug: 'ai-threat-modeler',
    title: 'AI Threat Modeler',
    categories: ['AI', 'Security'],
    stack: ['Next.js', 'AI SDK', 'Gemini', 'Zod'],
    summary: 'STRIDE threat models and OWASP LLM Top 10 mapping for AI applications.',
    description:
      'Describe an AI application and generate a structured threat model: components and data flows, trust boundaries, every place untrusted text can enter the system, STRIDE threats with severity, a mapping to the OWASP Top 10 for LLM Applications (2025), and concrete mitigations. The report includes a Mermaid diagram and can be exported as Markdown. Ready-made examples keep the demo usable if the model is unavailable.',
    liveUrl: 'https://ai-threat-modeler.vercel.app',
    sourceUrl: 'https://github.com/ottonielmorais2008-rgb/ai-threat-modeler',
    thumbnail: 'ai-threat-modeler.webp',
    created: '2026-11',
  },
  {
    slug: 'hallucination-detector',
    title: 'Hallucination Detector',
    categories: ['AI'],
    stack: ['Next.js', 'AI SDK', 'Gemini', 'Zod'],
    summary: 'Check an AI answer against a source text and flag unsupported claims.',
    description:
      'Paste a source text and an AI answer. Each sentence is labelled as supported, not supported, or contradicted by the source, with a short reason. The app is built with the AI SDK and Gemini, and the verdicts are validated against a schema so the result stays structured.',
    liveUrl: 'https://hallucination-detector-five.vercel.app',
    sourceUrl: 'https://github.com/ottonielmorais2008-rgb/hallucination-detector',
    thumbnail: 'hallucination-detector.webp',
    created: '2026-11',
  },
  {
    slug: 'vuln-tracker',
    title: 'Vulnerability Tracker',
    categories: ['Security'],
    stack: ['React', 'TypeScript', 'Vite', 'Supabase'],
    summary: 'Track lab vulnerabilities by severity, status, owner and due date.',
    description:
      'Record findings against lab hosts, watch severity and status at a glance, and export a CSV. The live demo stores data in the browser; when you sign in, data can be saved in a free Supabase project. Filters, overdue logic and CVSS-to-severity mapping are covered by tests.',
    liveUrl: 'https://vuln-tracker-seven.vercel.app',
    sourceUrl: 'https://github.com/ottonielmorais2008-rgb/vuln-tracker',
    thumbnail: 'vuln-tracker.webp',
    created: '2026-11',
  },
  {
    slug: 'text-to-sql-assistant',
    title: 'Text-to-SQL Assistant',
    categories: ['AI'],
    stack: ['Next.js', 'AI SDK', 'Gemini', 'SQLite'],
    summary: 'Ask a shop database questions in plain English. The SQL is validated and run read-only.',
    description:
      'Ask a question about a fictional shop (customers, products, orders). Gemini writes the SQL, the server validates it, and the query runs on a read-only database. Nothing is written to the data, and the assistant is scoped to that sample shop.',
    liveUrl: 'https://text-to-sql-assistant-tau.vercel.app',
    sourceUrl: 'https://github.com/ottonielmorais2008-rgb/text-to-sql-assistant',
    thumbnail: 'text-to-sql-assistant.webp',
    created: '2026-11',
  },
  {
    slug: 'wallet-explorer',
    title: 'Wallet Explorer',
    categories: ['Crypto'],
    stack: ['Next.js', 'TypeScript', 'JSON-RPC'],
    summary: 'Read-only multichain wallet explorer for Ethereum, Base and Solana.',
    description:
      'Paste any public address. The chain is detected automatically: EVM addresses are looked up on Ethereum and Base, base58 addresses on Solana. The app is read-only — no wallet connection and no signing — and it uses free, keyless public endpoints.',
    liveUrl: 'https://wallet-explorer-ten.vercel.app',
    sourceUrl: 'https://github.com/ottonielmorais2008-rgb/wallet-explorer',
    thumbnail: 'wallet-explorer.webp',
    created: '2026-11',
  },
  {
    slug: 'ai-cv-analyzer',
    title: 'AI CV Analyzer',
    categories: ['AI'],
    stack: ['Next.js', 'AI SDK', 'Gemini', 'Zod'],
    summary: 'Paste a CV and a job description to get a match score, skill gaps and suggestions.',
    description:
      'Paste a CV and a job description. The app returns a match score, the skills that already fit, the ones that are missing, and concrete suggestions. Results are validated with a schema. Texts are not stored by the application.',
    liveUrl: 'https://ai-cv-analyzer-pink.vercel.app',
    sourceUrl: 'https://github.com/ottonielmorais2008-rgb/ai-cv-analyzer',
    thumbnail: 'ai-cv-analyzer.webp',
    created: '2026-11',
  },
];

export const ALL_WORK_URL =
  'https://github.com/ottonielmorais2008-rgb?tab=repositories';

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
