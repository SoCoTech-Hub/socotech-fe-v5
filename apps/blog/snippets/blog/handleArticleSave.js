import api from '@/api/api'
import getGQLRequest from '../getGQLRequest'

const handleArticleSave = async ({ id, article }) => {
	try {
		// Fetch saved articles for the profile
		const { savedArticles } = await getGQLRequest({
			endpoint: 'savedArticles',
			fields: 'id,articles{id,title,description,image{url}}',
			where: `profile:"${id}"`
		})

		if (savedArticles.length > 0) {
			// If there are saved articles, add the new article to the list
			const articlesList = [...savedArticles[0].articles, article]
			// Update the existing saved articles entry
			await api.put(`/saved-articles/${savedArticles[0].id}`, {
				articles: articlesList
			})
			return articlesList
		} else {
			// If no saved articles, create a new entry
			const res = await api.post(`/saved-articles/`, {
				profile: { id: id },
				articles: [article]
			})
			return res
		}
	} catch (err) {
		return {
			error: err.message || 'An error occurred while saving the article.'
		}
	}
}

export default handleArticleSave
