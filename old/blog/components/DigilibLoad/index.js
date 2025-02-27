import styles from './DigilibLoad.module.css'

const DigilibLoad = ({ loading = true }) => {
	return loading ? (
		<div className='flex flex-row justify-center items-center'>
			<div
				className='w-1/4'
				style={{
					marginLeft: '-8rem'
				}}
			>
				<div className={styles.threeBallsLoading}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		</div>
	) : (
		<></>
	)
}

export default DigilibLoad
