import PlaceList from '../place-list/place-list';
import { OfferPreview } from '../../types';

type NearbyPlacesProps = {
  nearPlaces: OfferPreview[];
};

function NearbyPlaces({ nearPlaces }: NearbyPlacesProps) {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        <PlaceList offers={nearPlaces} cardType="near-places" />
      </div>
    </section>
  );
}

export default NearbyPlaces;
