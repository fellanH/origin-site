import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import GettingStarted from "./pages/getting-started.mdx";
import PluginApi from "./pages/plugin-api.mdx";
import Architecture from "./pages/architecture.mdx";
import Showcase from "./pages/plugins.mdx";

function Home() {
  return (
    <div className="py-24">
      {/* Hero */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold tracking-tight mb-6 leading-tight">
          A desktop workspace that
          <br />
          runs on plugins
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          A tiling workspace where every panel runs a plugin — and every plugin
          is just a React component.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="https://github.com/fellanH/origin/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Download
          </a>
          <a
            href="/getting-started"
            className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium hover:border-gray-500 transition-colors"
          >
            Plugin docs →
          </a>
        </div>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mb-20">
        <div className="rounded-lg border border-gray-100 p-6">
          <div className="text-2xl mb-3">⚡</div>
          <h3 className="font-semibold mb-2">Plugins are React</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Every panel is a React component. If you know React, you can build
            an Origin plugin.
          </p>
        </div>
        <div className="rounded-lg border border-gray-100 p-6">
          <div className="text-2xl mb-3">📦</div>
          <h3 className="font-semibold mb-2">Shipped as npm packages</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Bundle with Vite. Install from a zip, a URL, or the built-in plugin
            browser.
          </p>
        </div>
        <div className="rounded-lg border border-gray-100 p-6">
          <div className="text-2xl mb-3">🪟</div>
          <h3 className="font-semibold mb-2">Tiling layout</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Split panels horizontally or vertically. Resize, rearrange, save
            layouts per workspace.
          </p>
        </div>
      </div>

      {/* Core plugins */}
      <div className="border-t border-gray-100 pt-16">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest text-center mb-8">
          Bundled plugins
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 max-w-2xl mx-auto">
          {[
            { icon: "⌨️", name: "Terminal", desc: "Full PTY terminal" },
            { icon: "🌲", name: "File Tree", desc: "Browse your filesystem" },
            { icon: "✏️", name: "Monaco Editor", desc: "VS Code's editor" },
            { icon: "📝", name: "Notepad", desc: "Per-panel markdown notes" },
            { icon: "🌐", name: "Browser", desc: "Embedded web view" },
            { icon: "🐙", name: "GitHub PRs", desc: "Track pull requests" },
          ].map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-3 rounded-md p-3 bg-gray-50"
            >
              <span className="text-xl">{p.icon}</span>
              <div>
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-xs text-gray-500">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-8">
          <a
            href="/plugins"
            className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-2"
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
        <Route path="architecture" element={<Architecture />} />
        <Route path="plugins" element={<Showcase />} />
      </Route>
    </Routes>
  );
}
