import MonthlyCalendar from '@/components/CalendarNew/Calendar/monthly'
import { SEO } from '@/components/SeoHead'

const MonthlyEvents = () => {
	const seo = {
		title: 'Topic - Events',
		description: 'Explore and stay updated on events!',
		image: 'https://lms.topic.co.za/user/logo.png',
		url: 'https://topic.co.za'
	}
	return (<>
		<SEO title={seo.title} description={seo.description} image={seo.image} url={seo.url} />
		<main className='flex flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white mobile:mb-20'>
			<div className='flex flex-col items-center justify-center w-full gap-12 rounded-lg shadow-md desktop:py-4 laptop:py-4 mobile:py-2 desktop:px-2 laptop:px-2 mobile:px-1 desktop:container laptop:container card bg-compBg'>
				<MonthlyCalendar />
			</div>
		</main></>
	)
}



export default MonthlyEvents
