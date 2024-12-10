import api from "@/api/api"
import getDataRequest from "@/snippets/getDataRequest"

const handleArticleSave = async ({
  id,
  article,
  setSavedArticlesList = () => {},
}) => {
  const res = await getDataRequest(`/saved-articles?profile=${id}`, () => {})
  try {
    let articles = []
    if (res.length > 0) {
      const articleslist = res[0].articles
      articleslist.push(article)
      await api
        .put(`/saved-articles/${res[0].id}`, {
          articles: articleslist,
        })
        .then((response) => {
          setSavedArticlesList(response.data.articles)

          articles = response.data.articles
        })
    } else {
      await api
        .post(`/saved-articles/`, {
          profile: { id: id },
          articles: article,
        })
        .then((response) => {
          setSavedArticlesList(response.data.articles)
          articles = response.data.articles
        })
    }
    return {
      articles: articles,
    }
  } catch (err) {
    return err
  }
}

export default handleArticleSave
