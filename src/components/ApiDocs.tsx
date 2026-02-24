/**
 * ApiDocs — renders auto-generated type documentation from src/generated/api-types.json.
 *
 * Usage in MDX:
 *   import { InterfaceDoc, TypeAliasDoc, FunctionDoc } from '../components/ApiDocs'
 *
 *   <InterfaceDoc name="PluginManifest" />
 *   <TypeAliasDoc name="PluginLifecycleEvent" />
 *   <FunctionDoc name="useBusChannel" />
 */

import apiTypes from "../generated/api-types.json";

// ─── Shared primitives ────────────────────────────────────────────────────────

function TypeBadge({ type }: { type: string }) {
  return (
    <code className="text-xs bg-gray-100 text-indigo-700 px-1.5 py-0.5 rounded font-mono">
      {type}
    </code>
  );
}

function OptionalBadge() {
  return (
    <span className="text-xs text-gray-400 ml-1.5 font-mono">optional</span>
  );
}

function ExampleBlock({ code }: { code: string }) {
  // Strip surrounding ```ts / ``` fences if present
  const clean = code
    .replace(/^```\w*\n?/, "")
    .replace(/\n?```$/, "")
    .trim();
  return (
    <pre className="mt-2 text-xs bg-gray-50 border border-gray-200 rounded p-3 overflow-x-auto font-mono leading-relaxed text-gray-700">
      {clean}
    </pre>
  );
}

// ─── Interface doc ────────────────────────────────────────────────────────────

type InterfaceEntry = (typeof apiTypes.interfaces)[number];

export function InterfaceDoc({ name }: { name: string }) {
  const entry = apiTypes.interfaces.find((i) => i.name === name);
  if (!entry) {
    return (
      <p className="text-red-500 text-sm">
        ⚠ No interface named &ldquo;{name}&rdquo; found in api-types.json
      </p>
    );
  }
  return <InterfaceCard entry={entry} />;
}

function InterfaceCard({ entry }: { entry: InterfaceEntry }) {
  const hasMembers = entry.properties.length > 0 || entry.methods.length > 0;
  return (
    <div className="not-prose my-6 border border-gray-200 rounded-lg overflow-hidden text-sm">
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-baseline gap-3">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          interface
        </span>
        <span className="font-mono font-semibold text-gray-900">
          {entry.name}
        </span>
      </div>
      {entry.description && (
        <p className="px-4 pt-3 pb-0 text-gray-600 leading-relaxed">
          {entry.description}
        </p>
      )}
      {hasMembers && (
        <table className="w-full text-left border-collapse mt-3">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-4 py-2 text-xs font-medium text-gray-500 w-1/4">
                Member
              </th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 w-1/3">
                Type
              </th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {entry.properties.map((p) => (
              <tr key={p.name} className="border-b border-gray-50">
                <td className="px-4 py-2.5 font-mono text-xs text-gray-800 align-top">
                  {p.name}
                  {p.optional && <OptionalBadge />}
                </td>
                <td className="px-4 py-2.5 align-top">
                  <TypeBadge type={p.type} />
                </td>
                <td className="px-4 py-2.5 text-gray-600 align-top leading-relaxed">
                  {p.description || "—"}
                </td>
              </tr>
            ))}
            {entry.methods.map((m) => (
              <MethodRow key={m.name} method={m} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

type MethodEntry = InterfaceEntry["methods"][number];

function MethodRow({ method }: { method: MethodEntry }) {
  const paramStr = method.parameters
    .map((p) => `${p.name}: ${p.type}`)
    .join(", ");
  const sig = `${method.name}(${paramStr}): ${method.returns}`;

  return (
    <tr className="border-b border-gray-50">
      <td className="px-4 py-2.5 font-mono text-xs text-gray-800 align-top">
        {method.name}
      </td>
      <td className="px-4 py-2.5 align-top">
        <TypeBadge type={sig} />
      </td>
      <td className="px-4 py-2.5 text-gray-600 align-top leading-relaxed">
        {method.description || "—"}
        {method.example && <ExampleBlock code={method.example} />}
      </td>
    </tr>
  );
}

// ─── Type alias doc ───────────────────────────────────────────────────────────

type TypeAliasEntry = (typeof apiTypes.typeAliases)[number];

export function TypeAliasDoc({ name }: { name: string }) {
  const entry = apiTypes.typeAliases.find((t) => t.name === name);
  if (!entry) {
    return (
      <p className="text-red-500 text-sm">
        ⚠ No type alias named &ldquo;{name}&rdquo; found in api-types.json
      </p>
    );
  }
  return <TypeAliasCard entry={entry} />;
}

function TypeAliasCard({ entry }: { entry: TypeAliasEntry }) {
  return (
    <div className="not-prose my-6 border border-gray-200 rounded-lg overflow-hidden text-sm">
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-baseline gap-3">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          type
        </span>
        <span className="font-mono font-semibold text-gray-900">
          {entry.name}
        </span>
      </div>
      <div className="px-4 py-3 space-y-1.5">
        {entry.description && (
          <p className="text-gray-600 leading-relaxed">{entry.description}</p>
        )}
        <TypeBadge type={entry.type} />
      </div>
    </div>
  );
}

// ─── Function / hook doc ──────────────────────────────────────────────────────

type FunctionEntry = (typeof apiTypes.functions)[number];

export function FunctionDoc({ name }: { name: string }) {
  const entry = apiTypes.functions.find((f) => f.name === name);
  if (!entry) {
    return (
      <p className="text-red-500 text-sm">
        ⚠ No function named &ldquo;{name}&rdquo; found in api-types.json
      </p>
    );
  }
  return <FunctionCard entry={entry} />;
}

function FunctionCard({ entry }: { entry: FunctionEntry }) {
  return (
    <div className="not-prose my-6 border border-gray-200 rounded-lg overflow-hidden text-sm">
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-baseline gap-3">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          function
        </span>
        <span className="font-mono font-semibold text-gray-900">
          {entry.signature}
        </span>
      </div>
      <div className="px-4 py-3 space-y-3">
        {entry.description && (
          <p className="text-gray-600 leading-relaxed">{entry.description}</p>
        )}
        {entry.parameters.length > 0 && (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-1.5 text-xs font-medium text-gray-500 w-1/4">
                  Parameter
                </th>
                <th className="py-1.5 text-xs font-medium text-gray-500 w-1/3">
                  Type
                </th>
                <th className="py-1.5 text-xs font-medium text-gray-500">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {entry.parameters.map((p) => (
                <tr key={p.name} className="border-b border-gray-50">
                  <td className="py-2 font-mono text-xs text-gray-800 align-top">
                    {p.name}
                    {p.optional && <OptionalBadge />}
                  </td>
                  <td className="py-2 align-top">
                    <TypeBadge type={p.type} />
                  </td>
                  <td className="py-2 text-gray-600 align-top">
                    {p.description || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {entry.example && <ExampleBlock code={entry.example} />}
      </div>
    </div>
  );
}
