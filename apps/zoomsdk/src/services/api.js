const { create } = require('apisauce')

const api = create({
  baseURL: process.env.ZOOM_JWT_API_URL
})

module.exports = api