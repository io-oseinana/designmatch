# ![designmatch-logo.svg](public/designmatch-logo.svg) [DesignMatch](https://designmatch.vercel.app/)
A design comparison tool for front-end developers to match Figma (or any design) images with live code builds. Supports responsive breakpoints, visual diffs, and local storage for projects.

[![GitHub stars](https://img.shields.io/github/stars/io-oseinana/designmatch?style=social)](https://github.com/io-oseinana/designmatch/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/io-oseinana/designmatch?style=social)](https://github.com/io-oseinana/designmatch/network/members)
[![MIT License](https://img.shields.io/github/license/io-oseinana/designmatch)](https://github.com/io-oseinana/designmatch/blob/main/LICENSE)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/io-oseinana/designmatch)

## [Live Demo](https://designmatch.vercel.app/)

![img.png](img.png)

## Why DesignMatch?

As a developer, comparing your code builds (HTML/CSS/JS/Tailwind) against design mocks can be tedious—especially across breakpoints like desktop, tablet, and mobile. DesignMatch simplifies this with instant side-by-side views, and diffs, saving hours of manual QA. It's perfect for solo devs, bootcamps, or teams bridging design-to-code handoffs.


## Features

- **Image Uploads**: Support for PNG/JPG design images from Figma or any tool
- **Live Code Previews**: Paste deployed URLs for real-time comparison
- **Responsive Breakpoints**: Compare desktop, tablet, and mobile views with easy switching
- **Visual Comparisons**: Side-by-side mode.
- **Fullscreen & Component Views**: Zoom in for detailed inspection or focus on specific elements
- **Local Project Storage**: Save and manage projects using IndexedDB (cloud sync planned)
- **Screenshot Generation**: Auto-capture code previews for comparisons (powered by Puppeteer)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- pnpm, yarn, npm, or bun

### Installation

Clone the repository:
```bash
https://github.com/io-oseinana/designmatch.git
```

cd designmatch

and

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running Locally

```bash
npnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.


## Usage

1. Create a new project via the "New Project" form
2. Upload design images for each breakpoint (desktop required; tablet/mobile optional)
3. Enter your live code URL
4. Save and view comparisons in side-by-side, or diff modes

## Built with
- [Next.js](https://nextjs.org/) — React framework for production-grade apps
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Shadcn UI](https://shadcn.com/) — Reusable components
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) — Local storage for projects
- [idb](https://www.npmjs.com/package/idb) — IndexedDB wrapper
- [Puppeteer](https://pptr.dev/) — For screenshot generation

For more, check the [live demo]((https://designmatch.vercel.app/)). 



## Contributing
Contributions are welcome!

1. Fork the repo
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

Please follow the Code of Conduct and check `CONTRIBUTING.md` for guidelines.

## License
Distributed under the MIT License. See [LICENSE](LICENSE) for details

## Acknowledgements
- Inspired by [GreatFrontend](https://www.greatfrontend.com/) for the comparison view design.

## Contact
For questions or suggestions, open an issue on [GitHub](https://github.com/io-oseinana/designmatch-figma-comparison-tool/issues) or reach out on [Twitter](https://x.com/io_oseinana) / [LinkedIn](https://www.linkedin.com/in/io-oseinana).
If you find this project useful, please give it a star on GitHub! ⭐
