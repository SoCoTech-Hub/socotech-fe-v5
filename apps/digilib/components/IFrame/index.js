import { createRef, useEffect, useState, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import Btn from '@/components/Btn'
import InputField from '@/components/InputField'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/SvgIcons'
import ContentLock from '@/components/ContentLock'

const IFrame = ({ src, setLoading }) => {
	const [numPages, setNumPages] = useState(null)
	const [pageNumber, setPageNumber] = useState(1)
	const [width, setWidth] = useState(0)
	const [loader, setLoader] = useState(true)
	const divRef = createRef()

	useEffect(() => {
		pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
		setLoader(false)
		if (setLoading) {
			setLoading(false)
		}
	}, [])

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages)
	}

	const handleResize = useCallback(() => {
		if (divRef.current) {
			setWidth(divRef.current.getBoundingClientRect().width)
		}
	}, [])

	useEffect(() => {
		handleResize()

		const disablePrintAndScreenshots = (e) => {
			// Disable PrintScreen key
			if (e.key === 'PrintScreen') {
				navigator.clipboard.writeText('')
				alert('Screenshots are disabled!')
			}

			// Disable print via Ctrl+P or Command+P
			if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
				alert('Printing is disabled!')
				e.preventDefault()
				e.stopImmediatePropagation()
			}

			// Disable saving the page via Ctrl+S or Command+S
			if ((e.ctrlKey || e.metaKey) && e.key === 's') {
				alert('Saving this content is not allowed!')
				e.preventDefault()
				e.stopImmediatePropagation()
			}
		}

		const disableContextMenu = (e) => {
			e.preventDefault()
		}

		// Add event listeners
		window.addEventListener('resize', handleResize)
		document.addEventListener('keydown', disablePrintAndScreenshots)
		document.addEventListener('contextmenu', disableContextMenu)

		return () => {
			window.removeEventListener('resize', handleResize)
			// Clean up event listeners
			document.removeEventListener('keydown', disablePrintAndScreenshots)
			document.removeEventListener('contextmenu', disableContextMenu)
		}
	}, [])

	const navigate = useCallback(
		(direction) => {
			if (direction === 'back' && pageNumber > 1) {
				setPageNumber((prev) => prev - 1)
			} else if (direction === 'next' && pageNumber < numPages) {
				setPageNumber((prev) => prev + 1)
			}
		},
		[pageNumber, numPages]
	)

	let encodedEmbedURL = encodeURI(`${src}#view=fitH`)
	return (
		<div
			ref={divRef}
			className='h-auto overflow-y-auto text-textColor'
		>
			{loader ? (
				<>Loading PDF Reader...</>
			) : (
				<ContentLock
					bgColor={'bg-themeColorMain'}
					children={
						<>
							<Document
								file={encodedEmbedURL}
								onLoadSuccess={onDocumentLoadSuccess}
								onContextMenu={(e) => e.preventDefault()}
								className='pdf-container'
							>
								<Page
									height={800}
									width={width}
									pageNumber={pageNumber}
								/>
							</Document>
						</>
					}
				/>
			)}

			{numPages && (
				<div className='flex items-center justify-between desktop:flex-row laptop:flex-row mobile:flex-col mobile:my-2'>
					{pageNumber > 1 ? (
						<div className='flex-none'>
							<Btn
								label={<ChevronLeftIcon />}
								color='bg-themeColorMain text-textColor'
								onClickFunction={() => navigate('back')}
							/>
						</div>
					) : (
						<div className='flex-none mx-2 w-28' />
					)}

					<div className='flex flex-col items-center justify-center flex-grow text-center'>
						<div className='flex items-center gap-2'>
							<InputField
								type='number'
								max={numPages}
								min={1}
								value={pageNumber}
								onChange={(e) =>
									setPageNumber(
										Math.max(1, Math.min(numPages, Number(e.target.value)))
									)
								}
							/>
							<span>/ {numPages}</span>
						</div>
					</div>

					{pageNumber < numPages && (
						<div className='flex-none'>
							<Btn
								label={<ChevronRightIcon />}
								color='bg-themeColorMain text-textColor'
								onClickFunction={() => navigate('next')}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default IFrame
