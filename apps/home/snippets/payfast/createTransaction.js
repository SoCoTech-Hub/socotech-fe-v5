import publicapi from '@/api/publicapi'
import generateUniqueId from '@/snippets/auth/generateUniqueId'
import { domain } from '@/context/constants'

const createTransaction = async ({ data }) => {
  //prevent function from being ran on the server
  if (typeof window === 'undefined') {
    return
  }
  const uniqueId = generateUniqueId({
    organization: data.orgId,
  })
  try {
    const transaction = await publicapi.post(`/transactions`, {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      cellnr: data?.cellnr,
      amount: data?.amount,
      item: data?.item,
      description: data?.description,
      emailConfirmation: data?.emailConfirmation,
      confirmationAddress: data?.email,
      paymentMethod: data?.paymentMethod,
      subscriptionType: data?.subscriptionType,
      billingDate: data?.billingDate,
      recurringAmount: data?.recurringAmount,
      frequency: data?.frequency,
      cycles: data?.cycles,
      mPaymentId: uniqueId,
      company: data.company,
      vatNr: data?.vatNr,
      addressLine1: data?.addressLine1,
      provinceId: data?.provinceId,
      postalCode: data?.postalCode,
      additionalInformation: data?.additionalInformation,
      password: data?.password,
      orgId: data?.orgId?.id,
    })
    return transaction
  } catch (error) {
    console.info(error)
    return
  }
}

export default createTransaction
