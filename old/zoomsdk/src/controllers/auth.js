const catchAsync = require('../utils/catchAsync')
const generateSignature = require('../utils/generateSignature')

exports.generateSignature = catchAsync(async (req, res, next) => {
	const signature = generateSignature(req)
	res.json({ signature })
})
