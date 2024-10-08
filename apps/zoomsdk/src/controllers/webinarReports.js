const ObjectsToCsv = require('objects-to-csv')
const catchAsync = require('../utils/catchAsync')
const WebinarReports = require('../utils/webinarReports')
const {
  webinarsCsv,
  participantsCsv,
  pollsCsv,
  qaCsv
} = require('../utils/formatToCsvData')

exports.getWebinars = catchAsync(async (req, res, next) => {
  WebinarReports.setJwtToken(req.headers)
  const webinars = await WebinarReports.getWebinars(req.query, req.zoomUserId)
  res.json(webinars.data)
})

exports.getWebinarParticipants = catchAsync(async (req, res, next) => {
  const { webinarId } = req.params
  const { nextPageToken } = req.query
  WebinarReports.setJwtToken(req.headers)
  const participantsReport = await WebinarReports.getWebinarParticipants({ webinarId, nextPageToken })
  res.json(participantsReport.data)
})

exports.getWebinarPolls = catchAsync(async (req, res, next) => {
  WebinarReports.setJwtToken(req.headers)
  const pollsReport = await WebinarReports.getWebinarPolls(req.params.webinarId)
  res.json(pollsReport.data)
})

exports.getWebinarQa = catchAsync(async (req, res, next) => {
  WebinarReports.setJwtToken(req.headers)
  const qaReport = await WebinarReports.getWebinarQa(req.params.webinarId)
  res.json(qaReport.data)
})

exports.exportWebinarsCsv = catchAsync(async (req, res, next) => {
  WebinarReports.setJwtToken(req.headers)
  const webinars = await WebinarReports.getWebinars({ nextPageToken: '', pageSize: 300 }, req.zoomUserId)
  const data = webinarsCsv(webinars.data.webinars)
  const csv = await new ObjectsToCsv(data).toString()
  const filename = `Webinars Report`
  res.setHeader("Content-Type", "text/csv")
  res.setHeader("Content-Disposition", `attachment; filename=${filename}.csv`)
  res.status(200).end(csv)
})

exports.exportWebinarParticipantsCsv = catchAsync(async (req, res, next) => {
  const { webinarId } = req.params
  WebinarReports.setJwtToken(req.headers)
  const participants = await WebinarReports.getWebinarParticipants({ webinarId, nextPageToken: '', pageSize: 300 })
  const data = participantsCsv(participants.data.participants)
  const csv = await new ObjectsToCsv(data).toString()
  const filename = `Participants - Webinar ${webinarId}`
  res.setHeader("Content-Type", "text/csv")
  res.setHeader("Content-Disposition", `attachment; filename=${filename}.csv`)
  res.status(200).end(csv)
})

exports.exportWebinarPollsCsv = catchAsync(async (req, res, next) => {
  WebinarReports.setJwtToken(req.headers)
  const polls = await WebinarReports.getWebinarPolls(req.params.webinarId)
  const data = pollsCsv(polls.data.questions)
  const csv = await new ObjectsToCsv(data).toString()
  const filename = `Polls - Webinar ${req.params.webinarId}`
  res.setHeader("Content-Type", "text/csv")
  res.setHeader("Content-Disposition", `attachment; filename=${filename}.csv`)
  res.status(200).end(csv)
})

exports.exportWebinarQaCsv = catchAsync(async (req, res, next) => {
  WebinarReports.setJwtToken(req.headers)
  const qa = await WebinarReports.getWebinarQa(req.params.webinarId)
  const data = qaCsv(qa.data.questions)
  const csv = await new ObjectsToCsv(data).toString()
  const filename = `Q&A - Webinar ${req.params.webinarId}`
  res.setHeader("Content-Type", "text/csv")
  res.setHeader("Content-Disposition", `attachment; filename=${filename}.csv`)
  res.status(200).end(csv)
})