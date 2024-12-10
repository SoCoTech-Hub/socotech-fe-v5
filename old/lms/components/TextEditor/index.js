import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
	ssr: false,
	loading: () => <p>Loading ...</p>
})

export default function TextEditor({
	onChange,
	minRows = 4,
	value,
	placeholder = 'Enter text here...'
}) {
	return (
		<QuillNoSSRWrapper
			minRows={minRows}
			bounds='self'
			theme='snow'
			placeholder={placeholder}
			onChange={onChange}
			value={value}
			className='w-full p-3 text-lg border-2 border-gray-200 rounded-lg'
		/>
	)
}
