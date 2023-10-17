import PlaceList from '../place-list/place-list.tsx';
import { OfferPreview } from '../../types.ts';
import { Link } from 'react-router-dom';
import { AppRoute, CityName } from '../../const.ts';
import { useAppDispatch } from '../../store/hooks.ts';
import { changeCity } from '../../store/slices/app-process/app-process.ts';

type FavoriteCitySectionProps = {
  cityName: CityName;
  cards: OfferPreview[];
};

function FavoriteCitySection({ cityName, cards }: FavoriteCitySectionProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCityClick = () => {
    dispatch(changeCity(cityName));
  };

  return (
    <li key={cityName} className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Main} onClick={handleCityClick}>
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        <PlaceList offers={cards} cardType={'favorites'} />
      </div>
    </li>
  );
}

export default FavoriteCitySection;
