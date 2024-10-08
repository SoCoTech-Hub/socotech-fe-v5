import Head from 'next/head'
import UserCover from '@/components/UserCover'
import TicketStatus from '@/components/TicketStatus'
import TicketTable from '@/components/TicketTable'
import MobileTicketTable from '@/components/MobileTicketTable'
//import ClientOnly from "@/components/ClientOnly/ClientOnly"
const seo = {
	title: 'Topic - Support Home Page',
	description: 'View and manage your tickets!',
	image: 'https://lms.topic.co.za/support/logo.png',
	url: 'https://topic.co.za'
}
const Home = () => {
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
			<div className='space-y-10 mobile:space-y-3 mobile:w-full mobile:px-3 mobile:mb-10'>
				<div className=''>
					<UserCover />
				</div>
				<div className=''>
					{/* <ClientOnly> */}
					<TicketStatus />
					{/* </ClientOnly> */}
				</div>
				<div className='mobile:hidden'>
					{/* <ClientOnly> */}
					<TicketTable />
					{/* </ClientOnly> */}
				</div>
				<div className='rounded-lg desktop:p-2 laptop:p-2 bg-compBg desktop:hidden laptop:hidden text-textColor'>
					<MobileTicketTable />
				</div>
			</div>
		</div>
	)
}

export default Home
