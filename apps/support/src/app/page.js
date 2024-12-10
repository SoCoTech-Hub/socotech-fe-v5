import UserCover from '@/components/UserCover'
import TicketStatus from '@/components/TicketStatus'
import TicketTable from '@/components/TicketTable'
import MobileTicketTable from '@/components/MobileTicketTable'
import { SEO } from '@/components/SeoHead'
//import ClientOnly from "@/components/ClientOnly/ClientOnly"
const seo = {
	title: 'Support Home Page',
	description: 'View and manage your tickets!'
}
const Home = () => {
	return (
		<div className='col row'>
			<SEO
				title={seo.title}
				description={seo.description}
			/>
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
