import { useRouter } from 'next/dist/client/router'
import { baseUrl } from '@/context/constants'
// import logout from "@/snippets/logout";

const ReportNavbar = () => {
	const router = useRouter()
	const goBack = () => {
		router.back()
	}
	return (
		<nav className='z-50 w-full py-3 bg-compBg navbar navbar-light '>
			<div className='pl-5'>
				<img
					src={`${baseUrl}logo.png`}
					alt=''
					className='desktop:h-24 laptop:h-20 mobile:h-12 '
				/>
			</div>
		</nav>
	)
}

export default ReportNavbar
