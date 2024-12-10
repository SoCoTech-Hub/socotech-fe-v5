import { gql } from "@apollo/client"
import client from "@/api/apolloClient"

const getGQLRequest = async ({
  endpoint,
  stateSetter,
  orgID,
  findOne = false,
  id,
  fields,
  where = "",
  sort = "",
}) => {
  let customWhere = where ? `,${where}` : ""
  let customSort = sort ? `sort:"${sort}",` : ""
  if (orgID) {
    const { data } = await client.query({
      query: gql`query Get${endpoint}Request { ${endpoint} (${customSort} where:{organization:${orgID}${customWhere}}){ id,name } }`,
      fetchPolicy: "network-only",
    })
    stateSetter ? stateSetter(data[endpoint]) : ""
    return data
  } else {
    if (findOne) {
      const { data } = await client.query({
        query: gql`query Get${endpoint}Request { ${endpoint}( id:${id} ) { ${fields} } }`,
        fetchPolicy: "network-only",
      })
      stateSetter ? stateSetter(data[endpoint]) : ""
      return data
    } else {
      if (fields) {
        const { data } = await client.query({
          query: gql`query Get${endpoint}Request { ${endpoint}${
            where
              ? `(${customSort} where: { ${where} } )`
              : sort
              ? `(${customSort})`
              : ""
          } { ${fields} } }`,
          fetchPolicy: "network-only",
        })
        stateSetter ? stateSetter(data[endpoint]) : ""
        return data
      } else {
        const { data } = await client.query({
          query: gql`query Get${endpoint}Request { ${endpoint}
          ${
            where
              ? `(${customSort} where:{${where}})`
              : sort
              ? `(${customSort})`
              : ""
          } { id, name } }`,
          fetchPolicy: "network-only",
        })
        stateSetter ? stateSetter(data[endpoint]) : ""
        return data
      }
    }
  }
}

export default getGQLRequest
