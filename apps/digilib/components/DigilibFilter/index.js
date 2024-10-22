import { useState, useEffect } from 'react'
import DefaultSelectNew from '@/components/DefaultSelectNew'
import Btn from '@/components/Btn'
import getGQLRequest from '@/snippets/getGQLRequest'
import getFilterLists from '@/snippets/getFilterLists'

const index = ({ articleList, setArticleList, organizationId, categoryId }) => {
	const [grades, setGrades] = useState([])
	const [gradeFilter, setGradeFilter] = useState(null)
	// const [topics, setTopics] = useState([])
	// const [topicFilter, setTopicFilter] = useState(null)
	const [subjects, setSubjects] = useState([])
	const [subjectFilter, setSubjectFilter] = useState(null)
	const [languages, setLanguages] = useState([])
	const [languageFilter, setLanguageFilter] = useState(null)
	const [releaseYears, setReleaseYears] = useState([])
	const [releaseYearFilter, setReleaseYearFilter] = useState(null)
	const [releaseYearName, setReleaseYearName] = useState('')
	const [languageName, setLanguageName] = useState('')
	const [initialArticles] = useState(articleList)

	useEffect(async () => {
		let result = await getFilterLists({
			initialArticles
		})

		setGrades(result.grades)
		// setTopics(result.topics)
		setSubjects(result.subjects)
		setLanguages(result.languages)
		setReleaseYears(result.releaseYears)
	}, [])
	useEffect(async () => {
		if (languageFilter) {
			setLanguageName(languages.filter((x) => x.id === languageFilter)[0].name)
		}
		if (releaseYearFilter) {
			setReleaseYearName(
				releaseYears.filter((x) => x.id === releaseYearFilter)[0].name
			)
		}
	}, [languageFilter, releaseYearFilter])

	const applyFilters = async () => {
		let customWhere = ''
		// if (topicFilter) {
		// 	customWhere = customWhere + `, topics:{id:[${topicFilter}]}`
		// }
		if (subjectFilter) {
			customWhere = customWhere + `, subject:{id:${subjectFilter}}`
		}
		if (gradeFilter) {
			customWhere = customWhere + `, grades:{id:${gradeFilter}}`
		}
		if (releaseYearName) {
			customWhere = customWhere + `, releaseYear_contains:"${releaseYearName}"`
		}
		if (languageName) {
			customWhere = customWhere + `, language:"${languageName}"`
		}
		let { knowledgeBases } = await getGQLRequest({
			endpoint: `knowledgeBases`,
			where: `categories:{id:[${categoryId}]},organization:{id:[${parseInt(
				organizationId
			)}]},${customWhere}`,
			// fields: `id,link,name,topics{name}`
			fields: `id,link,name`
		})
		setArticleList(knowledgeBases)
	}
	const clearFilters = async () => {
		setArticleList(initialArticles)
		setLanguageFilter(null)
		setReleaseYearFilter(null)
		setReleaseYearName('')
		setLanguageName('')
		// setTopicFilter(null)
		setSubjectFilter(null)
		setGradeFilter(null)
	}

	return (
		<div className='p-3 rounded-lg shadow-md bg-compBg'>
			<div className='mb-2 text-lg text-textColor mobile:mb-1'>Filter</div>
			<div className='grid gap-2 place-items-stretch'>
				{grades.length > 0 && (
					<DefaultSelectNew
						placeholder='Grade'
						options={grades}
						valueSetter={setGradeFilter}
						value={gradeFilter}
						name='grade'
						id='grade'
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
				{/* {topics?.length > 0 && (
					<DefaultSelectNew
						placeholder='Topic'
						options={topics}
						valueSetter={setTopicFilter}
						value={topicFilter}
						name='topic'
						id='topic'
					/>
				)} */}
				{languages?.length > 0 && (
					<DefaultSelectNew
						placeholder='Language'
						options={languages}
						valueSetter={setLanguageFilter}
						value={languageFilter}
						name='language'
						id='language'
					/>
				)}
				{releaseYears?.length > 0 && (
					<DefaultSelectNew
						placeholder='Release Year'
						options={releaseYears}
						valueSetter={setReleaseYearFilter}
						value={releaseYearFilter}
						name='releaseYear'
						id='releaseYear'
					/>
				)}
			</div>
			<div className='flex gap-5 pt-3 pb-2'>
				<div className='flex flex-row justify-end w-full gap-x-2 mobile:justify-center'>
					<Btn
						label='Clear Filters'
						color='bg-themeColorMain'
						onClickFunction={clearFilters}
					/>
					<Btn
						label='Apply Filters'
						color='bg-themeColorMain'
						onClickFunction={applyFilters}
					/>
				</div>
			</div>
		</div>
	)
}

export default index
