import styles from './error-screen.module.css';
import { useAppDispatch } from '../../store/hooks.ts';
import { fetchOffersAction } from '../../store/api-actions.ts';

function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Oops, something went wrong</h1>
      <button onClick={() => void dispatch(fetchOffersAction())}>Try uploading again</button>
      <div className={styles.mail}>
        <p>If the error occurs again, write to our support team</p>
        <a className={styles.link} href="mailto:supportFake@mail.ru">
          Email Support team: support@mail.ru
        </a>
      </div>
    </div>
  );
}

export default ErrorScreen;
