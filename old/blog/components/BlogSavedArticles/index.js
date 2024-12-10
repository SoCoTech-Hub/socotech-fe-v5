import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Scrollbars } from 'react-custom-scrollbars'
import SavedArticle from './SavedArticle'
import DigilibLoad from '@/components/DigilibLoad'
import Overlay from '@/components/Overlay'

const index = ({ savedArticles, setSavedArticlesList }) => {
	const router = useRouter()
	const [loading, setLoading] = useState(true)
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		router.events.on('routeChangeStart', setLoading(true))
		router.events.on('routeChangeComplete', setLoading(false))
	}, [])
	return (
		<div className='flex flex-col w-full rounded-lg shadow-md bg-compBg desktop:p-3 laptop:p-3 mobile:p-2 mobile:mb-4 desktop:mb-0 text-textColor gap-y-2'>
			<div className='text-lg'>Saved Articles</div>
			<div className='text-base'>
				Hi, want to read an interesting article again?
			</div>
			<div className='text-xs'>
				Here you can find your saved articles to enjoy them again. Remember, you
				can save new articles by clicking on the save button at the bottom of a
				new article.
			</div>
			<hr />
			<div className=' desktop:hidden laptop:hidden'>
				<svg
					version='1.1'
					width='25'
					height='25'
					viewBox='0 0 17 17'
					className='w-8 mx-auto mt-2'
					onClick={() => setIsOpen(!isOpen)}
				>
					<g></g>
					<path
						d='M16 3v2h-15v-2h15zM1 10h15v-2h-15v2zM1 15h15v-2h-15v2z'
						fill='currentColor'
					/>
				</svg>
			</div>
			<Overlay
				bgColor='compBg'
				isOpen={isOpen}
				width='w-3/4'
				height='max-96'
				onClose={() => setIsOpen(false)}
				content={
					<>
						{loading ? (
							<div className='flex justify-center align-middle'>
								<DigilibLoad />
							</div>
						) : (
							<div className='flex flex-wrap my-44-4 h- text-textColor'>
								{savedArticles?.length ? (
									<Scrollbars
										autoHeight
										autoHeightMin={30}
										autoHeightMax={400}
										renderThumbVertical={({ style, ...props }) => (
											<div
												{...props}
												className='rounded-md bg-themeColorMain'
												style={{ ...style }}
											/>
										)}
									>
										{savedArticles.map((blogpost) => (
											<div key={blogpost.id}>
												<SavedArticle
													imgSrc={blogpost.image?.url}
													title={blogpost.title}
													description={
														blogpost?.shortDescription
															? blogpost?.shortDescription
															: blogpost?.description
													}
													blogPostId={blogpost.id}
													key={blogpost.id}
													setSavedArticlesList={setSavedArticlesList}
												/>
											</div>
										))}
									</Scrollbars>
								) : (
									<div className='align-middle text-md'>No articles saved</div>
								)}
							</div>
						)}
					</>
				}
			/>
			<div className='mobile:hidden'>
				{loading ? (
					<div className='flex justify-center align-middle'>
						<DigilibLoad />
					</div>
				) : (
					<div className='flex flex-wrap text-textColor'>
						{savedArticles?.length ? (
							<Scrollbars
								autoHeight
								autoHeightMin={10}
								autoHeightMax={400}
								renderThumbVertical={({ style, ...props }) => (
									<div
										{...props}
										className='rounded-md bg-themeColorMain'
										style={{ ...style }}
									/>
								)}
							>
								{savedArticles.map((blogpost) => (
									<div
										className='my-2'
										key={blogpost.id}
									>
										<SavedArticle
											imgSrc={blogpost.image?.url}
											title={blogpost.title}
											description={
												blogpost?.shortDescription
													? blogpost?.shortDescription
													: blogpost?.description
											}
											blogPostId={blogpost.id}
											key={blogpost.id}
											setSavedArticlesList={setSavedArticlesList}
										/>
									</div>
								))}
							</Scrollbars>
						) : (
							<div className='mx-auto text-md'>No articles saved</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default index
