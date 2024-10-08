import Cookies from 'js-cookie'
import publicapi from '@/api/publicapi'
import { domain } from '@/context/constants'

const makePayment = async ({ data }) => {
  //prevent function from being ran on the server
  if (typeof window === 'undefined') {
    return
  }

  try {
    const transaction = await publicapi.post(`/transactions`, {
      merchantId: data.merchantId,
      merchant_key: data.merchantKey,
      name: data.name,
      lastName: data.surname,
      email: data.email,
      mPaymentId: data.mPaymentId,
      amount: data.amount,
      item: data.item,
      description: data.description,
      customInt1: data.customInt1,
      customStr1: data.customStr1,
      customStr2: data.customStr2,
      customStr3: data.customStr3,
      customStr4: data.customStr4,
      customStr5: data.customStr5,
      emailConfirmation: data.emailConfirmation,
      confirmationAddress: data.confirmationAddress,
      paymentMethod: data.paymentMethod,
      subscriptionType: data.subscriptionType,
      billingDate: data.billingDate,
      recurringAmount: data.recurringAmount,
      frequency: data.frequency,
      cycles: data.cycles,
      signature: data.signature,
    })

    if (!transaction.ok) {
      return transaction
    }
    Cookies.remove('transaction', {
      domain: domain,
      secure: true,
    })
    Cookies.set('transaction', transaction.data.id, {
      expires: 7,
      domain: domain,
      secure: true,
    })
    return transaction
  } catch (error) {
    console.info(error)
    return
  }
}

export default makePayment
