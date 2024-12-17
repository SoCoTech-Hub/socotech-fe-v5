import { Project } from "ts-morph";

const project = new Project();
const sourceFile = project.addSourceFileAtPath("./types/contentTypes.d.ts");

// Extract fields dynamically for a specific type (e.g., Article)
const type = sourceFile.getInterfaceOrThrow("Article");
const fields = type.getProperties().map((prop) => prop.getName());

console.log(fields); // Output: ["id", "attributes"]
