import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api.ts';
import { redirect } from './middlewares/redirect.ts';
import { rootReducer } from './root-reducer.ts';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
