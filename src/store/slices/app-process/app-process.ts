import { CityName, NameSpace, SortingType } from '../../../const.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const DEFAULT_SELECTED_CITY = CityName.Paris;
const DEFAULT_SELECTED_SORTING = SortingType.Popular;

type AppProcess = {
  selectedCity: CityName;
  selectedSortType: SortingType;
};

const initialState: AppProcess = {
  selectedCity: DEFAULT_SELECTED_CITY,
  selectedSortType: DEFAULT_SELECTED_SORTING,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<CityName>) => {
      state.selectedCity = action.payload;
    },
    changeSortingType: (state, action: PayloadAction<SortingType>) => {
      state.selectedSortType = action.payload;
    },
  },
});

export const { changeCity, changeSortingType } = appProcess.actions;
