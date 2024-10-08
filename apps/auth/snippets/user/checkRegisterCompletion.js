export const checkRegisterCompletion = ({ profile }) => {
	// Define the required fields for each step of the registration process
	const registerRequiredFields = {
		A: ['dob', 'mobileNr', 'gender'],
		// B: [
		//   'addresses',
		//   'addresses.addressLine1',
		//   'addresses.town',
		//   'addresses.province',
		//   'addresses.contactNr',
		// ],
		C: ['provinces.id', 'schools.id', 'grades.id']
		// D: ["serialNumber", "imei"],
		// E: ['kins.userRelation', 'kins.firstName', 'kins.lastName', 'kins.mobileNr']
	}

	const registerCompleted = {}
	// Run for all required fields for each step
	Object.keys(registerRequiredFields).map((registerPhase) => {
		registerRequiredFields[registerPhase].map((field) => {
			let keys = field.split('.')
			let info = profile[keys[0]]
			if (keys?.length > 1) {
				if (info?.length >= 1) {
					info = info ? info[0][keys[1]] : null
				} else {
					info = info ? info[keys[1]] : null
				}
			}
			// If the required field info/value is filled on the user object,
			// set the completed as TRUE on their respective register phase (A, B, C, D)
			if (info && registerCompleted[registerPhase] !== false) {
				registerCompleted[registerPhase] = true
			} else {
				registerCompleted[registerPhase] = false
			}
		})
	})

	const objKeys = Object.keys(registerCompleted)

	const notCompleted = objKeys.filter(
		(registerPhase) => registerCompleted[registerPhase] !== true
	)

	if (notCompleted.length) {
		// Return the redirect to the first register phase not completed
		return `/update`
	}

	// If everything is filled properly, return the redirect to the user page
	return '../user'
}
