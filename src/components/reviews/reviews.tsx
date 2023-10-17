import ReviewItem from '../review-item/review-item.tsx';
import { Review } from '../../types.ts';

const MAX_REVIEWS_COUNT = 10;

const getReviewsToRender = (reviews: readonly Review[]): Review[] =>
  [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_REVIEWS_COUNT);

type ReviewsProps = {
  reviews: Review[];
  children?: React.ReactNode;
};

function Reviews({ reviews, children }: ReviewsProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {getReviewsToRender(reviews).map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
      {children}
    </section>
  );
}

export default Reviews;
