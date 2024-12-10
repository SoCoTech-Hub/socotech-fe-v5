import { useState, useEffect } from 'react'
import DefaultSelectNew from '@/components/DefaultSelectNew'
import Btn from '@/components/Btn'
import getGQLRequest from '@/snippets/getGQLRequest'
import getFilterLists from '@/snippets/user/getFilterLists'

const index = ({
	qualifications,
	setQualifications,
	organizationId,
	faculty
}) => {
	const [degrees, setDegrees] = useState([])
	const [degreeFilter, setDegreeFilter] = useState(null)
	const [degreeName, setDegreeName] = useState('')
	const [subjects, setSubjects] = useState([])
	const [subjectFilter, setSubjectFilter] = useState(null)
	const [initialQualifications] = useState(qualifications)

	useEffect(async () => {
		let result = await getFilterLists({
			initialQualifications
		})
		setSubjects(result.subjects)
		setDegrees(result.degrees)
	}, [])
	useEffect(async () => {
		if (degreeFilter) {
			setDegreeName(degrees.filter((x) => x.id === degreeFilter)[0].name)
		}
	}, [degreeFilter])
	
	const applyFilters = async () => {
		let customWhere = 'faculties:{id:' + faculty?.id + '}'
		if (subjectFilter) {
			customWhere = customWhere + `, subjects:{id:[${subjectFilter}]}`
		}
		if (degreeName) {
			customWhere = customWhere + `, degree_contains:"${degreeName}"`
		}
		let { qualifications } = await getGQLRequest({
			endpoint: `qualifications`,
			where: `organization:{id:${organizationId}},${customWhere}`,
			fields: `id,name,institution,shortDescription,university{logo{url}}`
		})
		setQualifications(qualifications)
	}
	const clearFilters = async () => {
		setQualifications(initialQualifications)
		setDegreeFilter(null)
		setDegreeName('')
		setSubjectFilter(null)
	}
	return (
		<div className='p-3 bg-compBg rounded-lg shadow-menu'>
			<div className='mb-2 text-lg text-textColor'>Filter</div>
			<div className='grid gap-2 place-items-stretch'>
				{degrees?.length > 0 && (
					<DefaultSelectNew
						placeholder='Degree'
						options={degrees}
						valueSetter={setDegreeFilter}
						value={degreeFilter}
						name='degree'
						id='degree'
					/>
				)}
				{subjects?.length > 0 && (
					<DefaultSelectNew
						placeholder='Subject'
						options={subjects}
						valueSetter={setSubjectFilter}
						value={subjectFilter}
						name='subject'
						id='subject'
					/>
				)}
			</div>
			<div className='flex gap-5 pt-3 pb-2 '>
				<div className='flex desktop:flex-wrap laptop:flex-wrap justify-end w-full mobile:justify-center'>
					<div>
						<Btn
							label='Clear Filters'
							color='bg-themeColorMain'
							onClickFunction={clearFilters}
						/>
					</div>
					<div>
						<Btn
							label='Apply Filters'
							color='bg-themeColorMain'
							onClickFunction={applyFilters}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default index
