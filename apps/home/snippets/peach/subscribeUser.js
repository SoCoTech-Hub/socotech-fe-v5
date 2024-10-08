import publicapi from "@/api/publicapi"

const subscribeUser = async ({
  cardholder,
  cardNumber,
  exp,
  cvv,
  amount,
  email,
}) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return
  }

  const transaction = await publicapi.post(`/transactions`, {
    amount: amount,
    currency: "ZAR",
    sendEmail: 1,
    sendSms: 0,
    emailcc: null,
    emailBcc: email,
    paymentId: null,
    expiryTime: null,
    notes: null,
  })

  return transaction
}
export default subscribeUser
