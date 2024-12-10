module.exports = (name) => {
  const email = name.match(/\((.*?)\)/gi)
  if (email === null) return name
  name = name.replace(email[0], '').trim()
  const uid = name.match(/\[(.*?)\]/gi)
  if (uid === null) return name
  return name.replace(uid[0], '').trim()
}