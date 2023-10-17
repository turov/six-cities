import { AppRoute, DescriptionPage, TitlePage } from '../../const.ts';

export const routeNameToPageInfoMap: Record<string, { title: string; description: string }> = {
  [AppRoute.Main]: {
    title: TitlePage.Main,
    description: DescriptionPage.Main,
  },
  [AppRoute.Favorites]: {
    title: TitlePage.Favorites,
    description: DescriptionPage.Favorites,
  },
  [AppRoute.Login]: {
    title: TitlePage.Login,
    description: DescriptionPage.Login,
  },
};
