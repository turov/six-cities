import { memo } from 'react';
import { useAppSelector } from '../../store/hooks.ts';
import { getSelectedCity } from '../../store/slices/app-process/selectors.ts';

function NoPlacesAvailable() {
  const cityName = useAppSelector(getSelectedCity);

  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">
          We could not find any property available at the moment in {cityName}
        </p>
      </div>
    </section>
  );
}

const NoPlacesAvailableMemo = memo(NoPlacesAvailable);

export default NoPlacesAvailableMemo;
