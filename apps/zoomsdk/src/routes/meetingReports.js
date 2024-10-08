const express = require('express')
const zoomUser = require('../middlewares/zoomUser')
const meetingReportsController = require('../controllers/meetingReports')

const router = express.Router()

router.get('/', zoomUser, meetingReportsController.getMeetings)
router.get('/participants/:meetingId', meetingReportsController.getMeetingParticipants)
router.get('/polls/:meetingId', meetingReportsController.getMeetingPolls)
router.get('/export-meetings-csv', zoomUser, meetingReportsController.exportMeetingsCsv)
router.get('/export-meeting-participants-csv/:meetingId', meetingReportsController.exportMeetingParticipantsCsv)
router.get('/export-meeting-polls-csv/:meetingId', meetingReportsController.exportMeetingPollsCsv)

module.exports = router
