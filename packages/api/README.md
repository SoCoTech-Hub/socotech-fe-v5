# TODO:

Fetch the latest types from the api using `pnpm ts` and copy the genereated file from `types\strapi.d.ts` to here `src\types\`
-- or if api is live --
run `pnpm generate:types`

-- then --
run `generate:graphql`
this will generate graphql types for all endpoints on the api
