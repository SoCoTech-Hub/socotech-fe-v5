import { SecondaryColor, Text } from '@/context/constants'
import MainMenuLinkNew from '../MainMenuLinkNew'
import {
	FacebookIcon,
	InstagramIcon,
	TikTokIcon,
	WhatsAppGroupIcon
} from '../SvgIcons'

export const SocialLinksMenu = () => {
	const links = [
		{
			name: 'instagram',
			url: 'https://www.instagram.com/topic.education?fbclid=IwAR1WYgYgvoPU4MTH0DOqWcf-dbTtWdkG8ziCNGwUnFxKUZsy6OgYUJzoCdg',
			icon: (<InstagramIcon />)
		},
		{
			name: 'facebook',
			url: 'https://www.facebook.com/profile.php?id=100095540883970',
			icon: (<FacebookIcon />)
		},
		{
			name: 'tiktok',
			url: 'https://www.tiktok.com/@topiceducation?is_from_webapp=1',
			icon: (<TikTokIcon />)
		},
		{
			name: 'whatsappGroup',
			url: 'https://whatsapp.com/channel/0029VaFE7lUJENyAWIOPCB0J',
			icon: (<WhatsAppGroupIcon />)
		}
	]

	return (
		<div className='mobile:w-full'>
			<div className='p-3 text-xs rounded-lg mobile:bg-navbarBg bg-compBg shadow-menu mobile:font-bold mobile:w-full'>
				<div className={`text-textColor mobile:mb-2 mobile:text-xl`}>
					Social Media
				</div>
				<div className='flex text-xs mobile:px-6 mobile:bg-compBg mobile:p-2 mobile:rounded-lg text-textColor mobile:font-normal mt-2 laptop:grid laptop:grid-rows-2 laptop:grid-flow-col'>
					{links.map((item, i) => (
						<div key={`social-link-${i}`}>
							<MainMenuLinkNew
								textColor={Text}
								icon={item.icon}
								iconColor={SecondaryColor}
								link={item.url}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default SocialLinksMenu
