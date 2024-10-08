const api = require('../services/api')

class MeetingReports {
  static setJwtToken({ authorization }) {
    api.addRequestTransform(request => {
      request.headers.Authorization = authorization.startsWith('Bearer ') ? authorization : `Bearer ${authorization}`
    })
  }

  static async getMeetings({ fromDate, toDate, nextPageToken, pageSize }, zoomUserId) {
    return await api.get(
      `/report/users/${zoomUserId}/meetings`,
      {
        from: fromDate,
        to: toDate,
        page_size: pageSize || 10,
        next_page_token: nextPageToken,
      }
    )
  }
  
  static async getMeetingParticipants({ meetingId, nextPageToken, pageSize }) {
    return await api.get(
      `/report/meetings/${meetingId}/participants`,
      {
        page_size: pageSize || 10,
        next_page_token: nextPageToken,
      }
    )
  }
  
  static async getMeetingPolls(meetingId) {
    return await api.get(`/report/meetings/${meetingId}/polls`)
  }
}

module.exports = MeetingReports