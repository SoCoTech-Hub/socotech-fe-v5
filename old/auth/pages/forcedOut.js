import { useEffect } from 'react'
import Link from 'next/link'
import { SEO } from '@/components/SeoHead'
import { Page } from '@/components/Page'
import logoutMain from '@/snippets/logoutMain'
import { baseUrl } from '@/context/constants'

export default function verified() {
	useEffect(() => {
		logoutMain()
	}, [])

	return (
		<>
			<SEO
				title='Logout'
				description='Logout Page'
			/>
			<Page
				header='Your account is active on another device or internet browser.'
				message={
					<>
						You have been logged out.
						<br />
						To log back in on this device, click on the button below.
						<div className='mt-4'>
							You can reset your password for security reasons if you feel this
							is needed.
						</div>
					</>
				}
				buttons={[
					<Link href='/'>
						<a className='px-6 py-3 text-center rounded-md cursor-pointer text-textColor bg-themeColorMain hover:text-textColorSecondary'>
							Log In
						</a>
					</Link>
				]}
				background={`${baseUrl}/background2.png`}
			/>
		</>
	)
}
