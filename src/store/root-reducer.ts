import { NameSpace } from '../const.ts';
import { combineReducers } from '@reduxjs/toolkit';
import { appData } from './slices/app-data/app-data.ts';
import { appProcess } from './slices/app-process/app-process.ts';
import { userProcess } from './slices/user-process/user-process.ts';

export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Data]: appData.reducer,
  [NameSpace.User]: userProcess.reducer,
});
