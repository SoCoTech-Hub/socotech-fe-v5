const fs = require("fs");
const path = require("path");

const SOURCE_FILE = path.resolve(__dirname, "../apps/test/src/middleware.ts");
const TARGET_BASE_DIR = path.resolve(__dirname, "../apps");

function copyMiddlewareFile() {
  if (!fs.existsSync(SOURCE_FILE)) {
    console.error("Source middleware.ts file does not exist:", SOURCE_FILE);
    return;
  }

  // Recursively find all `src` directories in `apps`
  const findSrcDirs = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let srcDirs = [];

    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "src") {
          srcDirs.push(entryPath);
        } else {
          srcDirs = [...srcDirs, ...findSrcDirs(entryPath)];
        }
      }
    }

    return srcDirs;
  };

  const srcDirs = findSrcDirs(TARGET_BASE_DIR);

  if (srcDirs.length === 0) {
    console.warn("No src directories found under", TARGET_BASE_DIR);
    return;
  }

  srcDirs.forEach((targetDir) => {
    const targetFile = path.join(targetDir, "middleware.ts");
    try {
      fs.copyFileSync(SOURCE_FILE, targetFile);
      console.log(`Copied middleware.ts to ${targetFile}`);
    } catch (err) {
      console.error(`Failed to copy middleware.ts to ${targetFile}:`, err);
    }
  });
}

copyMiddlewareFile();
