import { FavoriteItem, OfferFull, OfferPreview, Review } from '../../../types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const.ts';
import {
  changeFavoriteStatusAction,
  fetchFavoritesAction,
  fetchNearbyAction,
  fetchOfferAction,
  fetchOffersAction,
  fetchReviewsAction,
  postReviewAction,
} from '../../api-actions.ts';

const updateOfferList = (offers: OfferPreview[], updatedOffer: OfferPreview) => {
  const offerIndex = offers.findIndex((el) => el.id === updatedOffer.id);
  if (offerIndex !== -1) {
    offers[offerIndex] = updatedOffer;
  }
};

const updateFavoritesList = (
  favorites: OfferPreview[],
  updatedOffer: OfferPreview,
  isFavorite: boolean,
) => {
  const favoriteOfferIndex = favorites.findIndex((el) => el.id === updatedOffer.id);

  if (isFavorite && favoriteOfferIndex === -1) {
    favorites.push(updatedOffer);
  } else if (!isFavorite && favoriteOfferIndex !== -1) {
    favorites.splice(favoriteOfferIndex, 1);
  }
};

const updateOfferNearbyList = (nearby: OfferPreview[], updatedOffer: OfferPreview) => {
  const offerNearbyIndex = nearby.findIndex((el) => el.id === updatedOffer.id);
  if (offerNearbyIndex !== -1) {
    nearby[offerNearbyIndex].isFavorite = !nearby[offerNearbyIndex].isFavorite;
  }
};

const updateOfferIsFavorite = (state: AppData, id: string) => {
  if (state.offer && state.offer.id === id) {
    state.offer.isFavorite = !state.offer.isFavorite;
  }
};

type AppData = {
  offer: OfferFull | null;
  offers: OfferPreview[];
  nearby: OfferPreview[];
  reviews: Review[];
  isReviewsStatusSubmitting: boolean;
  favorites: FavoriteItem[];
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  isNearbyLoading: boolean;
  isReviewsLoading: boolean;
  isFavoritesLoading: boolean;
  isFavoriteStatusSubmitting: boolean;
  hasError: boolean;
  reviewsStatus: Status;
};

const initialState: AppData = {
  offer: null,
  offers: [],
  nearby: [],
  reviews: [],
  isReviewsStatusSubmitting: false,
  favorites: [],
  isOffersLoading: false,
  isOfferLoading: false,
  isNearbyLoading: false,
  isReviewsLoading: false,
  isFavoritesLoading: false,
  isFavoriteStatusSubmitting: false,
  hasError: false,
  reviewsStatus: Status.Idle,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setReviewsErrorStatus: (state, action: PayloadAction<Status>) => {
      state.reviewsStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.hasError = false;
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.hasError = true;
        state.isOffersLoading = false;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.hasError = false;
        state.isOfferLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.hasError = true;
        state.isOfferLoading = false;
      })
      .addCase(fetchNearbyAction.pending, (state) => {
        state.isNearbyLoading = true;
      })
      .addCase(fetchNearbyAction.fulfilled, (state, action) => {
        state.nearby = action.payload;
        state.isNearbyLoading = false;
      })
      .addCase(fetchNearbyAction.rejected, (state) => {
        state.isNearbyLoading = false;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsLoading = false;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.reviewsStatus = Status.Loading;
        state.isReviewsStatusSubmitting = true;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviewsStatus = Status.Success;
        state.isReviewsStatusSubmitting = false;
        state.reviews.push(action.payload);
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.reviewsStatus = Status.Error;
        state.isReviewsStatusSubmitting = false;
      })
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoritesLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isFavoritesLoading = false;
      })
      .addCase(changeFavoriteStatusAction.pending, (state) => {
        state.isFavoriteStatusSubmitting = true;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, { payload: payloadOffer }) => {
        state.isFavoriteStatusSubmitting = false;

        const { id, isFavorite } = payloadOffer;

        updateOfferList(state.offers, payloadOffer);
        updateFavoritesList(state.favorites, payloadOffer, isFavorite);
        updateOfferNearbyList(state.nearby, payloadOffer);
        updateOfferIsFavorite(state, id);
      })
      .addCase(changeFavoriteStatusAction.rejected, (state) => {
        state.isFavoriteStatusSubmitting = false;
      });
  },
});

export const { setReviewsErrorStatus } = appData.actions;
