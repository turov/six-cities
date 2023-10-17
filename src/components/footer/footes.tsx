import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const.ts';

function Footer(): JSX.Element | null {
  const { pathname } = useLocation();

  const isFavoritePage = pathname === AppRoute.Favorites;

  if (!isFavoritePage) {
    return null;
  }

  return (
    <footer className="footer container">
      <Link className="footer__logo-link" to={AppRoute.Main}>
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width="64"
          height="33"
        />
      </Link>
    </footer>
  );
}

export default Footer;
