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
    slug: 'erc8004-agent-explorer',
    title: 'ERC-8004 Agent Explorer',
    categories: ['Crypto', 'AI'],
    stack: ['React', 'TypeScript', 'Vite', 'viem', 'Zod', 'Gemini'],
    summary: 'Look up an ERC-8004 agent on Ethereum Sepolia or Base Sepolia and read its identity, registration file and reputation feedback.',
    description:
      'Enter an agent ID and pick Ethereum Sepolia or Base Sepolia. The app reads the official Identity Registry over a public RPC, with a fallback if one endpoint rate-limits, and shows the owner, agentURI and wallet. The registration file is fetched from ipfs, https or data URIs, validated with Zod, and local or private URLs are blocked. Reputation feedback is read from the official Reputation Registry. Example IDs were checked on-chain, and a short list of recent agents can be loaded. An optional button asks Gemini to summarize the data already on screen; if the model is unavailable, a local summary is used instead. The app is read-only: no wallet, no signing, no keys in the browser.',
    liveUrl: 'https://erc8004-agent-explorer.vercel.app',
    sourceUrl: 'https://github.com/ottonielmorais2008-rgb/erc8004-agent-explorer',
    thumbnail: 'erc8004-agent-explorer.webp',
    created: '2026-11',
  },
  {
    slug: 'calibrated-llm-judge',
    title: 'Calibrated LLM Judge',
    categories: ['AI'],
    stack: ['React', 'TypeScript', 'Vite', 'Zod', 'Gemini'],
    summary: 'Label sample model responses, run a Gemini judge against an editable rubric, and measure agreement with accuracy and Cohen\'s kappa.',
    description:
      'The page opens on a bundled sample of fifty labelled responses, clearly marked as example data. You can edit the human scores or add a new labelled pair; labels stay in the browser. An editable rubric, including the pass threshold, is sent to Gemini in batches from a serverless function. The output is validated with Zod and retried once if the shape is wrong. The page then shows percent agreement, Cohen\'s kappa, a confusion matrix and a disagreement list. After you tweak the rubric and run the judge again, you can compare v1 with v2. If the key is missing or the model fails, precomputed demo scores still run.',
    liveUrl: 'https://calibrated-llm-judge.vercel.app',
    sourceUrl: 'https://github.com/ottonielmorais2008-rgb/calibrated-llm-judge',
    thumbnail: 'calibrated-llm-judge.webp',
    created: '2026-11',
  },
  {
    slug: 'ai-code-auditor',
    title: 'AI Code Auditor',
    categories: ['AI', 'Security'],
    stack: ['React', 'TypeScript', 'Vite', 'Zod', 'Gemini'],
    summary: 'Paste source or a public GitHub file URL and get structured findings: line, severity, CWE and a suggested fix.',
    description:
      'The page opens on an intentionally vulnerable SQL-injection sample, with XSS, a hardcoded secret placeholder and path traversal available as well. Paste a snippet or a public GitHub file URL and the audit returns JSON validated with Zod: each finding has a line, a severity, a CWE id, an explanation and a suggested fix. The matching lines are highlighted in the source. The live path calls Gemini from a serverless function; if the key is missing or the model fails, deterministic demo findings still run. Public files are fetched server-side only from raw.githubusercontent.com, with a size limit. This is an educational demo, not a complete security review.',
    liveUrl: 'https://ai-code-auditor-two.vercel.app',
    sourceUrl: 'https://github.com/ottonielmorais2008-rgb/ai-code-auditor',
    thumbnail: 'ai-code-auditor.webp',
    created: '2026-11',
  },
  {
    slug: 'typed-agent-team',
    title: 'Typed Multi-Agent Team',
    categories: ['AI'],
    stack: ['React', 'TypeScript', 'Vite', 'Zod', 'Gemini'],
    summary: 'A supervisor routes a coding task through a Researcher, a Coder and a Reviewer. Every hand-off is validated with Zod.',
    description:
      'Type a coding task and watch the team work through it on a live timeline. The Researcher writes notes and acceptance checks, the Coder implements a single file, and the Reviewer either approves the work or sends it back with must-fix issues. The supervisor validates every payload against a Zod schema, retries once if the shape is wrong, and stops after two revisions. The live path calls Gemini from a serverless function; if the key is missing or the model fails, a deterministic demo team and a canned sample run still show the full loop.',
    liveUrl: 'https://typed-agent-team.vercel.app',
    sourceUrl: 'https://github.com/ottonielmorais2008-rgb/typed-agent-team',
    thumbnail: 'typed-agent-team.webp',
    created: '2026-11',
  },
  {
    slug: 'solana-aml-risk-flagger',
    title: 'Solana AML Risk Flagger',
    categories: ['Crypto', 'Security', 'AI'],
    stack: ['React', 'TypeScript', 'Vite', 'Solana RPC', 'Gemini'],
    summary: 'Paste a Solana address to flag fast in/out transfers, many small inbound payments, repeated counterparties and bursts of activity. Every flag is backed by a transaction signature.',
    description:
      'The demo opens on a real mainnet address whose recent public SOL transfers trigger the built-in heuristics. The app reads recent transactions from a free public RPC, with a fallback and retries, and flags funds that arrive and leave again quickly, many small inbound transfers from several counterparties, the same counterparty used over and over, and a sudden burst of activity. Every flag links to its evidence on Solana Explorer. An optional button asks Gemini to explain a validated summary of the alerts; the flags stand on their own without it. The app is read-only: no wallet, no signing, no keys. These are transparent patterns, not a finding of money laundering.',
    liveUrl: 'https://solana-aml-risk-flagger.vercel.app',
    sourceUrl: 'https://github.com/ottonielmorais2008-rgb/solana-aml-risk-flagger',
    thumbnail: 'solana-aml-risk-flagger.webp',
    created: '2026-11',
  },
  {
    slug: 'address-poisoning-detector',
    title: 'Address Poisoning Detector',
    categories: ['Crypto', 'Security', 'AI'],
    stack: ['React', 'TypeScript', 'Vite', 'Ethereum', 'Blockscout', 'Gemini'],
    summary: 'Paste an Ethereum address to find lookalike addresses, fake USDT/USDC tokens, zero-value and dust transfers planted in its history.',
    description:
      'Address poisoning tricks people into copying an attacker\'s address from their own history. The demo opens on a real address under an active campaign. The app reads recent ERC-20 transfers from the public Blockscout API and flags lookalike addresses (same first and last characters as a real counterparty), fake USDT/USDC tokens that use homoglyphs or invisible characters, zero-value and dust transfers, and the critical case where real funds went to a lookalike. Each warning shows the two addresses side by side with the copied characters highlighted and explains the risk in plain English. An optional button asks Gemini to explain a validated summary. It is read-only: no wallet, no signing, no keys.',
    liveUrl: 'https://address-poisoning-detector.vercel.app',
    sourceUrl: 'https://github.com/ottonielmorais2008-rgb/address-poisoning-detector',
    thumbnail: 'address-poisoning-detector.webp',
    created: '2026-11',
  },
  {
    slug: 'crypto-flow-graph',
    title: 'Crypto Flow Graph',
    categories: ['Crypto', 'AI'],
    stack: ['React', 'TypeScript', 'Vite', 'Bitcoin', 'Ethereum', 'Gemini'],
    summary: 'Paste a Bitcoin or Ethereum address or transaction hash to see how funds move between addresses.',
    description:
      'The demo opens with a real Bitcoin payout already drawn as an interactive graph. Paste an address or transaction hash and the chain is detected automatically. Nodes are addresses, edges are transfers with amounts, and a click expands an address or opens the explorer. An optional button sends a compact summary of the visible graph to Gemini, which is told not to invent entity names. The app is read-only: there is no wallet connection and no signing. Bitcoin data comes from mempool.space; Ethereum address history comes from Blockscout, because a plain Ethereum RPC cannot list an address\'s transactions.',
    liveUrl: 'https://crypto-flow-graph.vercel.app',
    sourceUrl: 'https://github.com/ottonielmorais2008-rgb/crypto-flow-graph',
    thumbnail: 'crypto-flow-graph.webp',
    created: '2026-11',
  },
  {
    slug: 'browser-voice-assistant',
    title: 'Browser Voice Assistant',
    categories: ['AI'],
    stack: ['React', 'TypeScript', 'Vite', 'Gemini', 'Web Speech API'],
    summary: 'Speak or type a question in the browser. Gemini answers, and the reply is read aloud.',
    description:
      'Click or hold the microphone to dictate a question, or type instead. A short history is sent to a serverless function that calls Gemini, and the reply is spoken with the Web Speech API. The interface includes a voice picker, a speaking rate, a stop button, and clear errors for a denied microphone, an unsupported browser, or an API limit. Speech recognition works best in Chrome; other browsers can use the text box.',
    liveUrl: 'https://browser-voice-assistant.vercel.app',
    sourceUrl: 'https://github.com/ottonielmorais2008-rgb/browser-voice-assistant',
    thumbnail: 'browser-voice-assistant.webp',
    created: '2026-11',
  },
];

export const ALL_WORK_URL =
  'https://github.com/ottonielmorais2008-rgb?tab=repositories';

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
