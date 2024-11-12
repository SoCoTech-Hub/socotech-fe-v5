import styles from './BlogLoad.module.css'

interface BlogLoadProps {
  loading?: boolean; // Define the loading prop as optional and of type boolean
}

const BlogLoad: React.FC<BlogLoadProps> = ({ loading = true }) => {
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

export default BlogLoad
