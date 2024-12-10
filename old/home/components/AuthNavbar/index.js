import Btn from '@/components/Btn'
import { baseUrl } from '@/context/constants'
// import logout from "@/snippets/logout";

const AuthNavbar = () => {
	return (
		<nav className='z-50 w-full py-3 shadow-md navbar navbar-light bg-light justify-content-between'>
			<div className='pl-10 mobile:pl-4'>
				<img
					src={`${baseUrl}logo.png`}
					alt=''
					className='desktop:h-14 laptop:h-14 mobile:h-6'
				/>
			</div>
			<div className='flex flex-row mr-4'>
				<Btn
					label='Help'
					color='bg-themeColorMain'
					link='https://api.whatsapp.com/send/?phone=27692183771&text&type=phone_number&app_absent=0'
				/>
				<Btn
					label='Back'
					color='bg-black text-textColor'
				/>
				link='https://suadvantage.co.za/'
			</div>
		</nav>
	)
}

export default AuthNavbar
