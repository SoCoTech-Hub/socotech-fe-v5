import api from "@/api/api"

const handleArticleDelete = async (targetId, id, setSavedArticlesList) => {
  try {
    await api.get(`/saved-articles?profile=${id}`).then(async (res) => {
      const articleslist = res.data[0].articles.filter(
        (x) => x.id !== parseInt(targetId)
      )
      await api
        .put(`/saved-articles/${res.data[0].id}`, {
          articles: articleslist,
        })
        .then((response) => {
          setSavedArticlesList(response.data.articles)
        })
    })
  } catch (err) {
    return err
  }
}

export default handleArticleDelete
