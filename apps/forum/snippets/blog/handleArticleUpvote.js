import api from "@/api/api"
import getGQLRequest from "@/snippets/getGQLRequest"
// import router from "next/router"
const handleArticleUpvote = async ({
  upvoted,
  blogPostSocials,
  blogPostId,
  profileId,
  social,
  organizationId,
  setSocial = () => {},
}) => {
  try {
    if (!blogPostSocials || blogPostSocials === undefined) {
      let res = null
      if (upvoted === "loves") {
        res = await api.post(`/article-likes`, {
          loves: { id: profileId },
        })
        await api.put(`/articles/${blogPostId}`, {
          articleLike: { id: res.data.id },
          organization: { id: organizationId },
        })
        blogPostSocials = res.data.id
        setSocial(res.data)
        //router.reload()
        return res.data
      }
      if (upvoted === "likes") {
        res = await api.post(`/article-likes`, {
          likes: { id: profileId },
        })
        await api.put(`/articles/${blogPostId}`, {
          articleLike: { id: res.data.id },
          organization: { id: organizationId },
        })
        blogPostSocials = res.data.id
        setSocial(res.data)
        //router.reload()
        return res.data
      }
    } else {
      let res = null
      let { profile } = await getGQLRequest({
        endpoint: `profile`,
        findOne: true,
        id: profileId,
        fields: `id`,
      })
      let upDatedSocialsList = social[0]
        ? [...new Set([...social[0][upvoted], profile])]
        : [...new Set([...social[upvoted], profile])]
      if (
        social[0]
          ? !social[0][upvoted].find(
              (e) => parseInt(e.id) === parseInt(profile.id)
            )
          : !social[upvoted].find(
              (e) => parseInt(e.id) === parseInt(profile.id)
            )
      ) {
        if (upvoted === "loves") {
          res = await api.put(`/article-likes/${blogPostSocials}`, {
            loves: upDatedSocialsList,
          })
        }
        if (upvoted === "likes") {
          res = await api.put(`/article-likes/${blogPostSocials}`, {
            likes: upDatedSocialsList,
          })
        }
        setSocial(res.data)
        return res.data
      }
      return
    }
  } catch (err) {
    return err
  }
}

export default handleArticleUpvote
