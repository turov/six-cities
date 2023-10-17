import FavoriteCitySection from '../favorite-city-section/favorite-city-section.tsx';
import { FavoriteItem, OfferPreview } from '../../types.ts';
import { CityName } from '../../const.ts';

const groupFavoritesByCity = (favoriteList: OfferPreview[]) =>
  favoriteList.reduce((favoritesByCity: Record<string, OfferPreview[]>, item: OfferPreview) => {
    const cityName = item.city.name;
    favoritesByCity[cityName] = [...(favoritesByCity[cityName] || []), item];
    return favoritesByCity;
  }, {});

type FavoriteListProps = {
  favoriteList: FavoriteItem[];
};

function FavoriteList({ favoriteList }: FavoriteListProps): JSX.Element {
  const favoritesByCity = groupFavoritesByCity(favoriteList);

  return (
    <ul className="favorites__list">
      {Object.entries(favoritesByCity).map(([cityName, cards]: [string, OfferPreview[]]) => (
        <FavoriteCitySection key={cityName} cityName={cityName as CityName} cards={cards} />
      ))}
    </ul>
  );
}

export default FavoriteList;
