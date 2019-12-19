import {getRandomInteger} from '../utils';

const MAX_RATING = 10;
const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const MAX_SENTENCES = 3;

const Title = [
  `The Shawshank Redemption`,
  `Fight Club`,
  `The Godfather`,
  `The Dark Knight`,
  `Pulp Fiction`,
  `Forrest Gump`,
  `Lord of the Rings: The Fellowship of the Ring`,
  `Lord of the Rings: The Return of the King`,
  `The Matrix`,
  `Schindler's List`,
  `Inception`,
  `Goodfellas`,
  `The Silence of the Lambs`,
  `Raiders of the Lost Ark`,
  `Back to the Future`
];

const Year = {
  MIN: 1930,
  MAX: 2000
};

const Comments = {
  MIN: 1,
  MAX: 5
};

const MovieDuration = {
  HOURS: {
    MIN: 1,
    MAX: 3
  },
  MIN: {
    MIN: 1,
    MAX: 59
  }
};

const Months = [`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`];

const Days = {
  MIN: 1,
  MAX: 28
}

const Genre = [`Action`, `Adventure`, `Comedy`, `Crime`, `Drama`, `Fantasy`, `Historical`, `Thriller`];

const Posters = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`
];

const Names = [
  `Anthony Mann`,
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
  `Jack Nicholson`,
  `Ralph Fiennes`,
  `Dustin Hoffman`,
  `Anthony Hopkins`,
  `Marlon Brando`,
  `Jeremy Irons`
];

const Countries = [
  `USA`,
  `Canada`,
  `United Kingdom`,
  `France`,
  `Itly`,
  `Spain`
];

const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomRating = () => (Math.random() * MAX_RATING).toFixed(1);

const getRandomDescription = (string) => {
  return string.split(`.`).filter(() => Math.random() > 0.5).slice(0, Math.ceil(Math.random() * MAX_SENTENCES)).join(`.`);
};

const getMovieDuration = () => {
  return `${getRandomInteger(MovieDuration.HOURS.MIN, MovieDuration.HOURS.MAX)}h ${getRandomInteger(MovieDuration.MIN.MIN, MovieDuration.MIN.MAX)}m`;
};

const getRandomBoolean = () => Math.random() >= 0.5;

const getMovieTitle = () => getRandomArrayElement(Title);
const getYear = () => getRandomInteger(Year.MIN, Year.MAX);
const getGenre = () => getRandomArrayElement(Genre);

const getRandomArrayElements = (array, numberOfElements) => array.filter(() => Math.random() > 0.5).slice(0, numberOfElements);

const generateDate = (day, monthsArray) => `${getRandomInteger(day.MIN, day.MAX)} ${getRandomArrayElement(monthsArray)} ${getYear()}`

const generateGenres = () => Array.from(new Set(getRandomArrayElements(Genre, getRandomInteger(0, 3))));

const generateMovieCard = () => {
  return {
    title: getMovieTitle(),
    rating: getRandomRating(),
    year: getYear(),
    duration: getMovieDuration(),
    genre: getRandomArrayElement(generateGenres()),
    poster: getRandomArrayElement(Posters),
    description: getRandomDescription(DESCRIPTION),
    comments: getRandomInteger(Comments.MIN, Comments.MAX),
    isFavourite: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isInWatchlist: getRandomBoolean(),
    // extra
    director: getRandomArrayElements(Names, 1),
    writers: Array.from(new Set(getRandomArrayElements(Names, getRandomInteger(1, 3)))).join(`, `),
    actors: Array.from(new Set(getRandomArrayElements(Names, getRandomInteger(1, 3)))).join(`, `),
    releaseDate: generateDate(Days, Months),
    country: Array.from(new Set(getRandomArrayElements(Countries, getRandomInteger(1, 3)))).join(`, `),
    genres: generateGenres(),
    isAdultMovie: getRandomBoolean(),
  };
};

const generateMoviesCards = (number) => new Array(number).fill().map(generateMovieCard);

export {generateMovieCard, generateMoviesCards};
