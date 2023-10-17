import { calculateRatingPercentage } from '../../utils.ts';
import { Review } from '../../types.ts';

const dateTimeFormatInstance = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});

type ReviewItemProps = {
  review: Review;
};

function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  const { id, date, rating, user, comment } = review;
  const dateFormat = dateTimeFormatInstance.format(new Date(date));

  return (
    <li key={id} className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${calculateRatingPercentage(rating)}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>
          {dateFormat}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
