import '@uiw/react-markdown-preview/markdown.css'
import '@uiw/react-md-editor/markdown-editor.css'
import dynamic from 'next/dynamic'

const Markdown = dynamic(
	() => import('@uiw/react-markdown-preview').then((mod) => mod.default),
	{ ssr: false }
)

const MdxPreview = ({ value }) => {
	return (
		<div className='my-4'>
			<div style={{ paddingTop: 50 }}>
				<Markdown source={value} />
			</div>
		</div>
	)
}
export default MdxPreview
