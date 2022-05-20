import { resolve, join } from "path";
import fs from "fs-extra";
import { debounce } from "lodash";

const PACKAGE_ROOT = resolve(__dirname, "..", "packages");

const DEP_DIST = {
  popup: join(PACKAGE_ROOT, "popup", "dist"),
  background: join(PACKAGE_ROOT, "background", "dist"),
};

const EXTENSION_DIR = join(PACKAGE_ROOT, "extension");
const DIST_DIR = resolve(__dirname, "..", "dist");

const debounceCopy = debounce(fs.copySync);

export function copyFiles(watch = false) {
  // clear
  fs.removeSync(DIST_DIR);
  fs.mkdirSync(DIST_DIR);

  // copy extension files
  fs.copySync(EXTENSION_DIR, DIST_DIR);

  if (watch) {
    fs.watch(
      EXTENSION_DIR,
      {
        recursive: true,
      },
      () => {
        debounceCopy(EXTENSION_DIR, DIST_DIR);
      }
    );
  }

  // copy dist
  for (const [key, source] of Object.entries(DEP_DIST)) {
    const dest = join(DIST_DIR, key);
    if (fs.existsSync(source)) {
      fs.copySync(source, dest);
      if (watch) {
        fs.watch(
          source,
          {
            recursive: true,
          },
          () => {
            debounceCopy(source, dest);
          }
        );
      }
    }
  }
  console.info("Build complete");
}
