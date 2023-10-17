import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const.ts';

export const REDIRECT_TO_ROUTE_TYPE = 'app/redirectToRoute';

export const redirectToRoute = createAction<AppRoute>(REDIRECT_TO_ROUTE_TYPE);
