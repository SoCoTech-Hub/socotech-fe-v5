import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import style from './MdxEditor.module.css'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
	ssr: false,
	loading: () => <p>Loading ...</p>
})

export default function MdxEditor({
	value,
	setValue,
	placeholder = 'Compose your message here...',
	disabled = false
}) {
	const modules = {
		toolbar: [
			[{ header: '1' }, { header: '2' }, { font: [] }],
			[{ size: [] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[
				{ list: 'ordered' },
				{ list: 'bullet' },
				{ indent: '-1' },
				{ indent: '+1' }
			],
			[
				'link'
				// 'image', 'video'
			],
			['clean']
		],
		clipboard: {
			// toggle to add extra line breaks when pasting HTML:
			matchVisual: false
		}
	}

	const formats = [
		'header',
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
		'video'
	]

	return (
		<div className='border-solid rounded-md shadow-md bg-compBg'>
			<QuillNoSSRWrapper
				bounds='self'
				// theme='snow'
				placeholder={placeholder}
				onChange={setValue}
				value={value}
				className='rounded-lg bg-compBg text-textColor input'
				readOnly={disabled}
				modules={({ toolbar: true }, modules)}
				formats={formats}
			/>
		</div>
	)
}