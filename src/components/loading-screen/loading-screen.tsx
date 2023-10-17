import styles from './loading-screen.module.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className={styles.page}>
      <p className={styles.loadingPageText}>Loading ...</p>
    </div>
  );
}

export default LoadingScreen;
