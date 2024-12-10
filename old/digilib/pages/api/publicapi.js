import { create } from "apisauce"
import { apiUrl } from "@/context/constants"

const publicapi = create({
  baseURL: apiUrl,
})

export default publicapi
