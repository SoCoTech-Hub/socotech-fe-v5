const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

// Routers
const authRoutes = require('./routes/auth')
const meetingReportsRoutes = require('./routes/meetingReports')
const webinarReportsRoutes = require('./routes/webinarReports')

const app = express()
app.use(bodyParser.json(), cors())
app.options('*', cors())
app.use('/zoomsdk', authRoutes)
app.use('/zoomsdk/reports/meetings', meetingReportsRoutes)
app.use('/zoomsdk/reports/webinars', webinarReportsRoutes)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app