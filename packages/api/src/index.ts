import { readdirSync } from "fs";
import path from "path";

const queriesPath = path.join(__dirname, "queries");
const queryFiles = readdirSync(queriesPath).filter((file) =>
  file.endsWith(".ts"),
);

queryFiles.forEach((file) => {
  const module = require(path.join(queriesPath, file));
  Object.assign(exports, module);
});
