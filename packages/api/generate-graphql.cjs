const { Project } = require("ts-morph");
const path = require("path");
const fs = require("fs");

const contentTypesPath = path.resolve(__dirname, "src/types/strapi.d.ts");
const outputDir = path.resolve(__dirname, "src/graphql/queries");

const project = new Project();
project.addSourceFileAtPath(contentTypesPath);

function createTypeScriptQueryFile(contentTypeName, fields) {
  const query =
    `
export const GET_${contentTypeName.toUpperCase()}_QUERY = ` +
    "`" +
    `
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
` +
    "`" +
    `;

export interface ${contentTypeName} {
  id: string;
  attributes: {
    ${fields.map((field) => `${field}: string;`).join("\n    ")}
  };
}

export interface Get${contentTypeName}Response {
  ${contentTypeName.toLowerCase()}: {
    data: ${contentTypeName}[];
  };
}
`;

  return query;
}

function generateGraphQLFiles() {
  const sourceFile = project.getSourceFileOrThrow(contentTypesPath);
  const interfaces = sourceFile.getInterfaces();

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
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

    const query = createTypeScriptQueryFile(interfaceName, fields);

    const outputFilePath = path.join(outputDir, `${interfaceName}.ts`);
    fs.writeFileSync(outputFilePath, query, "utf-8");

    console.log(`Generated TypeScript query for: ${interfaceName}`);
  });
}

generateGraphQLFiles();
