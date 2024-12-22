const fs = require("fs");
const path = require("path");

const srcDir = path.resolve(__dirname, "../src");
const outputFile = path.resolve(srcDir, "folders.ts");

const generateFolderIndex = (folderPath) => {
  const files = fs.readdirSync(folderPath).filter((file) => {
    const fullPath = path.join(folderPath, file);
    return (
      fs.statSync(fullPath).isFile() &&
      file.endsWith(".ts") &&
      file !== "index.ts"
    );
  });

  const exportStatements = files.map((file) => {
    const fileName = path.basename(file, ".ts");
    return `export * from "./${fileName}";`;
  });

  if (exportStatements.length > 0) {
    fs.writeFileSync(
      path.join(folderPath, "index.ts"),
      exportStatements.join("\n") + "\n",
    );
    console.log(`Generated index.ts in ${folderPath}`);
  }
};

const generateSrcIndex = () => {
  const folders = fs.readdirSync(srcDir).filter((file) => {
    const fullPath = path.join(srcDir, file);
    return fs.statSync(fullPath).isDirectory();
  });

  const exportStatements = folders.map((folder) => {
    const folderPath = path.join(srcDir, folder);
    const indexPath = path.join(folderPath, "index.ts");

    if (!fs.existsSync(indexPath)) {
      generateFolderIndex(folderPath);
    }

    return `export * from "./${folder}";`;
  });

  fs.writeFileSync(outputFile, exportStatements.join("\n") + "\n");
  console.log(`Generated src/folder.ts`);
};

generateSrcIndex();
