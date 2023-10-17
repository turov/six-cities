import { useEffect, useRef } from 'react';
import useMap from './use-map.ts';
import { Icon, layerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location, OfferFull, OfferPreview } from '../../types.ts';
import styles from './map.module.css';

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

type MapProps = {
  centerCoordinates: Location;
  offers: OfferPreview[];
  selectedOfferId?: OfferPreview['id'];
  scrollWheelZoom?: boolean;
  currentOffer?: OfferFull;
};

function Map(props: MapProps): JSX.Element {
  const { centerCoordinates, offers, selectedOfferId, scrollWheelZoom, currentOffer } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, centerCoordinates, scrollWheelZoom);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      if (currentOffer) {
        const marker = new Marker({
          lat: currentOffer.location.latitude,
          lng: currentOffer.location.longitude,
        });

        marker.setIcon(currentCustomIcon).addTo(markerLayer);
      }

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedOfferId !== undefined && offer.id === selectedOfferId
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [currentOffer, map, offers, selectedOfferId]);

  useEffect(() => {
    if (map) {
      map.flyTo([centerCoordinates.latitude, centerCoordinates.longitude]);
    }
  }, [centerCoordinates, map]);

  return <div className={styles.map} ref={mapRef}></div>;
}

export default Map;
