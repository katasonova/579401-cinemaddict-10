import AbstractComponent from './abstract';

const createMenuTemplate = (filters) => {
  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filters.watchlist}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filters.history}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filters.favourites}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional main-navigation__item--active">Stats</a>
  </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }
}
