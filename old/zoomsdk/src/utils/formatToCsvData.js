const meetingTypes = require('./meetingTypes')
const webinarTypes = require('./webinarTypes')
const formatDuration = require('./formatDuration')
const formatDateTimestamp = require('./formatDateTimestamp')
const extractName = require('./extractName')
const extractEmail = require('./extractEmail')
const extractUniqueId = require('./extractUniqueId')

const meetingsCsv = (meetings) => {
  if (!Array.isArray(meetings) || !meetings.length) return [{ "No Data": "" }]

  return meetings.map(meeting => ({
    "Meeting ID": meeting.id,
    "Topic": meeting.topic,
    "Participants": meeting.participants_count,
    "Type": meetingTypes[meeting.type],
    "Duration": formatDuration(meeting.duration),
    "Start Time": formatDateTimestamp(meeting.start_time),
    "End Time": formatDateTimestamp(meeting.end_time),
  }))
}

const webinarsCsv = (webinars) => {
  if (!Array.isArray(webinars) || !webinars.length) return [{ "No Data": "" }]

  return webinars.map(webinar => ({
    "Webinar ID": webinar.id,
    "Topic": webinar.topic,
    "Type": webinarTypes[webinar.type],
    "Duration": formatDuration(webinar.duration),
    "Start Time": formatDateTimestamp(webinar.start_time),
  }))
}

const participantsCsv = (participants) => {
  if (!Array.isArray(participants) || !participants.length) return [{ "No Data": "" }]

  return participants.map(participant => ({
    "Name": extractName(participant.name),
    "UID": extractUniqueId(participant.name),
    "Email": extractEmail(participant.name, participant.user_email),
    "Join Time": formatDateTimestamp(participant.join_time),
    "Leave Time": formatDateTimestamp(participant.leave_time)
  }))
}

const pollsCsv = (polls) => {
  if (!Array.isArray(polls) || !polls.length) return [{ "No Data": "" }]
  
  const pollReports = []
  polls.map(poll => {
    poll.question_details.map(qd => {
      pollReports.push({
        "Participant": extractName(poll.name),
        "UID": extractUniqueId(poll.name),
        "Email": extractEmail(poll.name),
        "Question": qd.question,
        "Answer": qd.answer.replace(/\;/ig, ','),
        "Answered At": formatDateTimestamp(qd.date_time.split(' ').join('T'))
      })
    })
  })
  return pollReports
}

const qaCsv = (qas) => {
  if (!Array.isArray(qas) || !qas.length) return [{ "No Data": "" }]
  
  const qaReports = []
  qas.map(qa => {
    qa.question_details.map(qd => {
      qaReports.push({
        "Participant": extractName(qa.name),
        "UID": extractUniqueId(qa.name),
        "Email": extractEmail(qa.name),
        "Question": qd.question,
        "Answer": qd.answer !== '' ? qd.answer : 'Answered Live',
      })
    })
  })
  return qaReports
}

module.exports = {
  meetingsCsv,
  webinarsCsv,
  participantsCsv,
  pollsCsv,
  qaCsv
}