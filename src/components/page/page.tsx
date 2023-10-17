import cn from 'classnames';
import { useAppSelector } from '../../store/hooks.ts';
import { getFavorites } from '../../store/slices/app-data/selectors.ts';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const.ts';

interface PageProps {
  children: React.ReactNode;
}

function Page(props: PageProps): JSX.Element {
  const { children } = props;
  const isEmptyFavorites = useAppSelector(getFavorites).length === 0;
  const { pathname } = useLocation();

  const pathnameToClassName: Record<string, string> = {
    [AppRoute.Main]: 'grayMain',
    [AppRoute.Login]: 'grayLogin',
    [AppRoute.Favorites]: 'favorites',
  };

  const typePageToClassNames: Record<string, string> = {
    grayMain: 'page page--gray page--main',
    grayLogin: 'page page--gray page--login',
    favorites: cn('page', { 'page--favorites-empty': isEmptyFavorites }),
    default: 'page',
  };

  const typePage = pathnameToClassName[pathname] || 'default';

  return <div className={typePageToClassNames[typePage]}>{children}</div>;
}

export default Page;
