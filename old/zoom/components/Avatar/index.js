import { AvatarIcon } from '../SvgIcons'
import { PrimaryColor } from '@/context/constants'

const Avatar = ({
	src,
	userName,
	border = false,
	borderColor = PrimaryColor,
	borderSize='0.125rem',
	size = '2rem'
}) => {
	const Image = () => {
		return src ? (
			<img
				className='rounded-full'
				src={src}
				alt={`${userName ? `${userName}'s` : ''} Profile Picture`}
				style={{
					border: border ? `${borderSize} solid ${borderColor}` : 'none',
					borderRadius: '50%',
					width: size,
					maxWidth: size,
					height: size,
					maxHeight: size,
					objectFit: 'cover'
				}}
			/>
		) : (
			<AvatarIcon
				className='rounded-full'
				style={{
					border: border ? `${borderSize} solid ${borderColor}` : 'none',
					borderRadius: '50%',
					width: size,
					maxWidth: size,
					height: size,
					maxHeight: size
				}}
			/>
		)
	}

	const UserName = () => {
		return userName ? (
			<div className='flex flex-row items-center'>
				<Image />
				<span
					className='ml-3 text-md text-themeColorMain mobile:text-xs'
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
