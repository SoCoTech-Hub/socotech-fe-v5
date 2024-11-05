import Btn from '@/components/Btn'
// import Loader from "@/components/Loader"
import { getTimeDifferenceFromPostDate } from '@/snippets/user/getTimeDifferenceFromPostDate'
import applyQualification from '@/snippets/user/applyQualification'
// import saveQualification from "@/snippets/user/saveQualification"
import DigilibLoad from '@/components/DigilibLoad'
import {
	BriefcaseIcon,
	BuildingIcon,
	LightbulbIcon
} from '@/components/SvgIcons'

const ApplicationsPost = ({
	loading,
	qualificationId,
	qualificationUrl,
	profileId,
	courseTitle = '',
	companyDescription = '',
	timePosted = '',
	numberOfApplicants = '',
	positionTitle = '',
	fieldDescription = '',
	compareDescription = '',
	topDescription = '',
	responsibilitiesDescription = '',
	requirementsDescription = '',
	applicationFeatureImage = '',
	bgColor = '',
	svgIcon = ''
}) => {
	const apply = async () => {
		await applyQualification({
			profileId,
			qualificationId,
			qualificationUrl
		})
	}
	// const save = async () => {
	//   await saveQualification({
	//     profileId,
	//     qualificationId,
	//   })
	// }
	return (
		<div>
			{loading ? (
				<div className='flex w-full place-content-center h-72'>
					<DigilibLoad loading={loading} />
					{/* <Loader /> */}
				</div>
			) : (
				<div className='p-3 mainPostFrame'>
					<div className='flex pb-2 courseTitleAndMenu'>
						<div className=' bg-compBg desktop:w-14 laptop:w-14 desktop:block laptop:block mobile:hidden'>
							{svgIcon ? (
								<div
									className={`flex place-self-center ${
										bgColor ? bgColor : 'bg-themeColorMain'
									} rounded-lg `}
									style={{ backgroundColor: bgColor }}
								>
									<div
										className='rounded-lg w-14 h-14'
										dangerouslySetInnerHTML={{
											__html: svgIcon
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
						<div className='pl-2 text-xl font-bold mobile:pl-0 text-textColor mobile:text-lg'>
							{courseTitle}
						</div>
						{/* <div className="flex">
            <Link href="">
              <ForwardIcon className="w-10 h-10 cursor-pointer" />
            </Link>
            <DotsMenu links="#" />
          </div> */}
					</div>
					<div className='pb-3 companyInformation text-textColor'>
						{companyDescription ? companyDescription : ''}
						<span className='ml-4 mobile:ml-0 text-textColor'>
							{timePosted && numberOfApplicants
								? getTimeDifferenceFromPostDate(timePosted) +
								  '  -  ' +
								  numberOfApplicants +
								  (numberOfApplicants !== 1 ? ' applicants' : ' applicant')
								: ''}
						</span>
					</div>
					<div className='text-textColor courseInfoLines'>
						{positionTitle && (
							<div className='flex positionLine'>
								<div className='positionIcon'>
									<BriefcaseIcon className='w-10 h-10 ' />
								</div>
								<div className='pt-1 positionTitle'>{positionTitle}</div>
							</div>
						)}
						{fieldDescription && (
							<div className='flex fieldInformation '>
								<div className='fieldIcon'>
									<BuildingIcon className='w-10 h-10 ' />
								</div>
								<div className='pt-1 fieldDescription'>{fieldDescription}</div>
							</div>
						)}
						{compareDescription && (
							<div className='flex compareApplicants text-textColor'>
								<div className='compareIcon'>
									<LightbulbIcon className='w-10 h-10 ' />
								</div>
								<div className='pt-1 compareDescription'>
									{compareDescription}
								</div>
							</div>
						)}
					</div>
					{courseTitle && qualificationUrl && (
						<div className='flex buttonsLine'>
							<div className='applyButton '>
								<Btn
									onClickFunction={apply}
									color='bg-themeColorMain'
									label='Apply'
								/>
							</div>
							{/* <div className="saveButton">
                <Btn
                  onClickFunction={save}
                  color="bg-compBg"
                  label="Save"
                  textSize="text-md"
                  textColor="text-blue-600"
                  borderColor="border-blue-600"
                  padding="p-2"
                />
              </div> */}
						</div>
					)}
					{topDescription && (
						<>
							<div className='pt-10 pb-2 text-textColor'>
								Programme Description:
							</div>
							<div
								className='py-2 text-textColor'
								dangerouslySetInnerHTML={{ __html: topDescription }}
							/>
						</>
					)}
					{responsibilitiesDescription && (
						<>
							<div className='py-2 text-textColor'>Responsibilities:</div>
							<div
								className='py-2 text-textColor'
								dangerouslySetInnerHTML={{
									__html: responsibilitiesDescription
								}}
							/>
						</>
					)}
					{requirementsDescription && (
						<>
							<div className='py-2 text-textColor'>Requirements:</div>
							<div
								className='py-2 text-textColor'
								dangerouslySetInnerHTML={{ __html: requirementsDescription }}
							/>
						</>
					)}
				</div>
			)}
		</div>
	)
}

export default ApplicationsPost
