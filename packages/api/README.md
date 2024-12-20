# TODO:

- Fetch the latest types from the api using `pnpm ts` and copy the genereated file from `types\generated\` to here `src\types\`

- run `pnpm generate:graphql`
  this will generate graphql types for all endpoints on the api

# Notes

- removed the script: "postbuild": "ts-node ./copy-graphql-files.cjs"
