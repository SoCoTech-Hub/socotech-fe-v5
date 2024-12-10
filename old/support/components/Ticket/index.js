const index = ({ ticket }) => (
	<div className='p-4 rounded-lg bg-compBg shadow-menu  '>
		<div className='pb-2 text-xl font-bold text-textColor'>
			{ticket.title} - #{ticket.id}
		</div>
		<div className='pb-3'>
			<hr className='bg-compBg' />
		</div>
		<div className='pb-1 text-sm font-bold text-textColor'>
			{new Date(ticket?.created_at).toLocaleString()}
		</div>
		<div
			className={`pb-3 text-lg font-bold desktop:text-lg laptop:text-sm mobile:text-sm ${ticket?.supportStatus?.color}`}
		>
			{ticket?.supportStatus?.name}
		</div>
		<div className='pb-3'>
			<hr className='bg-compBg' />
		</div>
		<div className='w-full py-3 mt-1 text-sm text-textColor'>
			{ticket?.description}
		</div>
		{ticket?.attachments?.map((attachment) => (
			<a
				href={attachment.url}
				target='_blank'
				rel='noreferrer'
				key={attachment.id}
			>
				{/* <div className="p-1 cursor: pointer" key={attachment.id}> */}
				<img
					src={
						attachment?.mime.startsWith('image') && attachment?.formats !== null
							? `${attachment?.formats?.thumbnail?.url}`
							: `attachment.svg`
					}
					className='object-contain w-20'
					height='auto'
					alt={attachment.name}
				/>
			</a>
		))}
	</div>
)

export default index
