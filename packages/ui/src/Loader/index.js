import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div id={styles.outer}>
      <div id={styles.middle}>
        <div id={styles.inner}></div>
      </div>
    </div>
  );
};

export default Loader;
