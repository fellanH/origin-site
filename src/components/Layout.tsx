import { NavLink, Outlet } from "react-router";

const NAV_LINKS = [
  { to: "/getting-started", label: "Getting Started" },
  { to: "/plugin-api", label: "Plugin API" },
  { to: "/plugins", label: "Showcase" },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <header className="sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm">
        <nav className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-2">
          <NavLink
            to="/"
            className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-zinc-50 mr-4"
          >
            Origin
          </NavLink>

          <div className="flex items-center gap-0.5 text-sm">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-medium text-sm"
                    : "px-3 py-1.5 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm"
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="ml-auto">
            <a
              href="https://github.com/fellanH/origin"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
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
  );
}
