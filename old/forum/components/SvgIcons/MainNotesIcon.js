export const MainNotesIcon = (props) => {
	return (
		<svg
			baseProfile='tiny'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 32 32'
			overflow='visible'
			{...props}
		>
			<defs>
				<style>{`
				.mni-1 {fill: #D8D9D8;}
				.mni-2 {fill: #EAEAEB;}
				.mni-3 {fill: #FFF;}
				`}</style>
			</defs>
			<g fillRule='evenodd'>
				<path
					className='mni-1'
					d='M26.92 27.83h.91s2.73-.06 2.73-3.64V7.81h-3.64v20.02z'
				/>
				<path
					className='mni-2'
					d='M26.92 6.69V4.17H1.44v20.02s0 3.64 3.64 3.64h21.84V6.69z'
				/>
				<path
					className='mni-3'
					d='M5.08 26.01c-1.82 0-1.82-1.82-1.82-1.82V5.99H25.1v18.2c0 .84.26 1.42.61 1.82H5.08z'
				/>
				<path
					className='mni-1'
					d='M14.97 9.63h8.31v1.82h-8.31zM15.09 20.55h6.37v1.82h-6.37zM15.09 16.91h8.19v1.82h-8.19zM15.09 13.27h8.19v1.82h-8.19zM5.08 9.73h8.19v10.73H5.08z'
				/>
			</g>
		</svg>
	)
}
