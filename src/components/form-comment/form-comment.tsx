import { Fragment, useEffect, useState } from 'react';
import { getPluralSuffix } from '../../utils.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { postReviewAction } from '../../store/api-actions.ts';
import {
  getIsReviewsStatusSubmitting,
  getReviewsHasError,
} from '../../store/slices/app-data/selectors.ts';
import { setReviewsErrorStatus } from '../../store/slices/app-data/app-data.ts';
import { Status } from '../../const.ts';

const ratingTitlesToValues: Record<string, number> = {
  terribly: 1,
  badly: 2,
  'not bad': 3,
  good: 4,
  perfect: 5,
};

const MIN_LENGTH_COMMENT = 50;
const MAX_LENGTH_COMMENT = 300;
const DEFAULT_RATING = -1;

type FormCommentProps = {
  offerId: string;
};

function FormComment({ offerId }: FormCommentProps): JSX.Element {
  const dispatch = useAppDispatch();

  const isReviewsStatusSubmitting = useAppSelector(getIsReviewsStatusSubmitting);
  const reviewsStatus = useAppSelector(getReviewsHasError);

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [invalid, setInvalid] = useState(true);

  const disabledSubmitButton = invalid || isReviewsStatusSubmitting;

  const validateForm = (commentLength: number, newRating: number) => {
    const isInvalid = !(
      commentLength >= MIN_LENGTH_COMMENT &&
      commentLength <= MAX_LENGTH_COMMENT &&
      newRating !== DEFAULT_RATING
    );
    setInvalid(isInvalid);
  };

  const resetForm = () => {
    setComment('');
    setRating(DEFAULT_RATING);
    setInvalid(true);
  };

  useEffect(() => {
    if (reviewsStatus === Status.Success) {
      resetForm();
      dispatch(setReviewsErrorStatus(Status.Idle));
    }
  }, [reviewsStatus, dispatch]);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postReviewAction({ comment, rating, offerId }));
  };

  const handleClickStar = (newRating: number) => {
    setRating(newRating);
    validateForm(comment.length, newRating);
  };

  const handleChangeComment = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value: text } = evt.target;
    setComment(text);
    validateForm(text.length, rating);
  };

  const ratingFormMarkup = Object.entries(ratingTitlesToValues)
    .map(([title, ratingStar]) => (
      <Fragment key={title}>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={ratingStar}
          id={`${ratingStar}-stars`}
          type="radio"
          checked={ratingStar === rating}
          disabled={isReviewsStatusSubmitting}
          onChange={() => handleClickStar(ratingStar)}
        />
        <label
          htmlFor={`${ratingStar}-stars`}
          className="reviews__rating-label form__rating-label"
          title={title}
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </Fragment>
    ))
    .reverse();

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">{ratingFormMarkup}</div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        required
        onChange={handleChangeComment}
        disabled={isReviewsStatusSubmitting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least{' '}
          <b className="reviews__text-amount">{`${MIN_LENGTH_COMMENT} character${getPluralSuffix(
            MIN_LENGTH_COMMENT,
          )}`}</b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={disabledSubmitButton}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default FormComment;
