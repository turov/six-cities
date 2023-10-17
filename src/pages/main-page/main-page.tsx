import { useMemo } from 'react';
import LocationsTabs from '../../components/locations-tabs/locations-tabs.tsx';
import Cities from '../../components/cities/cities.tsx';
import { useAppSelector } from '../../store/hooks.ts';
import cn from 'classnames';
import { OfferPreview } from '../../types.ts';
import { getSelectedCity } from '../../store/slices/app-process/selectors.ts';

type MainPageProps = {
  offers: OfferPreview[];
};

function MainPage({ offers }: MainPageProps): JSX.Element {
  const selectedCity = useAppSelector(getSelectedCity);
  const offersByCity = useMemo(
    () => offers.filter((offer) => offer.city.name === selectedCity),
    [offers, selectedCity],
  );

  return (
    <main
      className={cn('page__main page__main--index', {
        'page__main--index-empty': offersByCity.length === 0,
      })}
    >
      <h1 className="visually-hidden">Cities</h1>
      <LocationsTabs selectedCity={selectedCity} />
      <Cities offers={offersByCity} />
    </main>
  );
}

export default MainPage;
