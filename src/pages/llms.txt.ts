import type { APIRoute } from 'astro';
import { site } from '../config';

export const GET: APIRoute = () => new Response(`# ${site.name}

> ${site.company} is an independent software engineering company. It builds its own products and helps teams develop useful, dependable software.

The canonical company website is ${site.origin}. Company inquiries: ${site.email}.

Yourbit offers product engineering and full-stack web development, software architecture and cloud infrastructure, and APIs, integrations, and automation. Consulting engagements are covered by separate agreements.

The featured product is NotiBuddy, an iPhone companion that brings questions and updates from AI assistants and connected apps to the phone. It supports replies, choices, and progress updates. The website currently describes the iOS app as in development; the notibuddy CLI and Model Context Protocol (MCP) package is available. Consult the product's own documentation for current availability, setup, and limitations.

This file describes the company website. Individual products have their own documentation, terms, and privacy policies.

## Company

- [Homepage](${site.origin}/): Company overview and featured work.
- [Products](${site.origin}/#products): NotiBuddy overview and availability.
- [Services](${site.origin}/#services): Product engineering, architecture and infrastructure, and connected experiences.
- [About Yourbit](${site.origin}/#about): Company background and approach to usability, privacy, and maintainability.
- [Contact](${site.origin}/#contact): Company contact details and email links.

## NotiBuddy

- [Product website](${site.notibuddy}/): Current public product website, including release information and support links.
- [CLI and MCP documentation](https://raw.githubusercontent.com/yourbit-network/notibuddy/main/README.md): Markdown documentation for the published computer-side package.
- [Public package repository](${site.notibuddySource}): Source code, releases, and package documentation.
- [npm package](https://www.npmjs.com/package/notibuddy): Published notibuddy CLI and MCP package.

## Website policies

- [Website privacy](${site.origin}/privacy): Data handling for visits to this company website and email inquiries.
- [Website terms](${site.origin}/tos): Informational website terms; product use and consulting have separate terms.

## Optional

- [Yourbit on GitHub](${site.github}): Public company repositories.
- [Company website source](${site.github}/yourbit-network.github.io): Source and publishing workflow for this website.
`, {
  headers: { 'Content-Type': 'text/plain; charset=utf-8' },
});
