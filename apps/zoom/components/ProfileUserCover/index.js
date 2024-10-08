import { createRef } from 'react'
import Avatar from '@/components/Avatar'
import { Badge } from '@mui/material'
import { NoSsr } from '@mui/material'
import getBannerUrl from '@/snippets/getBannerUrl'
import ProfilePicUrl from '@/snippets/getProfilePicUrl'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import uploadBanner from '@/snippets/uploadBanner'
import uploadProfilePic from '@/snippets/uploadProfilePic'
import { userName, email, profileId, uniqueId } from '@/context/constants'

const ProfileUserCover = ({ edit = false }) => {
	const profilePicFileRef = createRef()
	const bannerFileRef = createRef()

	const handlePhotoCameraClick = () => {
		if (profilePicFileRef.current) {
			profilePicFileRef.current.click()
		}
	}
	const onChangeProfilePic = async (file) => {
		try {
			await uploadProfilePic({ profileId: profileId, profilePic: file })
			window.location.reload()
		} catch (err) {
			console.error(err)
		}
	}

	const handleBannerClick = () => {
		if (bannerFileRef.current) {
			bannerFileRef.current.click()
		}
	}
	const onChangeBanner = async (file) => {
		try {
			await uploadBanner({ profileId: profileId, banner: file })
			window.location.reload()
		} catch (err) {
			console.error(err)
		}
	}
	return (
		<div>
			<NoSsr>
				<>
					{edit ? (
						<div
							className='relative overflow-hidden rounded-full cursor-pointer h-60'
							style={{
								backgroundImage: `url('${getBannerUrl()}')`,
								backgroundPosition: '50% 50%',
								backgroundSize: 'cover'
							}}
						>
							<a onClick={handleBannerClick}>
								<div
									data-tracking-action='Click on Edit cover image'
									className='absolute px-2 py-2 mb-2 mr-2 rounded-lg bg-compBg text-textColor bg-opacity-70 '
									style={{ bottom: 0, right: 0 }}
								>
									<CameraAltIcon
										className='z-20 mr-2 text-textColor'
										style={{ fontSize: 25 }}
									/>
									<input
										type='file'
										accept='image/*'
										style={{ display: 'none' }}
										ref={bannerFileRef}
										onChange={(e) => onChangeBanner(e.target.files[0])}
									/>
									Edit cover image
								</div>
							</a>
						</div>
					) : (
						<div
							className='overflow-hidden h-60 rounded-xl'
							style={{
								backgroundImage: `url('${getBannerUrl()}')`,
								backgroundPosition: '50% 50%',
								backgroundSize: 'cover'
							}}
						></div>
					)}

					{edit ? (
						<>
							<div className='flex flex-row'>
								<div className='ml-5 avatar'>
									<Badge
										overlap='circular'
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'right'
										}}
										style={{ marginTop: '-50px' }}
										badgeContent={
											<a onClick={handlePhotoCameraClick}>
												<div
													className='p-2 rounded-full cursor-pointer bg-compBg bg-opacity-70'
													data-tracking-action='Click on Edit user image'
												>
													<CameraAltIcon
														className='z-20 text-textColor'
														style={{ fontSize: 25 }}
														data-tracking-action='Click on Edit user image'
													/>
													<input
														type='file'
														accept='image/*'
														style={{ display: 'none' }}
														ref={profilePicFileRef}
														onChange={(e) =>
															onChangeProfilePic(e.target.files[0])
														}
													/>
												</div>
											</a>
										}
									>
										<Avatar
											src={ProfilePicUrl()}
											size='120px'
											border={true}
											borderColor='white'
										/>
									</Badge>
								</div>
								<div className='mt-2 ml-2'>
									<div className='font-bold text-textColor '>{userName}</div>
									<div className='text-textColor'>{uniqueId}</div>
								</div>
							</div>
						</>
					) : (
						<div className=''>
							<div className='flex flex-row'>
								<div className='ml-5 avatar -mt-14'>
									<Avatar
											src={ProfilePicUrl()}
											size='120px'
											border={true}
											borderColor='white'
								/>
								</div>
								<div className='mt-2 ml-2'>
									<div className='font-bold text-textColor '>{userName}</div>
									<div className='text-textColor'>{uniqueId}</div>
								</div>
							</div>
						</div>
					)}
				</>
			</NoSsr>
		</div>
	)
}

export default ProfileUserCover
