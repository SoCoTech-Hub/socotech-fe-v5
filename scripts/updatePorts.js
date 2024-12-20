const fs = require("fs");
const path = require("path");

const appsDir = path.resolve(__dirname, "../apps");
const portsFilePath = path.resolve(__dirname, "../tooling/config/ports.js");
const basePort = 3001;

// Load current ports
let portsConfig = require("../tooling/config/ports.js");

const getNextAvailablePort = () => {
  const usedPorts = Object.values(portsConfig);
  let port = basePort;
  while (usedPorts.includes(port)) {
    port++;
  }
  return port;
};

const updateAppConfig = (appName, port) => {
  const appPath = path.join(appsDir, appName);
  const nextConfigPath = path.join(appPath, "next.config.ts");
  const packageJsonPath = path.join(appPath, "package.json");

  if (!fs.existsSync(nextConfigPath)) {
    console.warn(`Skipping ${appName}: ${nextConfigPath} is missing.`);
    return;
  }
  if (!fs.existsSync(packageJsonPath)) {
    console.warn(`Skipping ${appName}: ${packageJsonPath} is missing.`);
    return;
  }

  // Update next.config.ts
  const nextConfigContent = fs.readFileSync(nextConfigPath, "utf-8");

  // Check if import already exists
  const importStatement = `import ports from "@acme/config/ports";`;
  if (!nextConfigContent.includes(importStatement)) {
    const updatedContent = `${importStatement}\n${nextConfigContent}`;
    fs.writeFileSync(nextConfigPath, updatedContent);
  }

  // Check if port is already defined in the configuration
  const portConfig = `serverRuntimeConfig: { port: ports.${appName} },`;
  if (!nextConfigContent.includes(portConfig)) {
    const updatedContent = nextConfigContent.replace(
      "const nextConfig: NextConfig = {",
      `const nextConfig: NextConfig = {\n  serverRuntimeConfig: { port: ports.${appName} },`,
    );
    fs.writeFileSync(nextConfigPath, updatedContent);
  }

  // Update package.json scripts
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  packageJson.scripts.start = `next start --port ${port} `;
  packageJson.scripts.dev = `next dev --turbopack --port ${port}`;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};

const updatePorts = () => {
  const appDirs = fs.readdirSync(appsDir).filter((dir) => {
    const dirPath = path.join(appsDir, dir);
    return fs.statSync(dirPath).isDirectory();
  });

  const summary = [];

  appDirs.forEach((appName) => {
    if (!portsConfig[appName]) {
      const port = getNextAvailablePort();
      portsConfig[appName] = port;

      // if (process.argv.includes("--dry-run")) {
      //   summary.push({ appName, port, status: "Dry Run" });
      //   console.log(`Would assign port ${port} to app ${appName}`);
      //   return;
      // }

      try {
        updateAppConfig(appName, port);
        summary.push({ appName, port, status: "Updated" });
        console.log(`Assigned port ${port} to app ${appName}`);
      } catch (error) {
        console.error(`Error updating ${appName}:`, error);
        summary.push({ appName, port, status: "Error" });
      }
    } else {
      summary.push({
        appName,
        port: portsConfig[appName],
        status: "Unchanged",
      });
    }
  });

  // if (process.argv.includes("--dry-run")) {
  //   console.log("Dry run completed. No changes were applied.");
  //   console.table(summary);
  //   return;
  // }

  try {
    const portsContent = `const ports = ${JSON.stringify(portsConfig, null, 2)};\n\nmodule.exports = ports;`;
    fs.writeFileSync(portsFilePath, portsContent);
    console.log("Ports updated successfully!");
  } catch (error) {
    console.error(`Error writing ports file:`, error);
  }

  console.log("Summary of Changes:");
  console.table(summary);
};

updatePorts();
