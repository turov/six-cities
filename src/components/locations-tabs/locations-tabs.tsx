import cn from 'classnames';
import { CityName } from '../../const.ts';
import { useDispatch } from 'react-redux';
import { memo } from 'react';
import { changeCity } from '../../store/slices/app-process/app-process.ts';

type LocationsTabsProps = {
  selectedCity: CityName;
};

function LocationsTabs({ selectedCity }: LocationsTabsProps) {
  const dispatch = useDispatch();

  const cities: CityName[] = [
    CityName.Paris,
    CityName.Cologne,
    CityName.Brussels,
    CityName.Amsterdam,
    CityName.Hamburg,
    CityName.Dusseldorf,
  ];

  const handleTabClick = (evt: React.MouseEvent<HTMLAnchorElement>, city: CityName) => {
    evt.preventDefault();
    dispatch(changeCity(city));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li key={city} className="locations__item">
              <a
                className={cn('locations__item-link', 'tabs__item', {
                  'tabs__item--active': selectedCity === city,
                })}
                href="#"
                onClick={(evt) => handleTabClick(evt, city)}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const LocationsTabsMemo = memo(LocationsTabs);

export default LocationsTabsMemo;
