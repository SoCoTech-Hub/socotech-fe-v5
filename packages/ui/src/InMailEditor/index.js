import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
	})

  export default function InMailEditor({onChange, value}) {
    return (
      <QuillNoSSRWrapper 
        bounds='self' 
        theme='snow' 
        placeholder='Compose your email here...' 
        onChange={onChange} 
        value={value} 
        className="w-full h-full"/>
    )
  }
