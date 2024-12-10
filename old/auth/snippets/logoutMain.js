import Cookies from 'js-cookie'
import api from '@/api/api'
import { domain, userId } from '@/context/constants'

const logout = async () => {
  if (userId) {
    await api.put(`/users/${userId}`, { loggedIn: false })
    await api.post('/page-tracks', {
      time: 0,
      user: userId,
      title: 'Logout',
      url: '/logout',
      action: ['Logout'],
    })
  }
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    var neededAttributes = {
      domain: domain,
      secure: true,
    }
    Cookies.remove(cookieName, neededAttributes)
  })

  window.localStorage.clear()
  window.localStorage.setItem('logout', Date.now())
  return
}
export default logout
