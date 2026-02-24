/**
 * Regenerates src/generated/api-types.json from @origin/api TypeScript source.
 *
 * Run from origin-site/:
 *   npm run docs:generate
 *
 * Steps:
 *   1. Runs TypeDoc in ../origin/packages/api  → dist/api-docs.json
 *   2. Extracts clean structured JSON          → src/generated/api-types.json
 *
 * The output file is committed so the site builds without needing @origin/api present.
 * Re-run this script whenever you change types in @origin/api.
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const INPUT = resolve(
  __dirname,
  "../../origin/packages/api/dist/api-docs.json",
);
const OUTPUT_DIR = resolve(__dirname, "../src/generated");
const OUTPUT = resolve(OUTPUT_DIR, "api-types.json");

// TypeDoc kind constants
const KIND = {
  INTERFACE: 256,
  PROPERTY: 1024,
  METHOD: 2048,
  TYPE_ALIAS: 2097152,
  FUNCTION: 64,
};

function commentText(comment) {
  if (!comment) return "";
  return (comment.summary || [])
    .map((p) => p.text)
    .join("")
    .trim();
}

function blockTag(comment, tag) {
  if (!comment?.blockTags) return "";
  const found = comment.blockTags.find((t) => t.tag === `@${tag}`);
  if (!found) return "";
  return found.content
    .map((p) => p.text)
    .join("")
    .trim();
}

function serializeType(type) {
  if (!type) return "unknown";
  switch (type.type) {
    case "intrinsic":
      return type.name;
    case "literal":
      return JSON.stringify(type.value);
    case "union":
      return type.types.map(serializeType).join(" | ");
    case "intersection":
      return type.types.map(serializeType).join(" & ");
    case "reference":
      if (type.typeArguments?.length) {
        return `${type.name}<${type.typeArguments.map(serializeType).join(", ")}>`;
      }
      return type.name;
    case "array":
      return `${serializeType(type.elementType)}[]`;
    case "reflection": {
      // inline function type
      const sig = type.declaration?.signatures?.[0];
      if (sig) return buildSignatureString(sig);
      return "object";
    }
    case "tuple":
      return `[${(type.elements || []).map(serializeType).join(", ")}]`;
    default:
      return type.name ?? "unknown";
  }
}

function buildSignatureString(sig) {
  const params = (sig.parameters || [])
    .map((p) => `${p.name}: ${serializeType(p.type)}`)
    .join(", ");
  const ret = serializeType(sig.type);
  return `(${params}) => ${ret}`;
}

function extractMethod(node) {
  const sig = node.signatures?.[0];
  if (!sig) return null;
  return {
    name: node.name,
    description: commentText(sig.comment),
    parameters: (sig.parameters || []).map((p) => ({
      name: p.name,
      type: serializeType(p.type),
      description: commentText(p.comment),
      optional: p.flags?.isOptional ?? false,
    })),
    returns: serializeType(sig.type),
    example: blockTag(sig.comment, "example"),
  };
}

function extractInterface(node) {
  const properties = [];
  const methods = [];

  for (const child of node.children ?? []) {
    if (child.kind === KIND.PROPERTY) {
      properties.push({
        name: child.name,
        type: serializeType(child.type),
        description: commentText(child.comment),
        optional: child.flags?.isOptional ?? false,
      });
    } else if (child.kind === KIND.METHOD) {
      const m = extractMethod(child);
      if (m) methods.push(m);
    }
  }

  return {
    name: node.name,
    description: commentText(node.comment),
    properties,
    methods,
  };
}

// Walk the TypeDoc tree collecting nodes by kind
function collect(node, kinds) {
  const results = [];
  if (kinds.includes(node.kind)) results.push(node);
  for (const child of node.children ?? []) {
    results.push(...collect(child, kinds));
  }
  return results;
}

// Step 1: Run TypeDoc to regenerate the JSON from source
const API_DIR = resolve(__dirname, "../../origin/packages/api");
console.log("Running TypeDoc on @origin/api…");
execSync("npm run docs", { cwd: API_DIR, stdio: "inherit" });

// Step 2: Extract clean JSON
const raw = JSON.parse(readFileSync(INPUT, "utf-8"));

const interfaces = collect(raw, [KIND.INTERFACE]).map(extractInterface);

const typeAliases = collect(raw, [KIND.TYPE_ALIAS]).map((node) => ({
  name: node.name,
  type: serializeType(node.type),
  description: commentText(node.comment),
}));

const functions = collect(raw, [KIND.FUNCTION]).map((node) => {
  const sig = node.signatures?.[0];
  const typeParams = (sig?.typeParameters ?? [])
    .map((tp) => {
      const constraint = tp.type ? ` extends ${serializeType(tp.type)}` : "";
      const def = tp.default ? ` = ${serializeType(tp.default)}` : "";
      return `${tp.name}${constraint}${def}`;
    })
    .join(", ");

  const params = (sig?.parameters ?? [])
    .map((p) => `${p.name}: ${serializeType(p.type)}`)
    .join(", ");

  const typeParamStr = typeParams ? `<${typeParams}>` : "";
  const signature = `${node.name}${typeParamStr}(${params}): ${serializeType(sig?.type)}`;

  return {
    name: node.name,
    signature,
    description: commentText(sig?.comment),
    example: blockTag(sig?.comment, "example"),
    parameters: (sig?.parameters ?? []).map((p) => ({
      name: p.name,
      type: serializeType(p.type),
      description: commentText(p.comment),
      optional: p.flags?.isOptional ?? false,
    })),
    returns: serializeType(sig?.type),
  };
});

const output = { interfaces, typeAliases, functions };

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
console.log(
  `✓ Extracted ${interfaces.length} interfaces, ${typeAliases.length} type aliases, ${functions.length} functions → ${OUTPUT}`,
);
