# Base Setup

## Keep TSC performant in monorepos

- "incremental": true,
- "disableSourceOfProjectReferenceRedirect": true,
- "tsBuildInfoFile": "${configDir}/.cache/tsbuildinfo.json",

## Strictness

- "strict": true,
- "noUncheckedIndexedAccess": true,
- "checkJs": true,

## Transpile using Bundler (not tsc)

- "module": "Preserve",
- "moduleResolution": "Bundler",
- "noEmit": true

# Internal Packages

## Emit types for internal packages to speed up editor performance.

- "declaration": true,
- "declarationMap": true,
- "emitDeclarationOnly": true,
- "noEmit": false,
- "outDir": "${configDir}/dist"
