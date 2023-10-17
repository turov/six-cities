import { Link } from 'react-router-dom';
import styles from './not-found-page.module.css';

function NotFoundPage(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1>404 Not Found</h1>
        <Link to={'/'} className={styles.link}>
          return to main page
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
