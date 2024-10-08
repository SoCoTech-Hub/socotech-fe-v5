const crypto = require('crypto')

const generateSignature = (data) => {
  const passPhrase =
    process.env.NEXT_PUBLIC_TEST == 'true' ? null : 'VzVT6yHrGSRmfEWZj2m9'

  // Create parameter string
  let pfOutput = ''
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] !== '') {
        pfOutput += `${key}=${encodeURIComponent(data[key]).replace(
          /%20/g,
          '+'
        )}&`
      }
    }
  }

  // Remove last ampersand
  let getString = pfOutput.slice(0, -1)
  if (passPhrase !== null) {
    getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(
      /%20/g,
      '+'
    )}`
  }
  return crypto.createHash('md5').update(getString).digest('hex')
}
export default generateSignature
