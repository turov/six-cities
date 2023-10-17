import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { AppRoute } from '../../const.ts';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions.ts';
import { getFavoriteCount } from '../../store/slices/app-data/selectors.ts';
import { getAuthCheckedStatus, getUserInfo } from '../../store/slices/user-process/selectors.ts';

function UserNavigation(): JSX.Element {
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector(getUserInfo);
  const favoriteCount = useAppSelector(getFavoriteCount);
  const isLoggedIn = useAppSelector(getAuthCheckedStatus);

  const userAvatar = userInfo?.avatarUrl ? { backgroundImage: `url(${userInfo?.avatarUrl})` } : {};
  const style = { ...userAvatar, borderRadius: '50%' };

  const handleLogoutClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      {isLoggedIn ? (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
              <div className="header__avatar-wrapper user__avatar-wrapper" style={style}></div>
              <span className="header__user-name user__name">{userInfo?.email}</span>
              <span className="header__favorite-count">{favoriteCount}</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <Link className="header__nav-link" to={AppRoute.Login} onClick={handleLogoutClick}>
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper" style={style}></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default UserNavigation;
