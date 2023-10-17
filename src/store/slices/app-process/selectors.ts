import { State } from '../../index.ts';
import { CityName, NameSpace, SortingType } from '../../../const.ts';

export const getSelectedSortType = (state: State): SortingType =>
  state[NameSpace.App].selectedSortType;
export const getSelectedCity = (state: State): CityName => state[NameSpace.App].selectedCity;
