import { State } from '../../index.ts';
import { OfferFull, OfferPreview, Review } from '../../../types.ts';
import { NameSpace, Status } from '../../../const.ts';

export const getOffers = (state: State): OfferPreview[] => state[NameSpace.Data].offers;
export const getIsOffersLoading = (state: State): boolean => state[NameSpace.Data].isOffersLoading;

export const getOffer = (state: State): OfferFull | null => state[NameSpace.Data].offer;
export const getIsOfferLoading = (state: State): boolean => state[NameSpace.Data].isOfferLoading;

export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;
export const getIsReviewsLoading = (state: State): boolean =>
  state[NameSpace.Data].isReviewsLoading;

export const getNearby = (state: State): OfferPreview[] => state[NameSpace.Data].nearby;
export const getIsNearbyLoading = (state: State): boolean => state[NameSpace.Data].isNearbyLoading;

export const getFavorites = (state: State): OfferPreview[] => state[NameSpace.Data].favorites;
export const getFavoriteCount = (state: State): number => state[NameSpace.Data].favorites.length;
export const getIsFavoritesLoading = (state: State): boolean =>
  state[NameSpace.Data].isFavoritesLoading;

export const getHasError = (state: State): boolean => state[NameSpace.Data].hasError;
export const getReviewsHasError = (state: State): Status => state[NameSpace.Data].reviewsStatus;

export const getIsFavoriteStatusSubmitting = (state: State): boolean =>
  state[NameSpace.Data].isFavoriteStatusSubmitting;

export const getIsReviewsStatusSubmitting = (state: State): boolean =>
  state[NameSpace.Data].isReviewsStatusSubmitting;
