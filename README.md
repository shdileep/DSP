# DSP — Personal Portfolio

A modern, TypeScript-first personal portfolio for showcasing projects, skills, and contact information. DSP is built for performance, accessibility, and simple deployment to platforms like Vercel, Netlify, or GitHub Pages.

## One-line intro
A fast, accessible developer portfolio built with TypeScript and modern web tooling to showcase projects, blogs, and contact info.

## Key features

- Clean, responsive UI for desktop and mobile
- Project listings with links, tech tags and descriptions
- Easily editable data-driven content (projects, experience, skills)
- SEO-friendly metadata and Open Graph image support
- Performance optimizations (code-splitting, image optimizations)
- Optional contact form or integration with third-party mail services
- CI/CD friendly: ready for Vercel / Netlify / GitHub Pages

## Inferred tech stack

- Languages: TypeScript (primary), JavaScript (auxiliary), Python (utility scripts)
- UI: React (likely) — could be Next.js, Vite + React, or similar
- Styling: CSS Modules / Tailwind / Styled Components (adjust as used)
- Tooling: Node.js, npm or yarn, build tooling (esbuild / webpack / Vite)
- Optional: Vercel / Netlify deployment, GitHub Actions for CI

## Getting started

1. Clone the repo
   ```bash
   git clone https://github.com/shdileep/DSP.git
   cd DSP
   ```
2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```
3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Build for production
   ```bash
   npm run build
   # or
   yarn build
   ```

> Note: Confirm the framework (Next.js, Vite, etc.) in package.json and adjust commands if necessary.

## Common scripts (check package.json)

- dev — start dev server (e.g., next dev, vite)
- build — build production bundle
- start / preview — serve production build locally
- lint — run ESLint
- test — run unit tests
- format — run Prettier

## Deployment

- Vercel: connect the repo and deploy (recommended for Next.js, static and SSR apps)
- Netlify / Cloudflare Pages: connect repo and set build command and publish directory
- GitHub Pages: build and publish the output to gh-pages or use Actions

## Contributing

Contributions welcome. Fork the repo, create a branch, and open a PR with a clear description. Run lint and tests before submitting.

## License

Add a LICENSE file (e.g., MIT) and update this section accordingly.
