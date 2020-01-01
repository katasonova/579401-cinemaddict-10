import AbstractComponent from './abstract';

const createMovieListTemplate = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class MovieList extends AbstractComponent {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return createMovieListTemplate(this._title);
  }
}
