const api = require('../services/api')

class WebinarReports {
  static setJwtToken({ authorization }) {
    api.addRequestTransform(request => {
      request.headers.Authorization = authorization.startsWith('Bearer ') ? authorization : `Bearer ${authorization}`
    })
  }

  static async getWebinars({ nextPageToken, pageSize }, zoomUserId) {
    return await api.get(
      `/users/${zoomUserId}/webinars`,
      {
        page_size: pageSize || 10,
        next_page_token: nextPageToken,
      }
    )
  }

  static async getWebinarParticipants({ webinarId, nextPageToken, pageSize }) {
    return await api.get(
      `/report/webinars/${webinarId}/participants`,
      {
        page_size: pageSize || 10,
        next_page_token: nextPageToken,
      }
    )
  }

  static async getWebinarPolls(webinarId) {
    return await api.get(`/report/webinars/${webinarId}/polls`)
  }

  static async getWebinarQa(webinarId) {
    return await api.get(`/report/webinars/${webinarId}/qa`)
  }
}

module.exports = WebinarReports