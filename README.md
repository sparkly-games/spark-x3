# Spark X3

Spark X3 is an all-in-one unblocked student hub and the spiritual successor to [Sparkly Games](https://github.com/sparkly-games/sparkly). It is built with [Vite](https://vitejs.dev/).

> **Important:** Use of this hub is entirely at your own discretion. You are responsible for following your school's or network's acceptable use policies.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (included with Node.js)

### Installation

Clone the repository, move into the project folder, and install the dependencies:

```bash
git clone https://github.com/sparkly-games/spark-x3.git
cd spark-x3
npm install
```

`git clone` downloads the repository's default branch along with its full history. All other branches are fetched too, so you can switch to them later with `git switch <branch-name>`. If you plan to work on the project, we recommend this method.

### Faster Installation (Shallow Clone)

Cloning the full history can take a while. If you only want to run or host the `instance` branch, you can download just that branch with no history:

```bash
git clone https://github.com/sparkly-games/spark-x3.git -b instance --depth=1
cd spark-x3
npm install
```

What the flags do:

| Flag | Effect |
| --- | --- |
| `-b instance` | Checks out the `instance` branch instead of the default branch. |
| `--depth=1` | Downloads only the latest commit, with no earlier history. This also implies `--single-branch`, so other branches are not fetched. |

If you start with a shallow clone and later decide to contribute, you can fetch the rest of the history without re-cloning:

```bash
git fetch --unshallow
```

If you also want the other branches after a single-branch clone, run:

```bash
git remote set-branches origin '*'
git fetch --all
```

### Run Locally

```bash
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`). Open it in your browser. The page reloads automatically when you change a file.

### Build for Production

```bash
npm run build
```

The output is written to the `dist/` folder. To preview the production build locally before deploying:

```bash
npm run preview
```

## Deployment

Because Spark X3 is a standard Vite project, the `dist/` folder can be hosted on any static hosting provider, for example GitHub Pages, Netlify, Vercel or Cloudflare Pages. Use these settings:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |

The project is adapted for hosting providers with a per-file size limit of 25 MiB or more, such as Cloudflare Pages. The separate `large-files` branch can be cloned and hosted separately, or you can use the `raw.githubusercontent.com` links already provided, which are found in the `public/` folder.

If you deploy to a subpath (such as `https://username.github.io/spark-x3/`), set the `base` option in your Vite config so asset paths resolve correctly. See the [Vite static deploy guide](https://vitejs.dev/guide/static-deploy.html) for provider-specific steps.

## Learning More About Git

This README only covers the commands you need to get started. For everything else, the official Git documentation is the best source:

- [Git documentation home](https://git-scm.com/doc), including the free *Pro Git* book
- [`git clone` reference](https://git-scm.com/docs/git-clone), covering `-b`, `--depth`, `--single-branch` and every other option
- [`git fetch` reference](https://git-scm.com/docs/git-fetch), covering `--unshallow` and fetching other branches
- [`git switch` reference](https://git-scm.com/docs/git-switch), for changing branches

You can also read any command's manual offline with `git help <command>`, for example `git help clone`.

## Contributing

Issues and pull requests are welcome. If you plan a larger change, open an issue first so it can be discussed.

Before contributing, make sure you have the full history (use the standard clone, or run `git fetch --unshallow` if you started with a shallow clone), then create a branch for your change:

```bash
git switch -c my-change
```

## Credits

- Based on the ideas and community around [Sparkly Games](https://github.com/sparkly-games/sparkly).
- Built with [Vite](https://vitejs.dev/).