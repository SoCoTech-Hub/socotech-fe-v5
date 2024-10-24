import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import Dropdowns from '@/components/Dropdowns'

const GetSocials = gql`
	query GetSocials {
		socialLinks {
			name
			icon {
				url
			}
			url
			color
		}
	}
`

const ShareLinks = ({ news, name, onClick }) => {
	const { data } = useQuery(GetSocials)
	const router = useRouter()

	const navigationIconLinks = data?.socialLinks.map((link, index) => ({
		id: index + 1,
		label: link.name,
		icon: <img src={link.icon.url} />,
		href: `${link.url}${
			news && news.url
				? news.url.startsWith('http')
					? news.url
					: `${process.env.NEXT_PUBLIC_MAIN_URL}${process.env.NEXT_PUBLIC_BASE_URL}${news.url}`
				: news && news.videoLink
				? news.videoLink
				: `${process.env.NEXT_PUBLIC_MAIN_URL}${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`
		}`,
		color: link.color
	}))

	return (
		<>
			<Dropdowns
				name={name}
				onClick={onClick}
				iconBgColor='transparent'
				buttonTextIconColor='#D6F379'
				label='Socials'
				isMinimalMenuIcon={true}
				list={navigationIconLinks}
				dropDirection='right'
			/>
		</>
	)
}

export default ShareLinks
