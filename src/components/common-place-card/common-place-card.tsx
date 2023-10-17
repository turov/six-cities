import { Link } from 'react-router-dom';
import { convertCapitalizeFirstLetter, calculateRatingPercentage } from '../../utils.ts';
import { CardType } from '../place-list/place-list.tsx';
import { OfferPreview } from '../../types.ts';
import FavoriteToggleButton from '../favorite-toggle-button/favorite-toggle-button.tsx';

type PlaceCardProps = OfferPreview & {
  cardType: CardType;
  handleCardMouseEnter?: (id: OfferPreview['id']) => void;
  handleCardMouseLeave?: () => void;
};

function CommonPlaceCard(props: PlaceCardProps): JSX.Element {
  const { id, cardType, handleCardMouseEnter, handleCardMouseLeave, isFavorite, ...rest } = props;
  const pathCard = `/offer/${id}`;
  const ratingPercentage = calculateRatingPercentage(rest.rating);
  const capitalizedType = convertCapitalizeFirstLetter(rest.type);

  return (
    <article
      className={`${cardType}__card place-card`}
      onMouseEnter={() => handleCardMouseEnter?.(id)}
      onMouseLeave={() => handleCardMouseLeave?.()}
    >
      {rest.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={pathCard}>
          <img
            className="place-card__image"
            src={rest.previewImage}
            width={cardType === 'favorites' ? 150 : 260}
            height={cardType === 'favorites' ? 110 : 200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{rest.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <FavoriteToggleButton
            id={id}
            isFavorite={isFavorite}
            iconWidth={18}
            iconHeight={19}
            buttonClass="place-card__bookmark-button"
            activeClass="place-card__bookmark-button--active"
            iconClass="place-card__bookmark-icon"
            buttonText="In bookmarks"
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingPercentage}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={pathCard}>{rest.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizedType}</p>
      </div>
    </article>
  );
}

export default CommonPlaceCard;
