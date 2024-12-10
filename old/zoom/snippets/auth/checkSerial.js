import publicapi from "@/api/publicapi"

const checkSerial = (serialNumber, userId) => {
  if (typeof window === "undefined") {
    return
  }
  return publicapi
    .get(`/profiles?serialNumber=${serialNumber}&id_nin=${userId}`)
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log("An error occurred:", error.response)
    })
}

export default checkSerial
