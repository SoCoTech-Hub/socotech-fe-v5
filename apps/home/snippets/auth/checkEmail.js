import publicapi from "@/api/publicapi"

const checkEmail = async ({ email }) => {
  if (typeof window === "undefined") {
    return
  }
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  return publicapi
    .get(`${API_URL}/users?email=${email}`)
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log("An error occurred:", error.response)
    })
}

export default checkEmail
