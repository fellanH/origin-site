import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import GettingStarted from './pages/getting-started.mdx'
import PluginApi from './pages/plugin-api.mdx'
import Architecture from './pages/architecture.mdx'
import Plugins from './pages/plugins.mdx'

function Home() {
  return (
    <div className="text-center py-24">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Origin</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
        An extensible desktop dashboard. Build plugins with React, ship them as npm packages.
      </p>
      <div className="flex gap-4 justify-center">
        <a
          href="/getting-started"
          className="px-5 py-2.5 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-700"
        >
          Get started
        </a>
        <a
          href="https://github.com/fellanH/origin"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 border border-gray-300 rounded-md text-sm font-medium hover:border-gray-500"
        >
          GitHub ↗
        </a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="getting-started" element={<GettingStarted />} />
        <Route path="plugin-api" element={<PluginApi />} />
        <Route path="architecture" element={<Architecture />} />
        <Route path="plugins" element={<Plugins />} />
      </Route>
    </Routes>
  )
}
