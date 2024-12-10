import Avatar from '@/components/Avatar'
import { NoSsr } from '@mui/material'
import getBannerUrl from '@/snippets/getBannerUrl'
import ProfilePicUrl from '@/snippets/getProfilePicUrl'
import { uniqueId, userName } from '@/context/constants'

const UserCover = () => (
	<NoSsr>
		<div
			className='overflow-hidden rounded-lg h-60 mobile:h-28'
			style={{
				backgroundImage: `url('${getBannerUrl()}')`,
				backgroundPosition: '50% 50%',
				backgroundSize: 'cover'
			}}
		></div>
		<div className=''>
			<div className='flex flex-row'>
				<div className='ml-5 -mt-12 avatar'>
					<Avatar
						src={ProfilePicUrl()}
						size='100px'
						border={true}
						/>
				</div>
				<div className='mt-2 ml-2'>
					<div className='text-sm font-bold text-textColor'>{userName}</div>
					<div className='text-sm text-textColor'>{uniqueId}</div>
				</div>
			</div>
		</div>
	</NoSsr>
)
export default UserCover
