const generateUniqueId = ({ organization, userid = 0 }) => {
  const date = Math.floor(new Date().getTime() / 1000.0)
  const total = date + userid
  const code = organization.name.slice(0, 1) + total.toString(16) + 'PC'
  return code.toUpperCase()
}

export default generateUniqueId
