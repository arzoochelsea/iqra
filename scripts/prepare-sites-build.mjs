import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    shell: process.platform === "win32",
    stdio: "inherit",
  });

  if (result.status !== 0) process.exit(result.status ?? 1);
}

run("opennextjs-cloudflare", ["build"]);

const handlerPath = ".open-next/server-functions/default/handler.mjs";
const handler = await readFile(handlerPath, "utf8");
const requireShim = "const require = (specifier) => process.getBuiltinModule(specifier.replace(/^node:/, \"\"));\n";
await writeFile(handlerPath, `${requireShim}${handler}`);

run("wrangler", ["deploy", "--dry-run", "--outdir", ".sites-bundle"]);

await mkdir(".open-next", { recursive: true });
await copyFile(".sites-bundle/worker.js", ".open-next/worker.js");
