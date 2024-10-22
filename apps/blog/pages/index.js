import { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import BlogWelcome from '@/components/BlogWelcome'
import BlogSearch from '@/components/BlogSearch'
import BlogSavedArticles from '@/components/BlogSavedArticles'
import BlogPost from '@/components/BlogPost'
import DigilibLoad from '@/components/DigilibLoad'
import { organizationId, orgName, profileId } from '@/context/constants'
import getGQLRequest from '@/snippets/getGQLRequest'
import handleArticleSave from '@/snippets/blog/handleArticleSave'
import { useRouter } from 'next/router'
import { SEO } from '@/components/SeoHead'

const Home = () => {
	const [articles, setArticles] = useState([])
	const [savedArticlesList, setSavedArticlesList] = useState([])
	const [loading, setLoading] = useState(true)
	const [searchFound, setSearchFound] = useState([])
	const router = useRouter()

	// Router events to track loading state
	useEffect(() => {
		const handleStart = () => setLoading(true)
		const handleComplete = () => setLoading(false)

		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleComplete)

		return () => {
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleComplete)
		}
	}, [])

	// Fetch saved articles
	useEffect(() => {
		const fetchSavedArticles = async () => {
			if (profileId) {
				setLoading(true)
				const { savedArticles } = await getGQLRequest({
					endpoint: 'savedArticles',
					where: `profile:{id:${profileId}}`,
					fields: 'articles{id,title,description,published_at,image{url}}',
					sort: 'articles.id:desc'
				})
				setSavedArticlesList(
					savedArticles.length ? savedArticles[0]?.articles : []
				)
				setLoading(false)
			}
		}
		fetchSavedArticles()
	}, [profileId])
	// Fetch all articles for the organization
	useEffect(() => {
		const fetchArticles = async () => {
			if (organizationId) {
				const date = new Date()
				const isodate = date.toISOString()

				const articlesData = await getGQLRequest({
					endpoint: 'articles',
					fields:
						'id,title,description,published_at,image{url,formats},articleLike{id},author{firstName,lastName,profilePic{id,url,formats}}',
					where: `organization:{id:${organizationId}},published_at_lte:"${isodate}"`,
					sort: 'published_at:desc'
				})

				setArticles(articlesData.articles)
				setSearchFound(articlesData)
			}
		}
		setLoading(true)
		fetchArticles()
		setLoading(false)
	}, [organizationId])

	useEffect(() => {
		setLoading(true)
		if (searchFound !== articles) {
			setSearchFound(articles)
			if (searchFound) {
				setLoading(false)
			}
		}
		setLoading(false)
	}, [articles])
	const saveArticle = async (event) => {
		const targetId = parseInt(event.target.id)
		if (
			savedArticlesList.find(({ id }) => parseInt(id) === parseInt(targetId))
		) {
			return
		}
		const article = articles.find(
			({ id }) => parseInt(id) === parseInt(targetId)
		)
		const res = await handleArticleSave({
			id: profileId,
			article: article
		})
		setSavedArticlesList(res)
	}

	const seo = {
		title: `${orgName ? orgName : 'Sunceple'} - Blogs`,
		description:
			"A whirlwind of wisdom, and wild adventures. It's the ultimate brain buffet, serving up captivating stories and mind-blowing insights."
	}

	return (
		<div className='col row'>
			<SEO
				description={seo.description}
				title={seo.title}
			/>
			<div className='pt-2.5 space-y-5 desktop:pb-5'>
				<div className='col-12 mobile:visible desktop:block '>
					<BlogWelcome />
				</div>
				<div className='col-span-12 rounded-md shadow-md'>
					<BlogSearch
						setSearchFound={setSearchFound}
						articles={articles}
					/>
				</div>
				<div className='flex w-full gap-2 mobile:flex-wrap mobile:pb-20'>
					<div className='desktop:w-1/3 laptop:w-1/3 mobile:w-full desktop:pr-3'>
						<BlogSavedArticles
							savedArticles={savedArticlesList}
							setSavedArticlesList={setSavedArticlesList}
						/>
					</div>

					<div className='overflow-scroll desktop:w-2/3 laptop:w-2/3 mobile:w-full no-scrolly'>
						<div className='flex flex-wrap gap-x-2 gap-y-4 '>
							{loading ? (
								<div className='flex w-full place-content-center h-72'>
									<DigilibLoad />
								</div>
							) : (
								<Scrollbars
									style={{ height: '760px' }}
									renderThumbVertical={({ style, ...props }) => (
										<div
											{...props}
											className='rounded-md bg-themeColorMain'
											style={{ ...style }}
										/>
									)}
								>
									{searchFound.length > 0 &&
										searchFound.map((blogpost) => (
											<BlogPost
												imgSrc={
													blogpost.image?.url
														? blogpost.image?.url
														: blogpost.image?.formats
														? blogpost.image.formats?.thumbnail?.url
														: ''
												}
												title={blogpost?.title}
												description={blogpost?.description}
												authorName={`${blogpost?.author?.firstName} ${
													blogpost?.author?.lastName
														? blogpost?.author?.lastName
														: ''
												}`}
												authorProfilePic={
													// blogpost?.author?.profilePic != 'null' &&
													// blogpost?.author?.profilePic != undefined
													blogpost?.author.profilePic?.url
												}
												datePosted={blogpost?.published_at}
												blogPostId={blogpost?.id}
												blogPostSocials={blogpost?.articleLike?.id}
												handleArticleSave={saveArticle}
												key={blogpost?.id}
											/>
										))}
								</Scrollbars>
							)}
						</div>
						{searchFound?.length === 0 && !loading && (
							<div align='center'>No Articles found</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
