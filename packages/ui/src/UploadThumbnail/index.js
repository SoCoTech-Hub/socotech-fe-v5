import { baseUrl } from '@/context/constants'
import { removeImageButton } from './styles'

const UploadThumbnail = ({ files, handleFileRemove }) => {
	return files ? (
		files?.map((file, i) => (
			<div
				key={i}
				className=''
			>
				<div className=''>
					<a
						href={file?.url}
						target='_blank'
						rel='noreferrer'
					>
						<img
							src={
								file?.mime?.startsWith('image')
									? file?.preview
										? file.preview
										: file.url
									: `${baseUrl}/attachment.svg`
							}
							alt='attachment'
							className='object-contain w-20 h-20 centerImage'
						/>
						{file.name ? (
							<span
								className='px-3 py-1 bg-blue-100 bg-opacity-50 rounded-lg'
								style={{ color: '#0099FF' }}
							>
								{file.name.substring(0, 10) + '...'}
							</span>
						) : (
							<></>
						)}
					</a>
					{handleFileRemove && (
						<button
							style={removeImageButton}
							type='button'
							onClick={() => handleFileRemove(file.id)}
						>
							<span>Remove</span>
						</button>
					)}
				</div>
			</div>
		))
	) : (
		<></>
	)
}
export default UploadThumbnail
