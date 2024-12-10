import { baseUrl } from '@/context/constants'

const Attachments = ({ attachments }) => (
	<div className='mt-4 border-t-2 border-black border-dotted'>
		{attachments?.length === 1 ? (
			<div className='font-bold text-textColor text-xs'>
				{attachments?.length} Attachment
			</div>
		) : (
			<div className='font-bold text-textColor text-xs'>
				{attachments?.length} Attachments
			</div>
		)}
		<div className='flex gap-4 mt-2'>
			{attachments.map((file) => (
				<a
					href={file.url}
					target='_blank'
					rel='noreferrer'
					key={file.id}
				>
					<img
						src={
							file.mime.startsWith('image')
								? `${file.formats.thumbnail.url}`
								: `${baseUrl}/attachment.svg`
						}
						alt='attachment'
						className='object-contain w-20 h-20 centerImage'
					/>
				</a>
			))}
		</div>
	</div>
)

export default Attachments
