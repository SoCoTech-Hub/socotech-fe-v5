const { Project } = require("ts-morph");
const path = require("path");
const fs = require("fs");

const contentTypesPath = path.resolve(
  __dirname,
  "../src/types/contentTypes.d.ts",
);
const attributesDir = path.resolve(__dirname, "../src/graphql/attributes");
const queriesDir = path.resolve(__dirname, "../src/graphql/queries");
const combinedDir = path.resolve(__dirname, "../src/graphql/generated");

const project = new Project();
project.addSourceFileAtPath(contentTypesPath);

function createAttributesFile(contentTypeName, fields) {
  const attributesContent = `
export interface ${contentTypeName} {
  id: string;
  attributes: {
    ${fields.map((field) => `${field}: string;`).join("\n    ")}
  };
}
`;

  return attributesContent;
}

function createGraphQLFile(contentTypeName, fields) {
  const graphqlContent = `
query Get${contentTypeName}($limit: Int!) {
  ${contentTypeName.toLowerCase()}(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        ${fields.join("\n        ")}
      }
    }
  }
}
`;

  return graphqlContent;
}

function createCombinedFile(contentTypeName) {
  const combinedContent = `
import { ${contentTypeName} } from "../attributes/${contentTypeName}";

export interface Get${contentTypeName}Response {
  ${contentTypeName.toLowerCase()}: {
    data: ${contentTypeName}[];
  };
}
`;

  return combinedContent;
}

function generateGraphQLFiles() {
  const sourceFile = project.getSourceFileOrThrow(contentTypesPath);
  const interfaces = sourceFile.getInterfaces();

  if (!fs.existsSync(attributesDir)) {
    fs.mkdirSync(attributesDir, { recursive: true });
  }

  if (!fs.existsSync(queriesDir)) {
    fs.mkdirSync(queriesDir, { recursive: true });
  }

  if (!fs.existsSync(combinedDir)) {
    fs.mkdirSync(combinedDir, { recursive: true });
  }

  interfaces.forEach((interfaceDeclaration) => {
    const interfaceName = interfaceDeclaration.getName();
    const attributesProperty = interfaceDeclaration.getProperty("attributes");

    if (!attributesProperty) {
      console.warn(`No attributes property found for ${interfaceName}`);
      return;
    }

    const fields = attributesProperty
      .getTypeNodeOrThrow()
      .getProperties()
      .map((prop) => prop.getName());

    // Generate attributes file
    const attributesContent = createAttributesFile(interfaceName, fields);
    const attributesFilePath = path.join(attributesDir, `${interfaceName}.ts`);
    fs.writeFileSync(attributesFilePath, attributesContent, "utf-8");

    // Generate GraphQL query file
    const graphqlContent = createGraphQLFile(interfaceName, fields);
    const graphqlFilePath = path.join(queriesDir, `${interfaceName}.graphql`);
    fs.writeFileSync(graphqlFilePath, graphqlContent, "utf-8");

    // Generate combined file
    const combinedContent = createCombinedFile(interfaceName);
    const combinedFilePath = path.join(combinedDir, `${interfaceName}.ts`);
    fs.writeFileSync(combinedFilePath, combinedContent, "utf-8");

    console.log(`Generated files for: ${interfaceName}`);
  });
}

generateGraphQLFiles();
