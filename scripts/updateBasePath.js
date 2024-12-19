const fs = require("fs");
const path = require("path");

const microservicesFolder = "./apps";

function updateBasePath(appPath) {
  const folderName = path.basename(appPath);
  const configPath = path.join(appPath, "next.config.ts");

  // Check if the next.config.ts file exists
  if (!fs.existsSync(configPath)) {
    console.error(`next.config.ts not found in ${appPath}`);
    return;
  }

  const existingConfig = fs.readFileSync(configPath, "utf-8");

  // Check if basePath is already defined
  if (existingConfig.includes("basePath")) {
    console.log(`Skipping ${folderName}, basePath already defined.`);
    return;
  }

  // Inject the basePath at the top of the nextConfig object
  const updatedConfig = existingConfig.replace(
    /const nextConfig: NextConfig = \{([\s\S]*?)\}/,
    (match, content) => {
      const trimmedContent = content.trimEnd().replace(/^\s*,/, ""); // Ensure no leading comma
      return `const nextConfig: NextConfig = {\n  basePath: '/${folderName}',\n${trimmedContent.trim()}\n}`;
    },
  );

  // Write the updated config back to the file
  fs.writeFileSync(configPath, updatedConfig, "utf-8");
  console.log(`Updated next.config.ts for ${folderName}`);
}

function processMicroservices() {
  if (!fs.existsSync(microservicesFolder)) {
    console.error(`Microservices folder not found: ${microservicesFolder}`);
    return;
  }

  const apps = fs
    .readdirSync(microservicesFolder)
    .filter((folder) =>
      fs.statSync(path.join(microservicesFolder, folder)).isDirectory(),
    );

  apps.forEach((app) => {
    const appPath = path.join(microservicesFolder, app);
    updateBasePath(appPath);
  });
}

// Run the script
processMicroservices();
