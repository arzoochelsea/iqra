import { copyFile, mkdir } from "node:fs/promises";
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
run("wrangler", ["deploy", "--dry-run", "--outdir", ".sites-bundle"]);

await mkdir(".open-next", { recursive: true });
await copyFile(".sites-bundle/worker.js", ".open-next/worker.js");
