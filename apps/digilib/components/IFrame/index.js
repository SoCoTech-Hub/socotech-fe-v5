import { createRef, useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import Btn from '../Btn'
import InputField from '../InputField'
import { ChevronLeftIcon, ChevronRightIcon } from '../SvgIcons'
import ContentLock from '../ContentLock'

const IFrame = ({ src, setLoading }) => {
	const [numPages, setNumPages] = useState(null)
	const [pageNumber, setPageNumber] = useState(1)
	const [width, setWidth] = useState(0)
	const div_ref = createRef()
	const [loader, setLoader] = useState(true)

	useEffect(() => {
		setLoader(true)
		pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
		setLoader(false)
		setLoading(false)
	}, [])

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages)
	}

	let encodedEmbedURL = encodeURI(`${src}#view=fitH`)
	const navigate = async (direction) => {
		if (direction == 'back') {
			setPageNumber(pageNumber - 1)
		} else if (direction == 'next') {
			setPageNumber(pageNumber + 1)
		}
	}

	function handleResize() {
		if (div_ref.current) {
			setWidth(div_ref.current.getBoundingClientRect().width)
		}
	}
	window.addEventListener('resize', handleResize)

	useEffect(() => {
		if (div_ref.current) {
			setWidth(div_ref.current.getBoundingClientRect().width)
		}
		document.addEventListener('keyup', (e) => {
			if (e.key == 'PrintScreen') {
				navigator.clipboard.writeText('')
				alert('Screenshots disabled!')
			}
		})
		document.addEventListener('keydown', (e) => {
			if (e.ctrlKey && e.key == 'p') {
				alert('This section is not allowed to print or export to PDF')
				e.cancelBubble = true
				e.preventDefault()
				e.stopImmediatePropagation()
			}
			if (e.ctrlKey && e.key == 's') {
				alert('This section is not allowed to be saved')
				e.cancelBubble = true
				e.preventDefault()
				e.stopImmediatePropagation()
			}
		})
	}, [])

	return (
		<div
			ref={div_ref}
			className='overflow-y height:900px text-textColor'
			style={{ textAlign: 'center' }}
		>
			{loader ? (
				<>Loading PDF Reader</>
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
			<div className='flex flex-row justify-between items-center pb-4 mb-6'>
				{numPages && (
					<>
						{pageNumber > 1 && (
							<div className=''>
								<Btn
									width='w-14'
									label={<ChevronLeftIcon />}
									color='bg-themeColorMain text-textColor'
									onClickFunction={() => navigate('back')}
								/>
							</div>
						)}
						<div className='flex flex-row justify-content gap-x-2 items-center mx-auto'>
							<div className=''>
								<InputField
									type='number'
									max={numPages}
									min={1}
									value={pageNumber}
									onChange={(e) => setPageNumber(parseInt(e.target?.value))}
								/>
							</div>
							/ {numPages}
						</div>

						{pageNumber < numPages && (
							<div className=''>
								<Btn
									width='w-14'
									label={<ChevronRightIcon />}
									color='bg-themeColorMain text-textColor'
									onClickFunction={() => navigate('next')}
								/>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}
export default IFrame
