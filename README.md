# origin-site

Documentation and marketing site for [Origin](https://github.com/fellanH/origin) — the extensible desktop dashboard.

## Stack

- [Vite](https://vitejs.dev/) + [MDX](https://mdxjs.com/)
- Deployed on [Vercel](https://vercel.com)

## Structure (planned)

```
src/
  pages/          # MDX content pages
  components/     # UI components
  layouts/        # Page layouts
public/           # Static assets
```

## Development

```bash
npm install
npm run dev
```

## Content

- **Getting started** — clone starter → dev → build → install → run
- **Plugin API reference** — PluginManifest, PluginContext, PluginComponent
- **Architecture** — plugin:// protocol, registry, import map
- **Plugin gallery** — community plugin showcase
