const ObjectsToCsv = require('objects-to-csv')
const catchAsync = require('../utils/catchAsync')
const MeetingReports = require('../utils/meetingReports')
const {
  meetingsCsv,
  participantsCsv,
  pollsCsv
} = require('../utils/formatToCsvData')

exports.getMeetings = catchAsync(async (req, res, next) => {
  MeetingReports.setJwtToken(req.headers)
  const meetings = await MeetingReports.getMeetings(req.query, req.zoomUserId)
  res.json(meetings.data)
})

exports.getMeetingParticipants = catchAsync(async (req, res, next) => {
  const { meetingId } = req.params
  const { nextPageToken } = req.query
  MeetingReports.setJwtToken(req.headers)
  const participantsReport = await MeetingReports.getMeetingParticipants({ meetingId, nextPageToken })
  res.json(participantsReport.data)
})

exports.getMeetingPolls = catchAsync(async (req, res, next) => {
  MeetingReports.setJwtToken(req.headers)
  const pollsReport = await MeetingReports.getMeetingPolls(req.params.meetingId)
  res.json(pollsReport.data)
})

exports.exportMeetingsCsv = catchAsync(async (req, res, next) => {
  const { fromDate, toDate } = req.query
  MeetingReports.setJwtToken(req.headers)
  const meetings = await MeetingReports.getMeetings({ fromDate, toDate, nextPageToken: '', pageSize: 300 }, req.zoomUserId)
  const data = meetingsCsv(meetings.data.meetings)
  const csv = await new ObjectsToCsv(data).toString()
  const filename = `Meetings Report (${fromDate} to ${toDate})`
  res.setHeader("Content-Type", "text/csv")
  res.setHeader("Content-Disposition", `attachment; filename=${filename}.csv`)
  res.status(200).end(csv)
})

exports.exportMeetingParticipantsCsv = catchAsync(async (req, res, next) => {
  const { meetingId } = req.params
  MeetingReports.setJwtToken(req.headers)
  const participants = await MeetingReports.getMeetingParticipants({ meetingId, nextPageToken: '', pageSize: 300 })
  const data = participantsCsv(participants.data.participants)
  const csv = await new ObjectsToCsv(data).toString()
  const filename = `Participants - Meeting ${meetingId}`
  res.setHeader("Content-Type", "text/csv")
  res.setHeader("Content-Disposition", `attachment; filename=${filename}.csv`)
  res.status(200).end(csv)
})

exports.exportMeetingPollsCsv = catchAsync(async (req, res, next) => {
  MeetingReports.setJwtToken(req.headers)
  const polls = await MeetingReports.getMeetingPolls(req.params.meetingId)
  const data = pollsCsv(polls.data.questions)
  const csv = await new ObjectsToCsv(data).toString()
  const filename = `Polls - Meeting ${req.params.meetingId}`
  res.setHeader("Content-Type", "text/csv")
  res.setHeader("Content-Disposition", `attachment; filename=${filename}.csv`)
  res.status(200).end(csv)
})