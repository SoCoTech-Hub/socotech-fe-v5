import { baseUrl } from '@/context/constants'
import DigilibHelp from '@/components/DigilibHelp'

const index = () => (
	<div className='px-4 py-4 rounded-lg bg-digilibWelcome shadow-menu  '>
		<div className='row'>
			<div className='flex py-3 col justify-self-center'>
				<img
					src={`${baseUrl}/digilib_welcome.png`}
					alt='Welcome Image'
					className='object-contain '
				/>
			</div>
			<div className='col'>
				<div className='pr-3'>
					<div className='pt-3 banner-main-text '>
						Hello, how can we help you?
					</div>
					<div className='pt-3 pr-6 '>
						<p className='break-words banner-subtext '>
							Tell us what you are looking for in the search bar below, select a
							category and we will find what your looking for or select a folder
							below.
						</p>
					</div>
					<DigilibHelp />
				</div>
			</div>
		</div>
	</div>
)

export default index
