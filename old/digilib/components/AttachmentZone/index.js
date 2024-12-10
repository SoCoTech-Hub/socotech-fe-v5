import { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { thumbsContainer } from './styles'
import CircleLoader from '@/components/DigilibLoad'
import { apiUrl, baseUrl } from '@/context/constants'
import removeAttachment from '@/snippets/removeAttachment'
const picturesPrefix = apiUrl

const AttachmentZone = ({
	loading,
	onDrop,
	files,
	filesPreviews,
	filesSetter = null,
	dropzonePlaceholder = 'Documentation',
	acceptFileTypes = 'image/png,image/jpg,image/jpeg,application/pdf'
}) => {
	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject
	} = useDropzone({
		onDrop,
		multiple: false,
		accept: acceptFileTypes
	})

	const style = useMemo(
		() => ({
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {})
		}),
		[isDragActive, isDragReject, isDragAccept]
	)

	const handleFileRemove = async (fileId) => {
		if (filesSetter) {
			filesSetter(files.filter((f) => f.id !== fileId))
		}
		await removeAttachment({ fileId: fileId })
	}

	const thumbs = filesPreviews.length ? (
		filesPreviews.map((file) => (
			<div
				key={file.id}
				className=''
			>
				<div key={`material-${file.id}`}>
					<div className='flex mx-3'>
						<span className='pl-3 bg-blue-600 rounded-lg text-textColor'>
							<a
								href={`${picturesPrefix}${file.preview}`}
								target='_blank'
								rel='noreferrer'
							>
								{String(file.name)}
							</a>
							<button
								className='px-3 py-2 ml-2 font-bold text-black rounded-full bg-themeColorMain'
								type='button'
								onClick={() => handleFileRemove(file.id)}
							>
								<span>X</span>
							</button>
						</span>
					</div>
				</div>
			</div>
		))
	) : (
		<div className='text-textColor'>{dropzonePlaceholder}</div>
	)

	return (
		<div {...getRootProps({ style })}>
			<div className='flex items-center py-1 pl-2 mt-3 align-middle bg-gray-200 rounded-lg'>
				<div className='w-8 h-8 mr-3'>
					<input {...getInputProps()} />
					<Image
						src={`${baseUrl}/modal_attachment.svg`}
						alt='Attachment'
						width={150}
						height={150}
					/>
				</div>
				<aside style={thumbsContainer}>{thumbs}</aside>
			</div>
			{loading && <CircleLoader />}
		</div>
	)
}

export default AttachmentZone
