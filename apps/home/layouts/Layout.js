const Layout = ({ children }) => {
	return (
		<>
			<div className=' appFullHeight row g-0'>
				<div className='mt-20 overflow-scroll no-scrolly pageHeight '>
					<main className=''>{children}</main>
				</div>
			</div>
		</>
	)
}

export default Layout
