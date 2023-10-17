import { OfferFull } from '../../types.ts';

const MAX_IMAGES = 6;

type OfferGalleryProps = {
  images: OfferFull['images'];
};

function OfferGallery({ images }: OfferGalleryProps) {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.slice(0, MAX_IMAGES).map((image) => (
          <div key={image} className="offer__image-wrapper">
            <img className="offer__image" src={image} alt="Photo studio" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferGallery;
