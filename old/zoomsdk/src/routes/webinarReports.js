const express = require('express')
const zoomUser = require('../middlewares/zoomUser')
const webinarReportsController = require('../controllers/webinarReports')

const router = express.Router()

router.get('/', zoomUser, webinarReportsController.getWebinars)
router.get('/participants/:webinarId', webinarReportsController.getWebinarParticipants)
router.get('/polls/:webinarId', webinarReportsController.getWebinarPolls)
router.get('/qa/:webinarId', webinarReportsController.getWebinarQa)
router.get('/export-webinars-csv', zoomUser, webinarReportsController.exportWebinarsCsv)
router.get('/export-webinar-participants-csv/:webinarId', webinarReportsController.exportWebinarParticipantsCsv)
router.get('/export-webinar-polls-csv/:webinarId', webinarReportsController.exportWebinarPollsCsv)
router.get('/export-webinar-qa-csv/:webinarId', webinarReportsController.exportWebinarQaCsv)

module.exports = router
