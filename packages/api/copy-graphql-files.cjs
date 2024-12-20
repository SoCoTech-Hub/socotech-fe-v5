const fs = require("fs");
const path = require("path");

const srcDir = path.resolve(__dirname, "src/graphql/queries");
const destDir = path.resolve(__dirname, "dist/graphql/queries");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.readdirSync(srcDir).forEach((file) => {
  if (path.extname(file) === ".graphql") {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  }
});
