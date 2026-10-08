# Yourbit website

The company website for Yourbit, LLC, published at https://yourbit.network.
Astro builds static HTML and CSS. GitHub Pages hosts it; DNS stays in Route 53.
The design adapts the Yourbit-owned NotiBuddy site's colors, spacing, and visual language.

## Development

Use the Node version in `.nvmrc`, then run:

```sh
npm ci
npm run dev
```

Before committing, run `npm run validate`. Install [Gitleaks](https://github.com/gitleaks/gitleaks)
and run `npm run scan:history` and `npm run scan:dist` before pushing.
Use `npm run preview` to inspect the production build.

## Content

- `src/pages/index.astro`: homepage and product availability copy.
- `src/config.ts`: company contact and product destinations.
- `src/pages/llms.txt.ts`: concise company and product index at `/llms.txt`, generated using the shared site configuration. Keep product availability in sync with the homepage.
- `src/styles/`: shared design tokens and layout styles.
- `public/images/`: reviewed product assets, served locally.
- `/privacy` and `/tos`: company website policies, also available with `.html` suffixes.
- `public/.well-known/nostr.json` and the verification meta tag in `Base.astro`: domain integrations.

The NotiBuddy link uses its working public deployment until its custom domain is ready.
Do not add an App Store download button until a public release URL is available.
All copied assets are public marketing material owned by Yourbit; no private app source,
credentials, pairing bundles, or relay configuration belongs in this repository.

Brand images are checked in. To regenerate them, run `node scripts/generate-brand-assets.mjs`.

## Publishing

Repository Settings → Pages must use **GitHub Actions** as its source, with
`yourbit.network` as the custom domain and HTTPS enabled. A push to `main` runs
secret scanning, dependency auditing, Astro checks, a production build, link checks,
and a scan of the output before publishing that exact artifact.
Pull requests produce downloadable preview artifacts without production credentials.

GitHub Pages controls HTTP security headers; this site cannot set custom response headers
through a `_headers` file. Content is static, contains no client scripts, loads no remote
fonts or embeds, and includes a restrictive CSP meta tag.

For rollback, revert the relevant change on `main` and let the same checks and deployment
run. Keep the custom domain and verification metadata intact. Do not change Route 53
records as part of an ordinary content release.

## Contributions

Open a pull request with a concise description and desktop/mobile screenshots for visual
changes. Use small commits and valid signatures. Maintainers should require **Website
checks** on `main`, disallow deletion and force pushes after any planned history migration,
and review dependency updates rather than merging automatically.

For a security issue, contact contact@yourbit.network without including live credentials
or publishing an exploit containing private information in a public issue.
