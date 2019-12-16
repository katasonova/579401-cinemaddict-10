const MAX_RATING = 10;
const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
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
}

const MovieDuration = {
  HOURS: {
    MIN: 1,
    MAX: 3
  },
  MIN: {
    MIN: 1,
    MAX: 59
  }
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

const getRandomInteger = (min, max) => min - 0.5 + Math.random() * (max - min + 1);

const getRandomArrayElement = (array) => array[Math.floor(Math.rsandom() * array.length)];

const getRandomRating = () => (Math.random() * MAX_RATING).toFixed(1);

const getRandomDescription = (string) => {
  return string.split(`.`).filter(() => Math.random() > 0.5).slice(0, Math.ceil(Math.random() * MAX_SENTENCES)).join('.');
};

const getMovieDuration = () => {
  return `${getRandomInteger(MovieDuration.HOURS.MIN, MovieDuration.HOURS.MAX)}h ${getRandomInteger(MovieDuration.MIN.MIN, MovieDuration.MIN.MAX)}m`
};

const getRandomBoolean = () => Math.random() >= 0.5;

const generateMovieCard = () => {
  return {
    title: getRandomArrayElement(Title),
    rating: getRandomRating(),
    year: getRandomInteger(Year.MIN, Year.MAX),
    duration: getMovieDuration(),
    genre: getRandomArrayElement(Genre),
    poster: getRandomArrayElement(Posters),
    description: getRandomDescription(DESCRIPTION),
    comments: `${getRandomInteger(Comments.MIN, Comments.MAX)} comments`,
    isFavourite: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isInWatchlist: getRandomBoolean()
  }
}

export {generateMovieCard};
