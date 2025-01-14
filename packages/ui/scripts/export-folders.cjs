const fs = require("fs");
const path = require("path");

// Path to your package.json file
const packageJsonPath = path.resolve(__dirname, "../package.json");
// Path to your src directory
const srcPath = path.resolve(__dirname, "../src");

// Function to recursively scan directories
const getFoldersRecursively = (dir) => {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(dir, dirent.name).replace(srcPath, ""))
    .flatMap((subdir) =>
      [subdir].concat(getFoldersRecursively(path.join(srcPath, subdir))),
    );
};

const main = () => {
  if (!fs.existsSync(packageJsonPath)) {
    console.error("package.json not found");
    process.exit(1);
  }

  if (!fs.existsSync(srcPath)) {
    console.error("src directory not found");
    process.exit(1);
  }

  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  // Scan for folders in src directory
  const folders = getFoldersRecursively(srcPath);

  // Create export entries
  const exports = folders.reduce((acc, folder) => {
    const exportPath = `.${folder.replace(/\\/g, "/")}`;
    acc[`${exportPath}/*`] = {
      types: `./dist/src${folder}/*`,
      default: `./src${folder}/*`,
    };
    return acc;
  }, {});

  // Add the exports to package.json
  packageJson.exports = {
    ...(packageJson.exports || {}),
    ...exports,
  };

  // Write the updated package.json
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2),
    "utf-8",
  );

  console.log("Exports added successfully!");
};

main();
