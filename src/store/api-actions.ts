import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from './index.ts';
import { AxiosInstance } from 'axios';
import {
  AuthData,
  FavoriteData,
  FavoriteItem,
  OfferFull,
  OfferPreview,
  Review,
  ReviewData,
  UserData,
} from '../types.ts';
import { APIRoute, AppRoute, NameSpace } from '../const.ts';
import { redirectToRoute } from './action.ts';
import { dropToken, saveToken } from '../services/token.ts';

type AsyncThunkConfig = { dispatch: AppDispatch; state: State; extra: AxiosInstance };

export const fetchOffersAction = createAsyncThunk<OfferPreview[], undefined, AsyncThunkConfig>(
  `${NameSpace.Data}/fetchOffers`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<OfferFull | null, string, AsyncThunkConfig>(
  `${NameSpace.Data}/fetchOffer`,
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<OfferFull>(`${APIRoute.Offers}/${id}`);
      return data;
    } catch (e) {
      dispatch(redirectToRoute(AppRoute.PageNotFound));
      return null;
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, AsyncThunkConfig>(
  `${NameSpace.Data}/fetchReviews`,
  async (id, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Review}/${id}`);
    return data;
  },
);

export const fetchNearbyAction = createAsyncThunk<OfferPreview[], string, AsyncThunkConfig>(
  `${NameSpace.Data}/fetchNearby`,
  async (id, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);
    return data;
  },
);

export const fetchFavoritesAction = createAsyncThunk<FavoriteItem[], undefined, AsyncThunkConfig>(
  `${NameSpace.Data}/fetchFavorites`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<FavoriteItem[]>(APIRoute.Favorite);
    return data;
  },
);

export const changeFavoriteStatusAction = createAsyncThunk<
  OfferPreview,
  FavoriteData,
  AsyncThunkConfig
>(`${NameSpace.Data}/changeFavoriteStatus`, async ({ status, offerId }, { extra: api }) => {
  const { data } = await api.post<OfferPreview>(`${APIRoute.Favorite}/${offerId}/${status}`);
  return data;
});

export const postReviewAction = createAsyncThunk<Review, ReviewData, AsyncThunkConfig>(
  `${NameSpace.Data}/postReview`,
  async ({ comment, rating, offerId }, { extra: api }) => {
    const { data } = await api.post<Review>(`${APIRoute.Review}/${offerId}`, { comment, rating });
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, AsyncThunkConfig>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, AsyncThunkConfig>(
  `${NameSpace.User}/login`,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    dispatch(fetchOffersAction());
    saveToken(data.token);
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  `${NameSpace.User}/logout`,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dispatch(fetchOffersAction());
    dropToken();
  },
);
