module.exports = (name, userEmail = null) => {
  if (userEmail) return userEmail
  const email = name.match(/\((.*?)\)/gi)
  if (email === null) return name
  return email[0].replace('(', '').replace(')', '')
}