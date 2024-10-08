import Cookies from "js-cookie"
import { create } from "apisauce"
import { apiUrl } from "@/context/constants"

const api = create({
  baseURL: apiUrl,
})

api.addRequestTransform((request) => {
  const jwtToken = Cookies.get("token")
  request.headers.Authorization = `Bearer ${jwtToken}`
})

export default api
