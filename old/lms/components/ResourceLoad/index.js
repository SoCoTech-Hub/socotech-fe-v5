import styles from './DigilibLoad.module.css'

const index = ({ loading = true }) => {
	return loading ? (
		<div className='w-20 h-20 bg-compBg rounded-lg'>
			<div className={styles.threeBallsLoading}>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	) : (
		<></>
	)
}

export default index
