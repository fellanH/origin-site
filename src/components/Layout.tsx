import { NavLink, Outlet } from 'react-router'

export default function Layout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-200">
        <nav className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-8">
          <NavLink to="/" className="font-semibold text-lg tracking-tight">
            Origin
          </NavLink>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <NavLink
              to="/getting-started"
              className={({ isActive }) =>
                isActive ? 'text-gray-900 font-medium' : 'hover:text-gray-900'
              }
            >
              Getting Started
            </NavLink>
            <NavLink
              to="/plugin-api"
              className={({ isActive }) =>
                isActive ? 'text-gray-900 font-medium' : 'hover:text-gray-900'
              }
            >
              Plugin API
            </NavLink>
            <NavLink
              to="/architecture"
              className={({ isActive }) =>
                isActive ? 'text-gray-900 font-medium' : 'hover:text-gray-900'
              }
            >
              Architecture
            </NavLink>
            <NavLink
              to="/plugins"
              className={({ isActive }) =>
                isActive ? 'text-gray-900 font-medium' : 'hover:text-gray-900'
              }
            >
              Plugins
            </NavLink>
          </div>
          <div className="ml-auto">
            <a
              href="https://github.com/fellanH/origin"
              className="text-sm text-gray-600 hover:text-gray-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <article>
          <Outlet />
        </article>
      </main>
    </div>
  )
}
