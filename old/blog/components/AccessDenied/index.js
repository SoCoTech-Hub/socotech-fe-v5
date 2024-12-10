import useRouter from 'next/router'
const AccessDenied = () => {
	const router = useRouter()

	return (
		<div className='px-1 w-30'>
			<h1>Access Denied</h1>
			<a
				className={`text-center text-textColor px-3 py-2 rounded-full`}
				href={router.back()}
			>
				Return
			</a>
		</div>
	)
}
export default AccessDenied
