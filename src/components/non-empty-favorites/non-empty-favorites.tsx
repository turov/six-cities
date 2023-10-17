import { FavoriteItem } from '../../types.ts';
import FavoriteList from '../favorite-list/favorite-list.tsx';

type NonEmptyFavoritesProps = {
  favorites: FavoriteItem[];
};

const NonEmptyFavorites = ({ favorites }: NonEmptyFavoritesProps) => (
  <section className="favorites">
    <h1 className="favorites__title">Saved listing</h1>
    <FavoriteList favoriteList={favorites} />
  </section>
);

export default NonEmptyFavorites;
