import { exec } from "shelljs";
import { copyFiles } from "./copy-files";

async function main() {
  exec("pnpm run -r --stream dev", {
    async: true,
  });
  copyFiles(true);
}

main();
