import React, { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import {
	baseStyle,
	thumbsContainer,
	removeImageButton,
	activeStyle,
	acceptStyle,
	rejectStyle
} from './styles'
import removeAttachment from '@/snippets/removeAttachment'
import { baseUrl } from '@/context/constants'
import UploadThumbnail from '../UploadThumbnail'

// const picturesPrefix = `${process.env.NEXT_PUBLIC_MAIN_URL}`

const FilesDropzone = ({
	files,
	filesPreviews,
	filesSetter = null,
	loading,
	onDrop,
	dropzonePlaceholder = 'Documentation',
	acceptFileTypes = 'image/png,image/jpg,image/jpeg,application/pdf,application/txt'
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
			...baseStyle,
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

	return (
		<div className=''>
			<div {...getRootProps({ style })}>
				<input {...getInputProps()} />
				<img
					src={`${baseUrl}/modal_attachment_white.svg`}
					alt='attachment'
					width={30}
					height={30}
					className='mr-1'
				/>
				<span>{dropzonePlaceholder}</span>
				{loading && <div>Loading... </div>}
			</div>
			<aside style={thumbsContainer}>
				<UploadThumbnail
					files={filesPreviews}
					handleFileRemove={handleFileRemove}
				/>
			</aside>
		</div>
	)
}

export default FilesDropzone
