import Avatar from '@/components/Avatar'
import { useEffect, useState } from 'react'
import { useStyles } from './style'
import getGQLRequest from '@/snippets/getGQLRequest'

const index = ({ id }) => {
	const classes = useStyles()
	const [responses, setResponses] = useState([])

	useEffect(async () => {
		await getGQLRequest({
			endpoint: `supportComments`,
			stateSetter: setResponses,
			where: `supportTicket:{id:${id}}`,
			fields: `id,comment,created_at,attachments{id,name,url,formats,mime},author{firstName,lastName,profilePic{id,url,formats}}`
		})
	})
	return (
		responses &&
		responses?.map((response) => (
			<div key={response?.id}>
				<div className='w-full p-4 rounded-lg bg-compBg'>
					<div className='flex space-x-2'>
						<div className=' item'>
							<div className='flex'>
								<Avatar
									src={
										response?.author?.profilePic
										}
									border={true}
									className={`${classes.responses}`}
									/>
							</div>
						</div>
						<div className=' item'>
							<div className='flex flex-col'>
								<div className='text-sm font-bold text-textColor'>{`${response?.author?.firstName} ${response?.author?.lastName}`}</div>
								<div className='text-xs text-textColor'>
									Posted:{' '}
									<span>{new Date(response?.created_at).toLocaleString()}</span>
								</div>
							</div>
						</div>
						<div className='flex flex-col'>
							<div className='text-sm font-bold text-textColor'>
								{response.comment}
							</div>
							{/* {response?.attachments?.map((attachment) => (
                <div className="p-1 cursor: pointer" key={attachment.id}>
                  {attachment.mime.startsWith("image") ? (
                    <img
                      src={`${url}${attachment.formats.thumbnail.url}`}
                      alt={response.id}
                    />
                  ) : (
                    <img
                      src={`attachment.svg`}
                      alt={response.id}
                      width={100}
                      height="auto"
                    />
                  )}
                </div>
              ))} */}
							{response?.attachments?.map((attachment) => (
								<a
									href={attachment?.url}
									target='_blank'
									rel='noreferrer'
									key={attachment.id}
								>
									<img
										src={
											attachment.mime.startsWith('image') &&
											attachment?.formats !== null
												? `${attachment?.formats?.thumbnail?.url}`
												: `attachment.svg`
										}
										className='object-contain w-20 h-20'
										height='auto'
										alt={attachment.name}
									/>
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		))
	)
}

export default index
