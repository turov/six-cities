const RATING_STARS = 5;

const convertCapitalizeFirstLetter = (word: string) => word[0].toUpperCase() + word.slice(1);

const calculateRatingPercentage = (rating: number, stars: number = RATING_STARS) =>
  (window.Math.round(rating) * 100) / stars;

const getPluralSuffix = (count: number) => (count === 1 ? '' : 's');

export { convertCapitalizeFirstLetter, calculateRatingPercentage, getPluralSuffix };
