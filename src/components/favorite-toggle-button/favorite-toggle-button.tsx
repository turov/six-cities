import { AppRoute, FavoriteStatus } from '../../const.ts';
import { changeFavoriteStatusAction } from '../../store/api-actions.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { getAuthCheckedStatus } from '../../store/slices/user-process/selectors.ts';
import { getIsFavoriteStatusSubmitting } from '../../store/slices/app-data/selectors.ts';

type BookmarkButtonProps = {
  isFavorite: boolean;
  id: string;
  iconWidth: number;
  iconHeight: number;
  buttonText: string;
  buttonClass: string;
  activeClass: string;
  iconClass: string;
};

function FavoriteToggleButton(props: BookmarkButtonProps) {
  const { isFavorite, id, buttonText, iconHeight, iconWidth, buttonClass, activeClass, iconClass } =
    props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const hasUserAuth = useAppSelector(getAuthCheckedStatus);
  const disabledBookmarkButton = useAppSelector(getIsFavoriteStatusSubmitting);

  const handleBookmarkClick = () => {
    if (!hasUserAuth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(
      changeFavoriteStatusAction({
        offerId: id,
        status: isFavorite ? FavoriteStatus.Remove : FavoriteStatus.Add,
      }),
    );
  };

  return (
    <button
      className={`bookmark-button button ${buttonClass} ${isFavorite ? activeClass : ''}`}
      type="button"
      disabled={disabledBookmarkButton}
      onClick={handleBookmarkClick}
    >
      <svg className={`bookmark-icon ${iconClass}`} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{buttonText}</span>
    </button>
  );
}

export default FavoriteToggleButton;
