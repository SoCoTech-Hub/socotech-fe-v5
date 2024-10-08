import SavedArticle from './SavedArticle'
import { Scrollbars } from 'react-custom-scrollbars'
import { useRouter } from 'next/router'
import DigilibLoad from '@/components/DigilibLoad'
import { useEffect, useState } from 'react'

import {
	// ComponentBg,
	Text
} from '@/context/constants'
import { useAppContext } from '@/context/AppContext'
import Modal from '../Modal'

const index = ({ savedArticles, deleteArticle }) => {
	const router = useRouter()
	const { state } = useAppContext()
	const [loading, setLoading] = useState(true)
	const [showMenu, setShowMenu] = useState(false)

	useEffect(() => {
		router.events.on('routeChangeStart', setLoading(true))
		router.events.on('routeChangeComplete', setLoading(false))
	}, [])
	return (
		<div
			className={`bg-compBg w-full desktop:p-3 laptop:p-3 mobile:p-1 rounded-lg shadow-menu mobile:mb-4 desktop:mb-0 ${Text}`}
		>
			<div className='mb-2 text-lg text-textColor'>Saved Articles</div>
			<div className='mb-2 text-base text-textColor'>
				Hi, want to read an interesting article again?
			</div>
			<div className='text-xs text-textColor'>
				Here you can find your saved articles to enjoy them again. Remember, you
				can save new articles by clicking on the save button at the bottom of a
				new article.
			</div>
			<div className='mx-3 my-3'>
				<hr
				// className={`${ComponentBg}`}
				/>
				<svg
					version='1.1'
					width='25'
					height='25'
					viewBox='0 0 17 17'
					className='w-8 mt-2 ml-32 desktop:hidden laptop:hidden'
					onClick={() => setShowMenu(!showMenu)}
				>
					<g></g>
					<path
						d='M16 3v2h-15v-2h15zM1 10h15v-2h-15v2zM1 15h15v-2h-15v2z'
						fill='currentColor'
					/>
				</svg>
			</div>
			<Modal
				open={showMenu}
				setOpen={setShowMenu}
			>
				{loading ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						{loading ? <DigilibLoad /> : <></>}
					</div>
				) : (
					<div className='flex flex-wrap my-4 text-textColor'>
						<Scrollbars
							autoHeight
							autoHeightMin={10}
							autoHeightMax={400}
							renderThumbVertical={({ style, ...props }) => (
								<div
									{...props}
									style={{ ...style, backgroundColor: '#D6F379' }}
								/>
							)}
						>
							{savedArticles?.length ? (
								savedArticles.map((blogpost) => (
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
											handledeleteArticle={deleteArticle}
										/>
									</div>
								))
							) : (
								<div
									className='text-md'
									align='center'
								>
									No articles saved
								</div>
							)}
						</Scrollbars>
					</div>
				)}
			</Modal>
			<div className='mobile:hidden'>
				{loading ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						{loading ? <DigilibLoad /> : <></>}
					</div>
				) : (
					<div className='flex flex-wrap text-textColor'>
						<Scrollbars
							autoHeight
							autoHeightMin={10}
							autoHeightMax={400}
							renderThumbVertical={({ style, ...props }) => (
								<div
									{...props}
									style={{ ...style, backgroundColor: '#D6F379' }}
								/>
							)}
						>
							{savedArticles?.length ? (
								savedArticles.map((blogpost) => (
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
											handledeleteArticle={deleteArticle}
										/>
									</div>
								))
							) : (
								<div
									className='text-md'
									align='center'
								>
									No articles saved
								</div>
							)}
						</Scrollbars>
					</div>
				)}
			</div>
		</div>
	)
}

export default index
