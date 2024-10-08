const api = require('../services/api')

module.exports = async (zoomUserEmail, authorization) => {
  api.addRequestTransform(request => {
    request.headers.Authorization = authorization
  })
  return await api.get(`/users/${zoomUserEmail}`)
}