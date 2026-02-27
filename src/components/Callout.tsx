const VARIANTS = {
  tip: {
    border: "border-emerald-500/30 dark:border-emerald-400/30",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    icon: "💡",
    label: "Tip",
    labelColor: "text-emerald-700 dark:text-emerald-400",
  },
  warning: {
    border: "border-amber-500/30 dark:border-amber-400/30",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    icon: "⚠️",
    label: "Warning",
    labelColor: "text-amber-700 dark:text-amber-400",
  },
  info: {
    border: "border-blue-500/30 dark:border-blue-400/30",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    icon: "ℹ️",
    label: "Note",
    labelColor: "text-blue-700 dark:text-blue-400",
  },
} as const;

type CalloutProps = {
  type?: keyof typeof VARIANTS;
  children: React.ReactNode;
};

export default function Callout({ type = "info", children }: CalloutProps) {
  const v = VARIANTS[type];
  return (
    <div
      className={`border-l-[3px] ${v.border} ${v.bg} rounded-r-lg px-4 py-3 mb-5`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-wide ${v.labelColor} mb-1`}
      >
        {v.icon} {v.label}
      </p>
      <div className="text-sm leading-relaxed [&>p]:mb-0 [&>p]:text-inherit text-zinc-700 dark:text-zinc-300">
        {children}
      </div>
    </div>
  );
}
