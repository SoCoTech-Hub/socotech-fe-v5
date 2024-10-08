import { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import Head from 'next/head'
import BlogWelcome from '@/components/BlogWelcome'
import BlogSearch from '@/components/BlogSearch'
import BlogSavedArticles from '@/components/BlogSavedArticles'
import BlogPost from '@/components/BlogPost'
import DigilibLoad from '@/components/DigilibLoad'
import { organizationId, profileId } from '@/context/constants'
import getGQLRequest from '@/snippets/getGQLRequest'
import handleArticleSave from '@/snippets/blog/handleArticleSave'
import handleArticleDelete from '@/snippets/blog/handleArticleDelete'
import { useRouter } from 'next/router'

const Home = () => {
	const [articles, setArticles] = useState([])
	const [savedList, setSavedList] = useState([])
	const [savedArticlesList, setSavedArticlesList] = useState([])
	const [loading, setLoading] = useState(true)
	const [searchFound, setSearchFound] = useState([])
	const router = useRouter()

	useEffect(() => {
		router.events.on('routeChangeStart', setLoading(true))
		router.events.on('routeChangeComplete', setLoading(false))
	}, [])
	useEffect(async () => {
		setLoading(true)
		if (profileId) {
			const { savedArticles } = await getGQLRequest({
				endpoint: `savedArticles`,
				where: `profile:{id:${profileId}}`,
				fields: `articles{id,title,description,shortDescription,published_at,image{url}}`
			})
			setSavedList(savedArticles)
			savedArticles.map((x) => {
				if (x.articles) {
					x.articles.map((art) => {
						if (
							!savedArticlesList.find(
								(x) => parseInt(x.id) === parseInt(art.id)
							)
						) {
							savedArticlesList.push(art)
						}
					})
				}
			})
			setSavedArticlesList(savedArticlesList)
		}
		setLoading(false)
	}, [profileId, savedList.length])

	useEffect(async () => {
		setLoading(true)
		if (organizationId) {
			var date = new Date()
			date.setHours(date.getHours() + 2)
			var isodate = date.toISOString()

			await getGQLRequest({
				endpoint: `articles`,
				stateSetter: setArticles,
				fields: `id,title,description,published_at,image{url,formats},articleLike{id},author{firstName,lastName,profilePic{id,url,formats}}`,
				where: `organization:{id:${organizationId}},published_at_lte:"${isodate}"`,
				sort: 'published_at:desc'
			})
		}
		setLoading(false)
	}, [organizationId])

	useEffect(async () => {
		setLoading(true)
		setSearchFound(articles)
		if (searchFound) {
			setLoading(false)
		}
	}, [articles])
	const saveArticle = async (event) => {
		const targetId = parseInt(event.currentTarget.id)
		if (savedArticlesList.find(({ id }) => parseInt(id) === targetId)) {
			return
		}
		const article = articles.find(({ id }) => parseInt(id) === targetId)
		let saveResults = await handleArticleSave({
			id: profileId,
			article: article,
			handleArticleSave: setSavedArticlesList
		})
		setSavedArticlesList(saveResults.articles)
	}

	const deleteArticle = async (event) => {
		event.preventDefault()
		const userID = parseInt(profileId)
		await handleArticleDelete(
			event.currentTarget.id,
			userID,
			setSavedArticlesList
		)
	}

	const seo = {
		title: 'Topic - Blogs',
		description:
			"A whirlwind of wisdom, and wild adventures. It's the ultimate brain buffet, serving up captivating stories and mind-blowing insights.",
		image: 'https://lms.topic.co.za/auth/logo.png',
		url: 'https://topic.co.za'
	}

	return (
		<div className='col row'>
			<Head>
				<title>{seo.title}</title>
				<meta
					name='title'
					content={seo.title}
				/>
				<meta
					name='description'
					content={seo.description}
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:url'
					content={seo.url}
				/>
				<meta
					property='og:title'
					content={seo.title}
				/>
				<meta
					property='og:description'
					content={seo.description}
				/>
				<meta
					property='og:image'
					content={seo.image}
				/>

				<meta
					property='twitter:card'
					content='summary_large_image'
				/>
				<meta
					property='twitter:url'
					content={seo.url}
				/>
				<meta
					property='twitter:title'
					content={seo.title}
				/>
				<meta
					property='twitter:description'
					content={seo.description}
				/>
				<meta
					property='twitter:image'
					content={seo.image}
				/>
			</Head>
			<div className='pt-2.5 space-y-5 desktop:pb-5'>
				<div className='col-12 mobile:visible desktop:block '>
					<BlogWelcome />
				</div>
				<div className='col-span-12'>
					<BlogSearch
						setSearchFound={setSearchFound}
						articles={articles}
					/>
				</div>
				<div className='flex w-full gap-2 mobile:flex-wrap mobile:pb-20'>
					<div className='desktop:w-1/3 laptop:w-1/3 mobile:w-full desktop:pr-3'>
						<BlogSavedArticles
							savedArticles={savedArticlesList}
							deleteArticle={deleteArticle}
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
											style={{ ...style, backgroundColor: '#D6F379' }}
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
