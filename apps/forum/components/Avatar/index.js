import { AvatarIcon } from '../SvgIcons'
import { PrimaryColor } from '@/context/constants'

const Avatar = ({
	src,
	userName,
	message=false,
	border = false,
	borderColor = PrimaryColor,
	borderSize = '0.125rem',
	size = '2rem'
}) => {
	const Image = () => {
		return src ? (
			<img
				className={`rounded-full ${message ? '-mt-5':''}`}
				src={src}
				alt={`${userName ? `${userName}'s` : ''} Profile Picture`}
				style={{
					border: border ? `${borderSize} solid ${borderColor}` : 'none',
					borderRadius: '50%',
					width: `${message ? '3rem' :size}`,
					height: `${message ? '3rem' :size}`,
					objectFit: 'cover'
				}}
			/>
		) : (
			<AvatarIcon
				className={`rounded-full ${message ? '-mt-5' :''}`}
				style={{
					border: border ? `${borderSize} solid ${borderColor}` : 'none',
					borderRadius: '50%',
					width: size,
					height: size
				}}
			/>
		)
	}

	const UserName = () => {
		return userName ? (
			<div className='flex flex-row items-center'>
				<Image />
				<span
					className={`mobile:text-xs ${
						message
							? 'ml-2 text-textColor text-sm'
							: 'ml-3 text-textColor text-md'
					}`}
					style={{ fontWeight: '500' }}
				>
					{userName}
				</span>
			</div>
		) : (
			<Image />
		)
	}


	return <UserName />
}
export default Avatar
