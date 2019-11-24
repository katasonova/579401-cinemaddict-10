import {renderUserLevel} from './components/user-level'
import {renderMenu} from './components/menu'
import {renderMovieCard} from './components/movie-card'
import {renderSnowMoreButton} from './components/show-more-button'
import {renderExtraMovieDetails} from './components/extra-movie-details'

const MOVIES_COUNT = 5;

const renderMoviesContainer = () => {
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
      </section>
    </section>`
  );
};

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

render(headerElement, renderUserLevel());
render(mainElement, renderMenu());
render(mainElement, renderMoviesContainer());
const moviesContainerElement = mainElement.querySelector(`.films-list__container`);

for (let i = 0; i < MOVIES_COUNT; i++) {
  render(moviesContainerElement, renderMovieCard());
}

render(mainElement, renderSnowMoreButton());
render(mainElement, renderExtraMovieDetails());
