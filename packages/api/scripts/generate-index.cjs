const fs = require("fs");
const path = require("path");

const graphqlRoot = path.resolve(__dirname, "src/graphql");
const outputFile = path.join(graphqlRoot, "index.ts");

const directories = ["attributes", "generated", "queries"];

function generateIndexFile() {
  let exportStatements = "import { gql } from 'graphql-tag';\n\n";

  directories.forEach((dir) => {
    const dirPath = path.join(graphqlRoot, dir);

    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);

      files.forEach((file) => {
        const ext = path.extname(file);
        const baseName = path.basename(file, ext);

        if (ext === ".graphql") {
          const relativePath = `./${dir}/${baseName}`;
          exportStatements += `export const ${baseName}Query = gql(require('${relativePath}'));\n`;
        } else if (ext === ".ts") {
          const relativePath = `./${dir}/${baseName}`;
          exportStatements += `export * from "${relativePath}";\n`;
        }
      });
    } else {
      console.warn(`Directory not found: ${dirPath}`);
    }
  });

  fs.writeFileSync(outputFile, exportStatements, "utf8");
  console.log(`Index file generated at ${outputFile}`);
}

generateIndexFile();
