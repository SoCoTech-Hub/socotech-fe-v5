const index = ({
	date = 'No Date',
	studentName = 'No User',
	bgImage = 'banner-bg-1',
	reportType = 'No type',
	organization = 'No Organization'
}) => {
	return (
		<div className={`p-4 rounded-lg banner-bg-1 ${bgImage}`}>
			<div className='-mt-5 text-xl text-textColor raleway'>Date {date}</div>
			<div className='flex flex-wrap mt-4'>
				<div className='w-full'>
					<div className='w-6/12 text-4xl font-bold text-textColor raleway'>
						Welcome to {studentName}'s {reportType} report.
					</div>
				</div>

				<div className='w-10/12 mt-4 mb-4 text-textColor raleway'>
					Get a comprehensive overview of your activities on {organization}.
					Follow the steps below to create the report you need to get insights
					into your studying patterns.
				</div>
			</div>
		</div>
	)
}

export default index
