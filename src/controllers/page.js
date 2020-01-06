import {render} from '../utils/render';
import {isEscWasPressed} from '../utils/common';
import Sort, {SortingType} from '../components/sort';
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
    render(document.querySelector(`body`), openedCard.getElement());
  };

  const closeMovieCardPopupHandler = (evt, element) => {
    isEscWasPressed(evt, () => {
      element.getElement().remove();
      element.removeElement();
      document.removeEventListener(`keydown`, closeMovieCardPopupHandler);
    });
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
    this._sort = new Sort();
    this._moviesList = new MoviesList();
    this._noMovies = new NoMovies();
    this._showMoreButton = new SnowMoreButton();
  }

  renderCards(container, array) {
    array.slice(0, INITIAL_MOVIES_NUMBER).forEach((card) => renderCard(container, card));
  }

  render(cards) {
    const container = this._container.getElement();
    if (!cards.length) {
      render(container, this._noMovies.getElement());
      return;
    }

    render(container, this._sort.getElement());

    render(container, this._moviesList.getElement());

    const moviesContainerElement = container.querySelector(`.films-list__container`);

    let sortedCards = cards;
    const sortHandler = (type) => {
      moviesContainerElement.innerHTML = ``;

      switch (type) {
        case SortingType.DATE:
          sortedCards = cards.slice().sort((a, b) => b.year - a.year);
          break;
        case SortingType.RATING:
          sortedCards = cards.slice().sort((a, b) => b.rating - a.rating);
          break;
        case SortingType.DEFAULT:
          sortedCards = cards.slice();
          break;
      }
      this.renderCards(moviesContainerElement, sortedCards);
      render(moviesListSection, this._showMoreButton.getElement());
    };
    this._sort.setSortingTypeClickHandler(sortHandler);

    this.renderCards(moviesContainerElement, sortedCards);

    const moviesListSection = container.querySelector(`.films-list`);
    render(moviesListSection, this._showMoreButton.getElement());

    render(container, new MovieList(`Top Rated`).getElement());
    render(container, new MovieList(`Most Commented`).getElement());

    const getTopRatedMovies = () => {
      const sortedCardsByRating = cards.slice().sort((a, b) => b.rating - a.rating);
      return sortedCardsByRating.slice(0, 2);
    };

    const getTopCommentedMovies = () => {
      const sortedCardsByComments = cards.slice().sort((a, b) => b.comments - a.comments);
      return sortedCardsByComments.slice(0, 2);
    };

    const topRatedMovies = getTopRatedMovies(cards);
    const topCommentedMovies = getTopCommentedMovies(cards);

    const movieLists = container.querySelectorAll(`.films-list--extra .films-list__container`);
    topRatedMovies.forEach((card) => renderCard(movieLists[0], card));
    topCommentedMovies.forEach((card) => renderCard(movieLists[1], card));

    let presentMoviesNumber = INITIAL_MOVIES_NUMBER;
    const showMoreButtonClickHandler = () => {
      const renderedMovies = presentMoviesNumber;
      presentMoviesNumber += MOVIES_TO_LOAD_MORE;

      sortedCards.slice(renderedMovies, presentMoviesNumber).forEach((card) => renderCard(moviesContainerElement, card));

      if (presentMoviesNumber >= sortedCards.length) {
        this._showMoreButton.getElement().remove();
        presentMoviesNumber = INITIAL_MOVIES_NUMBER;
      }
    };

    this._showMoreButton.setShowMoreClickButtonHandler(showMoreButtonClickHandler);
  }
}

