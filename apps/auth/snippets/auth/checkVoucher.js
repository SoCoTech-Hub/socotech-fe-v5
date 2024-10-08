import publicapi from '@/api/publicapi'

const checkVoucher = async ({ voucher }) => {
  if (typeof window === 'undefined') {
    return
  }
  let response
  if (voucher) {
    response = await publicapi.get(`/vouchers?number=${voucher}`)
    if (response.data.length) {
      const verify = await publicapi.get(
        `/profiles?voucher=${response.data[0].id}`
      )
      if (verify.data.length) {
        return null
      } else {
        return response.data[0]
      }
    }
  }
  return response
}
export default checkVoucher
