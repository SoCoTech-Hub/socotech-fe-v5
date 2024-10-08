import { create } from "apisauce"
import Cookies from "js-cookie"

const token = Cookies.get("token")

const onResponse = ({ ok, data }) => (ok ? data : null)
const onError = (e) => console.error("Error:", e.message)

const axios = create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
})

const graphQL = (query, variables) =>
  axios
    .post("/graphql", {
      query,
      variables,
    })
    .then(onResponse)
    .then((r) => r.data)
    .catch(onError)

export default graphQL
