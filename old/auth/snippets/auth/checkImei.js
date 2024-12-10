import publicapi from "@/api/publicapi"

const checkImei = ({ imei, userId }) => {
  if (typeof window === "undefined") {
    return
  }

  return publicapi
    .get(`/profiles?imei="${imei}"&id_nin=${userId}`)
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log("An error occurred:", error.response)
    })
}

export default checkImei
