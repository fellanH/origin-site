import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import GettingStarted from "./pages/getting-started.mdx";
import PluginApi from "./pages/plugin-api.mdx";
import Architecture from "./pages/architecture.mdx";
import Showcase from "./pages/plugins.mdx";

const FEATURES = [
  {
    icon: "⚡",
    title: "Plugins are React",
    desc: "Every panel is a React component. If you know React, you can build an Origin plugin.",
  },
  {
    icon: "📦",
    title: "Shipped as npm packages",
    desc: "Bundle with Vite. Install from a zip, a URL, or the built-in plugin browser.",
  },
  {
    icon: "⬛",
    title: "Tiling layout",
    desc: "Split panels horizontally or vertically. Resize, rearrange, save layouts per workspace.",
  },
];

const PLUGINS = [
  { icon: "⌨️", name: "Terminal", desc: "Full PTY terminal" },
  { icon: "🌲", name: "File Tree", desc: "Browse your filesystem" },
  { icon: "✏️", name: "Monaco Editor", desc: "VS Code's editor" },
  { icon: "📝", name: "Notepad", desc: "Per-panel markdown notes" },
  { icon: "🌐", name: "Browser", desc: "Embedded web view" },
  { icon: "🐙", name: "GitHub PRs", desc: "Track pull requests" },
];

function Home() {
  return (
    <div className="py-20">
      {/* Hero */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-500 dark:text-zinc-400 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          Open source · macOS
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-5 leading-[1.1] text-zinc-900 dark:text-zinc-50">
          A desktop workspace
          <br />
          that runs on plugins
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
          A tiling workspace where every panel runs a plugin — and every plugin
          is just a React component.
        </p>
        <div className="flex gap-3 justify-center">
          <a
            href="https://github.com/fellanH/origin/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-md text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
          >
            Download
          </a>
          <a
            href="/getting-started"
            className="px-5 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-md text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
          >
            Plugin docs →
          </a>
        </div>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-20">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="text-2xl mb-3">{f.icon}</div>
            <h3 className="font-semibold mb-1.5 text-zinc-900 dark:text-zinc-50 text-sm">
              {f.title}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Bundled plugins */}
      <div className="border-t border-zinc-100 dark:border-zinc-800 pt-16">
        <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest text-center mb-8">
          Bundled plugins
        </p>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 max-w-xl mx-auto">
          {PLUGINS.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-3 rounded-lg p-3 bg-zinc-50 dark:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors"
            >
              <span className="text-lg shrink-0">{p.icon}</span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">
                  {p.name}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  {p.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-8">
          <a
            href="/plugins"
            className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 underline underline-offset-4 transition-colors"
          >
            View all plugins →
          </a>
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="getting-started" element={<GettingStarted />} />
        <Route path="plugin-api" element={<PluginApi />} />
        <Route path="api-reference" element={<PluginApi />} />
        <Route path="architecture" element={<Architecture />} />
        <Route path="plugins" element={<Showcase />} />
      </Route>
    </Routes>
  );
}
