import UserLevel from './components/user-level'
import Menu from './components/menu'
import MoviesContainer from './components/movies-container'
import MoviesList from './components/movies-list'
import NoMovies from './components/no-movies'
import {generateMoviesCards} from './mock/movie-card'
import {generateMenu} from './mock/menu'
import Card from './components/movie-card'
import SnowMoreButton from './components/show-more-button'
import MovieList from './components/extra-movie-list'
import ExtraMovieDetails from './components/extra-movie-details'

const MOVIES_NUMBER = 14;
const INITIAL_MOVIES_NUMBER = 5;
const MOVIES_TO_LOAD_MORE = 5;

const render = (container, node, place = `beforeend`) => {
  switch (place) {
    case `afterbegin`:
      container.prepend(node);
      break;
    case `beforeend`:
      container.append(node);
      break;
  }
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const cards = generateMoviesCards(MOVIES_NUMBER);
const filters = generateMenu(cards);
render(headerElement, new UserLevel().getElement());
render(mainElement, new Menu(filters).getElement());
render(mainElement, new MoviesContainer().getElement());
const moviesContainer = mainElement.querySelector(`.films`);

const openMovieCardPopupHander = (openedCard) => {
  render(mainElement, openedCard.getElement());
}

const closeMovieCardPopupHandler = (evt, element) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    element.getElement().remove();
    document.removeEventListener(`keydown`, closeMovieCardPopupHandler);
  }
};

const renderCard = (container, card) => {
  const cardItem = new Card(card);
  const cardItemWithExtraDetails = new ExtraMovieDetails(card);

  const cardTitle = cardItem.getElement().querySelector(`.film-card__title`);
  const cardPoster = cardItem.getElement().querySelector(`.film-card__poster`);
  const cardComments = cardItem.getElement().querySelector(`.film-card__comments`);

  cardTitle.addEventListener(`click`, () => {
    openMovieCardPopupHander(cardItemWithExtraDetails);
    document.addEventListener(`keydown`, (evt) => closeMovieCardPopupHandler(evt, cardItemWithExtraDetails));
  });

  cardPoster.addEventListener(`click`, () => {
    openMovieCardPopupHander(cardItemWithExtraDetails);
    document.addEventListener(`keydown`, (evt) => closeMovieCardPopupHandler(evt, cardItemWithExtraDetails));
  });

  cardComments.addEventListener(`click`, () => {
    openMovieCardPopupHander(cardItemWithExtraDetails);
    document.addEventListener(`keydown`, (evt) => closeMovieCardPopupHandler(evt, cardItemWithExtraDetails));
  });

  const closeCardPopupButton = cardItemWithExtraDetails.getElement().querySelector(`.film-details__close-btn`);
  closeCardPopupButton.addEventListener(`click`, () => {
    cardItemWithExtraDetails.getElement().remove();
  });

  render(container, cardItem.getElement());
}

if (cards.length === 0) {
  render(moviesContainer, new NoMovies().getElement());
} else {
  render(moviesContainer, new MoviesList().getElement());

  const moviesContainerElement = mainElement.querySelector(`.films-list__container`);
  let presentMoviesNumber = INITIAL_MOVIES_NUMBER;

  cards.slice(0, INITIAL_MOVIES_NUMBER).forEach(card => renderCard(moviesContainerElement, card));

  const moviesListSection = mainElement.querySelector(`.films-list`);
  render(moviesListSection, new SnowMoreButton().getElement());

  const moviesExtraList = mainElement.querySelector(`.films`);
  render(moviesExtraList, new MovieList(`Top Rated`).getElement());
  render(moviesExtraList, new MovieList(`Most Commented`).getElement());

  const getTopRatedMovies = (cards) => {
  const sortedCards = cards.slice().sort((a, b) => b.rating - a.rating);
  return sortedCards.slice(0, 2);
  };

  const getTopCommentedMovies = (cards) => {
  const sortedCards = cards.slice().sort((a, b) => b.comments - a.comments);
  return sortedCards.slice(0, 2);
  };

  const topRatedMovies = getTopRatedMovies(cards);
  const topCommentedMovies = getTopCommentedMovies(cards);

  const movieLists = mainElement.querySelectorAll(`.films-list--extra .films-list__container`);
  topRatedMovies.forEach(card => renderCard(movieLists[0], card));
  topCommentedMovies.forEach(card => renderCard(movieLists[1], card));

  const loadMoreButton = mainElement.querySelector(`.films-list__show-more`);
  loadMoreButton.addEventListener(`click`, () => {
  const renderedMovies = presentMoviesNumber;
  presentMoviesNumber += MOVIES_TO_LOAD_MORE;

  cards.slice(renderedMovies, presentMoviesNumber).forEach(card => renderCard(moviesContainerElement, card));

  if (presentMoviesNumber >= cards.length) {
    loadMoreButton.remove();
  }
  });
};
