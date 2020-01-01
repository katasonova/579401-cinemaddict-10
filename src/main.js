import {render} from './utils/render'
import UserLevel from './components/user-level'
import Menu from './components/menu'
import MoviesContainer from './components/movies-container'
import {generateMoviesCards} from './mock/movie-card'
import {generateMenu} from './mock/menu'
import PageController from './controllers/page'

const MOVIES_NUMBER = 14;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const cards = generateMoviesCards(MOVIES_NUMBER);
const filters = generateMenu(cards);

render(headerElement, new UserLevel().getElement());
render(mainElement, new Menu(filters).getElement());

const moviesContainer = new MoviesContainer();
render(mainElement, moviesContainer.getElement());

const pageController = new PageController(moviesContainer);
pageController.render(cards);
