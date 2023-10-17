import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { SortingType } from '../../const';
import { useAppSelector } from '../../store/hooks';
import { changeSortingType } from '../../store/slices/app-process/app-process.ts';
import { getSelectedSortType } from '../../store/slices/app-process/selectors.ts';

function PlacesSorting(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const selectedSortType = useAppSelector(getSelectedSortType);
  const dispatch = useDispatch();

  const toggleSortingOptions = () => setIsOpened((prevState) => !prevState);

  const handleSortTypeChange = (sortType: SortingType) => {
    dispatch(changeSortingType(sortType));
    setIsOpened(false);
  };

  const sortingOptionsClass = cn('places__options', 'places__options--custom', {
    'places__options--opened': isOpened,
  });

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleSortingOptions}>
        {selectedSortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={sortingOptionsClass}>
        {Object.entries(SortingType).map(([sortType, title]) => (
          <li
            key={title}
            tabIndex={0}
            className={cn('places__option', {
              'places__option--active': selectedSortType === sortType,
            })}
            onClick={() => handleSortTypeChange(title)}
          >
            {title}
          </li>
        ))}
      </ul>
    </form>
  );
}

const PlacesSortingMemo = memo(PlacesSorting);

export default PlacesSortingMemo;
