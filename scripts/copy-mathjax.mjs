// Copies the MathJax 3 browser build (es5/, incl. fonts and lazily loaded
// components) from node_modules into public/mathjax so it is served from our
// own origin instead of a CDN. Runs automatically before `dev` and `build`.
import { cpSync, rmSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const pkgDir = dirname(require.resolve("mathjax/package.json"));
const { version } = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dest = join(root, "public", "mathjax");

rmSync(dest, { recursive: true, force: true });
cpSync(join(pkgDir, "es5"), dest, { recursive: true });
console.log(`Copied MathJax ${version} es5 build to public/mathjax`);
