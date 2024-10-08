This is a custom built Next.js Boilerplate with all the latest udpates and trends and a bit of SocoTech usages

The following can be used to ease the import process along with what you will find inside each folder
// api requests
`"@/api/*"` => "pages/api/_"
// fonts, icons, images
`"@/assets/_"`=> ["assets/*"] // components`"@/components/_"` => ["components/_"]
// graphql queries
`"@/graphql/*"` => ["snippets/graphql/*"]
// hooks
`"@/hooks/*"` => ["hooks/*"]
// theming library
`"@/lib/*"` => ["lib/*"]
// code snippets
`"@/snippets/*"` => ["snippets/*"]
// page styling
`"@/styles/*"` => ["styles/*"]

The aim with this boilerplate is to ease and speed up the process of creating new systems using the SocoTech API
Code is to be written once in the appropriate folder, and referenced where needed
This gives a clean setup and way of coding
also debugging will be substantiully easier since you will know it's only on 1 place to be fixed

To get started:
// install dependencies
yarn
// start development mode
yarn dev
// start production mode (build is included in this command)
yarn start
