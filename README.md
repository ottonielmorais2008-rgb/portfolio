# Ottoniel Morais — Portfolio

Personal site for selected work in AI, security and read-only crypto.

**Live site:** [https://ottoniel-morais.vercel.app](https://ottoniel-morais.vercel.app)

Also available on [GitHub Pages](https://ottonielmorais2008-rgb.github.io/portfolio/).

The page is a static Vite + TypeScript build with Lenis inertial scrolling and GSAP ScrollTrigger reveals. All copy is in English. There is no backend, no analytics and no secret material in the repository.

## Selected work

| Project | Live | Source |
| --- | --- | --- |
| AI Threat Modeler | [Demo](https://ai-threat-modeler.vercel.app) | [Repo](https://github.com/ottonielmorais2008-rgb/ai-threat-modeler) |
| Hallucination Detector | [Demo](https://hallucination-detector-five.vercel.app) | [Repo](https://github.com/ottonielmorais2008-rgb/hallucination-detector) |
| Vulnerability Tracker | [Demo](https://vuln-tracker-seven.vercel.app) | [Repo](https://github.com/ottonielmorais2008-rgb/vuln-tracker) |
| Text-to-SQL Assistant | [Demo](https://text-to-sql-assistant-tau.vercel.app) | [Repo](https://github.com/ottonielmorais2008-rgb/text-to-sql-assistant) |
| Wallet Explorer | [Demo](https://wallet-explorer-ten.vercel.app) | [Repo](https://github.com/ottonielmorais2008-rgb/wallet-explorer) |
| AI CV Analyzer | [Demo](https://ai-cv-analyzer-pink.vercel.app) | [Repo](https://github.com/ottonielmorais2008-rgb/ai-cv-analyzer) |

[All public repositories](https://github.com/ottonielmorais2008-rgb?tab=repositories)

## Run locally

Requires Node.js 22+.

```bash
npm install
npm run dev
```

Then open the local address printed by Vite (it uses the `/portfolio/` base path). Run `npm test` for unit tests and `npm run build` for a production build. GitHub Actions runs the type check, tests and build on every push and pull request, and deploys `main` to GitHub Pages. Pushes to `main` are also deployed to Vercel at the root path (`/`). The Vite `base` stays `/portfolio/` for local dev and GitHub Pages, and switches to `/` on Vercel.

## License

[MIT](LICENSE)
