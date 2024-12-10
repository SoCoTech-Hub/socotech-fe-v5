import Clamp from 'react-multiline-clamp'
import {
	baseUrl
	// PrimaryColor,
	// Text,
	} from '@/context/constants'
import BtnSm from '@/components/BtnSm'

const SavedArticle = ({
	imgSrc,
	title,
	description,
	blogPostId,
	handledeleteArticle
}) => {
	let mediaUrl = imgSrc ? imgSrc : `${baseUrl}/dummypost.png`
	return (
		<div>
			<a href={`${baseUrl}/${blogPostId}`}>
				<div className='flex w-full p-2 rounded-lg cursor-pointer align-items-center shadow-menu'>
					<div className='w-1/3 mr-2'>
						<div className='w-20 overflow-hidden rounded-lg'>
							<img
								src={mediaUrl}
								alt='Blog Image'
								style={{
									width: '100%',
									height: '80px',
									objectFit: 'cover',
									objectPosition: 'center'
								}}
							/>
						</div>
					</div>
					<div className='w-2/3'>
						<div className='w-full p-3 '>
							<div className='w-full text-lg leading-none text-textColor line-clamp-1'>
								<Clamp lines={1}>
									<div
										className=''
										dangerouslySetInnerHTML={{ __html: title }}
									/>
								</Clamp>
							</div>
							<div className='w-full pt-1 text-xs text-textColor line-clamp-2'>
								<Clamp lines={2}>
									<div
										className=''
										dangerouslySetInnerHTML={{ __html: description }}
									/>
								</Clamp>
							</div>
							<div className='flex w-full mt-2 '>
								<BtnSm
									color='bg-themeColorMain'
									label='Delete'
									onClickFunction={handledeleteArticle}
									trackingAction={`Delete article: ${title}`}
									id={blogPostId}
								/>
							</div>
						</div>
					</div>
				</div>
			</a>
		</div>
	)
}

export default SavedArticle
