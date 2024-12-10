import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req, res) {
	const logFilePath = path.join(process.cwd(), 'logs', 'requests.txt')

	const logData = `Time: ${new Date().toISOString()}\nMethod: ${
		req.method
	}\nURL: ${req.url}\nHeaders: ${JSON.stringify(
		req.headers
	)}\nBody: ${JSON.stringify(req.body)}\n\n`
	try {
		// Ensure the logs directory exists
		await fs.mkdir(path.dirname(logFilePath), { recursive: true })

		// Append the log data to the file
		await fs.appendFile(logFilePath, logData, 'utf8')
		res.status(200).json({ message: 'Request logged successfully' })
	} catch (error) {
		console.error('Error logging the request:', error)
		res.status(500).json({ error: 'Failed to log the request' })
	}
}
