import Btn from '@/components/Btn'
import { getTimeDifferenceFromPostDate } from '@/snippets/user/getTimeDifferenceFromPostDate'
import DigilibLoad from '@/components/DigilibLoad'
import { BuildingIcon } from '@/components/SvgIcons'
import applyBursary from '@/snippets/user/applyBursary'

const BursaryPost = ({
	loading,
	courseTitle = '',
	companyDescription = '',
	timePosted = '',
	open = '',
	close = '',
	whoQualifies = '',
	application = '',
	particulars = '',
	notes = '',
	value = '',
	iconSvg = '',
	applicationFeatureImage = '',
	bgColor = '',
	numberOfApplicants = '',
	bursaryId,
	bursaryUrl,
	profileId
}) => {
	const apply = async () => {
		await applyBursary({
			bursaryId,
			bursaryUrl,
			profileId
		})
	}
	return (
		<div>
			{loading ? (
				<div className='flex w-full place-content-center h-72'>
					<DigilibLoad loading={loading} />
				</div>
			) : (
				<div className='p-3 mainPostFrame'>
					<div className='flex pb-2 courseTitleAndMenu'>
						<div className=' bg-compBg desktop:w-14 laptop:w-14 desktop:block laptop:block mobile:hidden'>
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
						<div className='pl-2 text-xl font-bold mobile:pl-0 text-textColor'>
							{courseTitle}
						</div>
					</div>
					<div className='pb-3 companyInformation text-textColor'>
						{companyDescription ? companyDescription : ''}
						<span className='ml-4 mobile:pl-0 text-textColor'>
							{timePosted && numberOfApplicants
								? getTimeDifferenceFromPostDate(timePosted) +
								  '  -  ' +
								  numberOfApplicants +
								  (numberOfApplicants !== 1 ? ' applicants' : ' applicant')
								: ''}
						</span>
					</div>
					{open || close ? (
						<div className='text-textColor courseInfoLines'>
							<div className='flex fieldInformation '>
								<div className='fieldIcon'>
									<BuildingIcon className='w-10 h-10 ' />
								</div>
								<div className='pt-1 fieldDescription'>
									{`${open ? open : 'Currently Open'} - ${close ? close : ''}`}
								</div>
							</div>
						</div>
					) : (
						<div className='text-textColor courseInfoLines'>
							<div className='flex fieldInformation '>
								<div className='fieldIcon'>
									<BuildingIcon className='w-10 h-10 ' />
								</div>
								<div className='pt-1 fieldDescription'>{`Date : TBC`}</div>
							</div>
						</div>
					)}
					{courseTitle && bursaryUrl && (
						<div className='flex buttonsLine'>
							<div className='applyButton '>
								<Btn
									onClickFunction={apply}
									color='bg-themeColorMain'
									label='Apply'
								/>
							</div>
						</div>
					)}
					{whoQualifies && (
						<>
							<div className='pt-10 pb-2 text-textColor'>Who Qualifies?</div>
							<div
								className='py-2 text-textColor'
								dangerouslySetInnerHTML={{ __html: whoQualifies }}
							/>
						</>
					)}
					{application && (
						<>
							<div className='py-2 text-textColor'>Applications:</div>
							<div
								className='py-2 text-textColor'
								dangerouslySetInnerHTML={{
									__html: application
								}}
							/>
						</>
					)}
					{value && (
						<>
							<div className='py-2 text-textColor'>Value:</div>
							<div
								className='py-2 text-textColor'
								dangerouslySetInnerHTML={{ __html: value }}
							/>
						</>
					)}
					{particulars && (
						<>
							<div className='py-2 text-textColor'>Particulars:</div>
							<div
								className='py-2 text-textColor'
								dangerouslySetInnerHTML={{
									__html: particulars
								}}
							/>
						</>
					)}
					{notes && (
						<>
							<div className='py-2 text-textColor'>Notes:</div>
							<div
								className='py-2 text-textColor'
								dangerouslySetInnerHTML={{ __html: notes }}
							/>
						</>
					)}
				</div>
			)}
		</div>
	)
}

export default BursaryPost
