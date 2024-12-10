const getZoomUser = require('../utils/getZoomUser')

module.exports = async (req, res, next) => {
  const email = req.query.zoomUserEmail || req.body.zoomUserEmail
  const userResponse = await getZoomUser(email, req.headers.authorization)
  req.zoomUserId = userResponse.data.id
  next()
}