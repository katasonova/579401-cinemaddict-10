import {render} from '../utils/render';
import MoviesList from '../components/movies-list';
import NoMovies from '../components/no-movies';
import Card from '../components/movie-card';
import SnowMoreButton from '../components/show-more-button';
import MovieList from '../components/extra-movie-list';
import ExtraMovieDetails from '../components/extra-movie-details';

const INITIAL_MOVIES_NUMBER = 5;
const MOVIES_TO_LOAD_MORE = 5;

const renderCard = (container, card) => {
  const cardItem = new Card(card);
  const cardItemWithExtraDetails = new ExtraMovieDetails(card);

  const openMovieCardPopupHander = (openedCard) => {
    render(container, openedCard.getElement());
  };

  const closeMovieCardPopupHandler = (evt, element) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      element.getElement().remove();
      document.removeEventListener(`keydown`, closeMovieCardPopupHandler);
    }
  };

  cardItem.setCardTitleClickHandler(() => {
    openMovieCardPopupHander(cardItemWithExtraDetails);
    document.addEventListener(`keydown`, (evt) => closeMovieCardPopupHandler(evt, cardItemWithExtraDetails));
  });

  cardItem.setCardPosterClickHandler(() => {
    openMovieCardPopupHander(cardItemWithExtraDetails);
    document.addEventListener(`keydown`, (evt) => closeMovieCardPopupHandler(evt, cardItemWithExtraDetails));
  });

  cardItem.setCardCommentsClickHandler(() => {
    openMovieCardPopupHander(cardItemWithExtraDetails);
    document.addEventListener(`keydown`, (evt) => closeMovieCardPopupHandler(evt, cardItemWithExtraDetails));
  });

  const closeCardPopupButton = cardItemWithExtraDetails.getElement().querySelector(`.film-details__close-btn`);
  closeCardPopupButton.addEventListener(`click`, () => {
    cardItemWithExtraDetails.getElement().remove();
  });

  render(container, cardItem.getElement());
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._moviesList = new MoviesList();
    this._noMovies = new NoMovies();
    this._showMoreButton = new SnowMoreButton();
  }

  render(cards) {
    const container = this._container.getElement();
    if (cards.length === 0) {
      render(container, this._noMovies.getElement());
      return;
    }

    render(container, this._moviesList.getElement());

    const moviesContainerElement = container.querySelector(`.films-list__container`);
    let presentMoviesNumber = INITIAL_MOVIES_NUMBER;

    cards.slice(0, INITIAL_MOVIES_NUMBER).forEach((card) => renderCard(moviesContainerElement, card));

    const moviesListSection = container.querySelector(`.films-list`);
    render(moviesListSection, this._showMoreButton.getElement());

    render(container, new MovieList(`Top Rated`).getElement());
    render(container, new MovieList(`Most Commented`).getElement());

    const getTopRatedMovies = () => {
      const sortedCards = cards.slice().sort((a, b) => b.rating - a.rating);
      return sortedCards.slice(0, 2);
    };

    const getTopCommentedMovies = () => {
      const sortedCards = cards.slice().sort((a, b) => b.comments - a.comments);
      return sortedCards.slice(0, 2);
    };

    const topRatedMovies = getTopRatedMovies(cards);
    const topCommentedMovies = getTopCommentedMovies(cards);

    const movieLists = container.querySelectorAll(`.films-list--extra .films-list__container`);
    topRatedMovies.forEach((card) => renderCard(movieLists[0], card));
    topCommentedMovies.forEach((card) => renderCard(movieLists[1], card));

    const showMoreButtonClickHandler = () => {
      const renderedMovies = presentMoviesNumber;
      presentMoviesNumber += MOVIES_TO_LOAD_MORE;

      cards.slice(renderedMovies, presentMoviesNumber).forEach((card) => renderCard(moviesContainerElement, card));

      if (presentMoviesNumber >= cards.length) {
        this._showMoreButton.getElement().remove();
      }
    };

    this._showMoreButton.setShowMoreClickButtonHandler(showMoreButtonClickHandler);
  }
}

