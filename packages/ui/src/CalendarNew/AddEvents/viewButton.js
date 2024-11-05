import Link from 'next/link'

const ViewButton = ({ url, label, onClick, className }) => {
	const handleClick = () => {
		if (onClick) {
			onClick()
		}
	}

	return (
		<>
			{url ? (
				<Link
					href={url}
					passHref
				>
					<button
						onClick={handleClick}
						className={`block px-4 py-2 text-sm ${className}`}
					>
						{label}
					</button>
				</Link>
			) : (
				<button
					onClick={handleClick}
					className={`block px-4 py-2 text-sm ${className}`}
				>
					{label}
				</button>
			)}
		</>
	)
}

export default ViewButton
