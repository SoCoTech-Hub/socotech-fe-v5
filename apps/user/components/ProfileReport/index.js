import { useEffect, useState } from 'react'
import getGQLRequest from '@/snippets/getGQLRequest'
import List from './list'
import Report from './report'
import DigilibLoad from '../DigilibLoad'
import Btn from '../Btn'

const ProfileReport = () => {
	const [grade, setGrade] = useState(0)
	const [grades, setGrades] = useState([])
	const [subject, setSubject] = useState(null)
	const [subjects, setSubjects] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(async () => {
		await getGQLRequest({
			endpoint: 'grades',
			fields: 'id,name,color,svgIcon,subjects{id,name,color,svgIcon,icon{url}}',
			stateSetter: setGrades
		})
		setLoading(false)
	}, [])
	useEffect(() => {
		if (grade) {
			// Find the grade object with the matching ID
			const selectedGrade = grades.find((g) => g.id === grade.toString())

			// Set subjects if the selected grade is found
			if (selectedGrade) {
				setSubjects(selectedGrade.subjects)
			} else {
				setSubjects([])
			}
		}
	}, [grade])
	if (loading) {
		return <DigilibLoad />
	}

	return (
		<>
			{grades && !grade && (
				<div className='grid w-full desktop:grid-col-5 laptop:grid-col-4 mobile:grid-col-2'>
					<div className='w-full text-xs'>
						<List
							categories={grades}
							setItem={setGrade}
							prefix='Grade'
						/>
					</div>
				</div>
			)}
			{grade && !subject && (
				<div className='grid w-full desktop:grid-col-5 laptop:grid-col-4 mobile:grid-col-2'>
					<Btn
						label='Back'
						onClickFunction={() => setGrade(null)}
						color='mx-2 mb-2'
						textSize='text-md'
						textColor='text-themeColorMain'
						borderColor='border border-themeColorMain border-2'
					/>
					<div className='w-full text-xs'>
						<List
							categories={subjects}
							setItem={setSubject}
							prefix=''
						/>
					</div>
				</div>
			)}
			{subject ? (
				<Report
					setSubject={setSubject}
					subject={subject}
					grade={grade}
				/>
			) : (
				<></>
			)}
		</>
	)
}
export default ProfileReport
