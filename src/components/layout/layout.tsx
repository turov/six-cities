import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';
import { getPageInfo } from './utils.ts';
import Page from '../page/page.tsx';
import Header from '../header/header.tsx';
import Footer from '../footer/footer.tsx';
import { usePageInfo } from './hooks.ts';
import { ReactNode } from 'react';

type LayoutProps = {
  isPageWrapper?: boolean;
  isHeaderUserNavigation?: boolean;
  isHeaderActiveLogo?: boolean;
  isHeaderShow?: boolean;
  isFooterShow?: boolean;
  wrapperComponent?: React.ComponentType<{ children: ReactNode }>;
};

function Layout(props: LayoutProps): JSX.Element {
  const {
    wrapperComponent: WrapperComponent = Page,
    isPageWrapper = true,
    isHeaderActiveLogo: isActiveLogo = true,
    isHeaderUserNavigation: isUserNavigation = true,
    isHeaderShow = true,
    isFooterShow = false,
  } = props;

  const { pathname } = useLocation();

  const { pageInfo, setPageInfo } = usePageInfo(getPageInfo(pathname));

  const outletContext = { setPageInfo };

  const layoutContent = (
    <>
      <Helmet>
        <title>Six-cities{pageInfo.title && ` | ${pageInfo.title}`}</title>
        <meta name="description" content={pageInfo.description} />
      </Helmet>
      {isHeaderShow && <Header isUserNavigation={isUserNavigation} isActiveLogo={isActiveLogo} />}
      <Outlet context={outletContext} />
      {isFooterShow && <Footer />}
    </>
  );

  return isPageWrapper ? <WrapperComponent>{layoutContent}</WrapperComponent> : layoutContent;
}

export default Layout;
