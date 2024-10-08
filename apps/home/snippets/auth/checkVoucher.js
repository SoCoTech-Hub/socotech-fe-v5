import publicapi from "@/api/publicapi"

const checkVoucher = async ({ voucher }) => {
  if (typeof window === "undefined") {
    return
  }
  return publicapi
    .get(`/organizations?voucher_in=${voucher}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log("An error occurred:", error.response)
    })
}

export default checkVoucher
