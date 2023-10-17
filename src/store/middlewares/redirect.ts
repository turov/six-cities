import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { Middleware } from 'redux';
import { REDIRECT_TO_ROUTE_TYPE } from '../action.ts';
import { rootReducer } from '../root-reducer.ts';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === REDIRECT_TO_ROUTE_TYPE) {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
