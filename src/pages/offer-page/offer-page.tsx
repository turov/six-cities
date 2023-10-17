import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingScreen from '../../components/loading-screen/loading-screen.tsx';
import { fetchNearbyAction, fetchOfferAction, fetchReviewsAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import OfferDescription from '../../components/offer-description/offer-description';
import OfferHost from '../../components/offer-host/offer-host';
import Reviews from '../../components/reviews/reviews';
import FormComment from '../../components/form-comment/form-comment';
import OfferMap from '../../components/offer-map/offer-map';
import NearbyPlaces from '../../components/nearby-places/nearby-places';
import {
  getIsNearbyLoading,
  getIsOfferLoading,
  getIsReviewsLoading,
  getNearby,
  getOffer,
  getReviews,
} from '../../store/slices/app-data/selectors.ts';
import { getAuthCheckedStatus } from '../../store/slices/user-process/selectors.ts';
import NotFoundPage from '../not-found-page/not-found-page.tsx';
import { OfferPreview } from '../../types.ts';

import { useAppOutletContext } from '../../components/layout/hooks.ts';

const MAX_OFFERS_PREVIEW = 3;

const getShuffledNearby = (nearby: readonly OfferPreview[]): OfferPreview[] =>
  [...nearby].sort(() => Math.random() - 0.5);

function OfferPage(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const { setPageInfo } = useAppOutletContext();

  const id = String(useParams().id);

  const offer = useAppSelector(getOffer);
  const reviews = useAppSelector(getReviews);
  const nearbyList = useAppSelector(getNearby);

  const isOfferLoading = useAppSelector(getIsOfferLoading);
  const isReviewsLoading = useAppSelector(getIsReviewsLoading);
  const isNearbyLoading = useAppSelector(getIsNearbyLoading);
  const isAuthorization = useAppSelector(getAuthCheckedStatus);

  const isAllLoading = isOfferLoading || isNearbyLoading || isReviewsLoading;

  const limitedNearby = getShuffledNearby(nearbyList).slice(0, MAX_OFFERS_PREVIEW);

  useEffect(() => {
    dispatch(fetchOfferAction(id));
    dispatch(fetchReviewsAction(id));
    dispatch(fetchNearbyAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    setPageInfo({ title: offer?.title || '', description: offer?.description || '' });
  }, [offer?.description, offer?.title, setPageInfo]);

  if (isAllLoading) {
    return <LoadingScreen />;
  }

  if (!offer) {
    return <NotFoundPage />;
  }

  const mapCenter = offer.city.location;

  const { images, description, host } = offer;

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <OfferGallery images={images} />
        <div className="offer__container container">
          <div className="offer__wrapper">
            <OfferDescription offer={offer} />
            <OfferHost host={host} description={description} />
            <Reviews reviews={reviews}>{isAuthorization && <FormComment offerId={id} />}</Reviews>
          </div>
        </div>
        <OfferMap
          offers={limitedNearby}
          centerCoordinates={mapCenter}
          selectedOfferId={id}
          currentOffer={offer}
        />
      </section>
      <div className="container">
        <NearbyPlaces nearPlaces={limitedNearby} />
      </div>
    </main>
  );
}

export default OfferPage;
