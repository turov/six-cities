import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Map, TileLayer } from 'leaflet';

import { Location } from '../../types.ts';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  centerCoordinates: Location,
  scrollWheelZoom = true,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: centerCoordinates.latitude,
          lng: centerCoordinates.longitude,
        },
        zoom: centerCoordinates.zoom,
        scrollWheelZoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, centerCoordinates, scrollWheelZoom]);

  return map;
}

export default useMap;
