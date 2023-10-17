import { OfferPreview, Location, OfferFull } from '../../types.ts';
import Map from '../../components/map/map.tsx';

type OfferMapProps = {
  offers: OfferPreview[];
  centerCoordinates: Location;
  selectedOfferId: string;
  currentOffer: OfferFull;
};

function OfferMap({ offers, centerCoordinates, selectedOfferId, currentOffer }: OfferMapProps) {
  return (
    <section className="offer__map map">
      <Map
        offers={offers}
        centerCoordinates={centerCoordinates}
        selectedOfferId={selectedOfferId}
        scrollWheelZoom={false}
        currentOffer={currentOffer}
      />
    </section>
  );
}

export default OfferMap;
