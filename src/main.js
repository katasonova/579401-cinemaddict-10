import {renderUserLevel} from './components/user-level'
import {renderMenu} from './components/menu'
import {generateMoviesCards} from './mock/movie-card'
import {generateMenu} from './mock/menu'
import {renderMovieCard} from './components/movie-card'
import {renderSnowMoreButton} from './components/show-more-button'
import {renderMovieList} from './components/extra-movie-list'
import {renderExtraMovieDetails} from './components/extra-movie-details'

const MOVIES_COUNT = 5;

const renderMoviesContainer = () => {
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container"></div>
      </section>
    </section>`
  );
};


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const cards = generateMoviesCards(MOVIES_COUNT);
const filters = generateMenu(cards);
render(headerElement, renderUserLevel());
render(mainElement, renderMenu(filters));
render(mainElement, renderMoviesContainer());
const moviesContainerElement = mainElement.querySelector(`.films-list__container`);

cards.forEach(card => render(moviesContainerElement, renderMovieCard(card)));

const moviesListSection = mainElement.querySelector(`.films-list`);
render(moviesListSection, renderSnowMoreButton());

const moviesExtraList = mainElement.querySelector(`.films`);
render(moviesExtraList, renderMovieList(`Top Rated`));
render(moviesExtraList, renderMovieList(`Most Commented`));

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
topRatedMovies.forEach(card => render(movieLists[0], renderMovieCard(card)));
topCommentedMovies.forEach(card => render(movieLists[1], renderMovieCard(card)));

//render(mainElement, renderExtraMovieDetails(cards[0]));

