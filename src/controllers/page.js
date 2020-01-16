import {render} from '../utils/render';
import Sort, {SortingType} from '../components/sort';
import MoviesList from '../components/movies-list';
import NoMovies from '../components/no-movies';
import SnowMoreButton from '../components/show-more-button';
import MovieList from '../components/extra-movie-list';
import MovieController from '../controllers/movie';


const INITIAL_MOVIES_NUMBER = 5;
const MOVIES_TO_LOAD_MORE = 5;

export default class PageController {
  constructor(container) {
    this._container = container;
    this._sort = new Sort();
    this._moviesList = new MoviesList();
    this._noMovies = new NoMovies();
    this._showMoreButton = new SnowMoreButton();
    this._showedMovieControllers = [];
  }

  renderCards(container, array) {
    return array.map((card) => {
      const movieController = new MovieController(container);
      movieController.renderCard(card);
      return movieController;
    });
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
      const newCards = this.renderCards(moviesContainerElement, sortedCards.slice(0, INITIAL_MOVIES_NUMBER));
      this._showedMovieControllers = this._showedMovieControllers.concat(newCards);

      render(moviesListSection, this._showMoreButton.getElement());
    };
    this._sort.setSortingTypeClickHandler(sortHandler);

    this.renderCards(moviesContainerElement, sortedCards.slice(0, INITIAL_MOVIES_NUMBER));

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
    this.renderCards(movieLists[0], topRatedMovies);
    this.renderCards(movieLists[1], topCommentedMovies);

    let presentMoviesNumber = INITIAL_MOVIES_NUMBER;
    const showMoreButtonClickHandler = () => {
      const renderedMovies = presentMoviesNumber;
      presentMoviesNumber += MOVIES_TO_LOAD_MORE;

      const newCards = this.renderCards(moviesContainerElement, sortedCards.slice(renderedMovies, presentMoviesNumber));
      this._showedMovieControllers = this._showedMovieControllers.concat(newCards);


      if (presentMoviesNumber >= sortedCards.length) {
        this._showMoreButton.getElement().remove();
        presentMoviesNumber = INITIAL_MOVIES_NUMBER;
      }
    };

    this._showMoreButton.setShowMoreClickButtonHandler(showMoreButtonClickHandler);
  }
}

