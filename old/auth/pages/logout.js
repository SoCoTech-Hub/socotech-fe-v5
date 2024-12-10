import { useEffect } from 'react'
import BtnBig from '@/components/BtnBig'
import { SEO } from '@/components/SeoHead'
import { Page } from '@/components/Page'
import logoutMain from '@/snippets/logoutMain'

export default function Logout() {
	useEffect(() => {
		logoutMain()
	}, [])

	return (
		<>
			<SEO
				title='Topic: Logout'
				description='Logout Page'
			/>
			<Page
				header={"We're sad to see you go."}
				message={
					<div className='flex flex-col text-center gap-y-4'>
						<div className='font-bold desktop:text-2xl laptop:text-2xl mobile:text-xl'>
							You have successfully been logged out.
						</div>
						<div className='text-lg mobile:text-md'>
							Please log in by clicking the button below.
						</div>
					</div>
				}
				buttons={[
					<BtnBig
						key='login-button'
						label='Log in'
						link='/'
						color='bg-themeColorMain'
						width='w-60'
					/>
				]}
			/>
		</>
	)
}
