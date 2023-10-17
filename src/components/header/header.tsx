import cn from 'classnames';
import UserNavigation from '../user-navigation/user-navigation.tsx';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import { memo } from 'react';

type HeaderProps = {
  isUserNavigation: boolean;
  isActiveLogo: boolean;
};

function Header(props: HeaderProps): JSX.Element | null {
  const { isUserNavigation, isActiveLogo } = props;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className={cn('header__logo-link', { 'header__logo-link--active': !isActiveLogo })}
              to={AppRoute.Main}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          {isUserNavigation && <UserNavigation />}
        </div>
      </div>
    </header>
  );
}

const HeaderMemo = memo(Header);

export default HeaderMemo;
