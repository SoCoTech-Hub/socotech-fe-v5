import { FacebookIcon, InstagramIcon, TikTokIcon } from '../SvgIcons'

export const SocialLinksMenu = () => {
	const links = [
		{
			name: 'facebook',
			url: 'https://www.facebook.com/profile.php?id=100095540883970',
			icon: (
				<FacebookIcon className='desktop:w-9 desktop:h-9 laptop:h-8 laptop:w-8 mobile:w-8 mobile:h-10' />
			)
		},
		{
			name: 'instagram',
			url: 'https://www.instagram.com/topic.education?fbclid=IwAR1WYgYgvoPU4MTH0DOqWcf-dbTtWdkG8ziCNGwUnFxKUZsy6OgYUJzoCdg',
			icon: (
				<InstagramIcon className='desktop:w-9 desktop:h-9 laptop:h-8 laptop:w-8 mobile:w-8 mobile:h-10' />
			)
		},
		{
			name: 'tiktok',
			url: 'https://www.tiktok.com/@topiceducation?is_from_webapp=1&sender_device=pc',
			icon: (
				<TikTokIcon className='desktop:w-9 desktop:h-9 laptop:h-8 laptop:w-8 mobile:w-8 mobile:h-10' />
			)
		}
	]

	return (
		<div className='mobile:w-full'>
			<div className='p-3 text-xs rounded-lg mobile:bg-navbarBg bg-compBg shadow-menu mobile:font-bold mobile:w-full'>
				<div className={`text-textColor mobile:mb-2 mobile:text-xl`}>
					Social Media
				</div>
				<div className='flex flex-row text-xs mobile:px-6 mobile:bg-compBg mobile:p-2 mobile:rounded-lg text-textColor mobile:font-normal mt-2 space-x-2'>
					{links.map((item, i) => (
						<a
							key={`social-link-${i}`}
							href={item.url}
							className='cursor-pointer'
						>
							{item.icon}
						</a>
					))}
				</div>
			</div>
		</div>
	)
}

export default SocialLinksMenu
