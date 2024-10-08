const getFilterLists = async ({ initialArticles }) => {
	// let topicArr = []
	// initialArticles.map((x) => {
	// 	x.topics.map((x) => {
	// 		topicArr.push(x)
	// 	})
	// })

	let subjectArr = []
	initialArticles.map((x) => {
		if (x.subject) {
			subjectArr.push(x.subject)
		}
	})

	let gradeArr = []
	initialArticles.map((x) => {
		if (x.grades) {
			gradeArr.push(...x.grades)
		}
	})

	let languageArr = []
	initialArticles.map((x, index) => {
		if (x.language) {
			languageArr.push({
				id: index,
				name: x.language
			})
		}
	})

	let yearsArr = []
	await initialArticles.map((x, index) => {
		if (x.releaseYear) {
			yearsArr.push({
				id: index,
				name: x.releaseYear.toString()
			})
		}
	})
	let releaseYears = [
		...new Map(yearsArr.map((item) => [item['name'], item])).values()
	]
	releaseYears.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
	return {
		// topics: [...new Map(topicArr.map((item) => [item['name'], item])).values()],
		subjects: [
			...new Map(subjectArr.map((item) => [item['name'], item])).values()
		],
		grades: [...new Map(gradeArr.map((item) => [item['name'], item])).values()],
		languages: [
			...new Map(languageArr.map((item) => [item['name'], item])).values()
		],
		releaseYears: releaseYears
	}
}
export default getFilterLists
