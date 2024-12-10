import Clamp from 'react-multiline-clamp'

const BursaryListing = ({
	id,
	applicationFeatureImage = '',
	courseTitle = 'Course Title Goes Here',
	courseCompanyName = 'Company name goes here',
	courseDescription = 'Description of the job goes here but not all of it. Description of the job goes here but not all of it.',
	setSelection,
	bgColor = '',
	iconSvg = ''
}) => {
	return (
		<div>
			<button onClick={() => setSelection(id)}>
				<div className='flex items-center h-24 align-middle cursor-pointer '>
					<div className='flex flex-wrap items-center content-center h-24 ml-3 mr-3 align-middle '>
						<div className='overflow-hidden rounded-full bg-compBg w-14 h-14'>
							{iconSvg ? (
								<div
									className={`flex place-self-center ${
										bgColor ? bgColor : 'bg-themeColorMain'
									} rounded-lg `}
									style={{ backgroundColor: bgColor }}
								>
									<div
										className='rounded-lg w-14 h-14'
										dangerouslySetInnerHTML={{
											__html: iconSvg
										}}
									/>
								</div>
							) : (
								applicationFeatureImage && (
									<img
										alt=''
										src={applicationFeatureImage?.url}
										className='flex rounded-lg place-self-center w-14 h-14'
									/>
								)
							)}
						</div>
					</div>
					<div className=''>
						<div className='font-semibold leading-tight text-left text-textColor line-clamp-1'>
							<Clamp lines={1}>
								<div
									className=''
									dangerouslySetInnerHTML={{ __html: courseTitle }}
								/>
							</Clamp>
						</div>
						<div className='font-semibold leading-tight text-left text-textColor line-clamp-1'>
							<Clamp lines={1}>
								<div
									className=''
									dangerouslySetInnerHTML={{ __html: courseCompanyName }}
								/>
							</Clamp>
						</div>
						<div className='text-left text-textColor line-clamp-1'>
							<Clamp lines={1}>
								<div
									className=''
									dangerouslySetInnerHTML={{ __html: courseDescription }}
								/>
							</Clamp>
						</div>
					</div>
				</div>
			</button>
		</div>
	)
}
export default BursaryListing
