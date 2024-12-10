import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Dropdowns from '../Dropdowns'

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

	const navigationIconLinks = data?.socialLinks.map((link, index) => ({
		id: index + 1,
		label: link.name,
		icon: <img src={link.icon?.url} />,
		href:
			news.url || news.videoLink
				? `${link.url}${
						news.url
							? news.url.startsWith('http')
								? news.url
								: `${process.env.NEXT_PUBLIC_MAIN_URL}${news.url}`
							: news.videoLink
				  }`
				: `${link.url}${process.env.NEXT_PUBLIC_MAIN_URL}`,
		color: link.color
	}))

	return (
		<>
			<Dropdowns
				name={name}
				onClick={onClick}
				iconBgColor='transparent'
				buttonTextIconColor='#D6F379'
				buttonTextColor='white'
				label='Socials'
				isMinimalMenuIcon={true}
				list={navigationIconLinks}
				dropDirection='right'
			/>
		</>
	)
}

export default ShareLinks
