import { routeNameToPageInfoMap } from './const.ts';

export function getPageInfo(pathname: string) {
  return (
    routeNameToPageInfoMap[pathname] || {
      title: '',
      description: '',
    }
  );
}
