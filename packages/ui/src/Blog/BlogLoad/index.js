import styles from "./BlogLoad.module.css";

const index = ({ loading = true }) => {
  return loading ? (
    <div className="bg-compBg h-20 w-20 rounded-lg">
      <div className={styles.threeBallsLoading}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default index;
