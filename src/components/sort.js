import AbstractComponent from './abstract';

export const SortingType = {
  DEFAULT: `by-default`,
  DATE: `by-date`,
  RATING: `by-rating`
};

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sorting-type=${SortingType.DEFAULT} class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sorting-type=${SortingType.DATE} class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sorting-type=${SortingType.RATING} class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currenSortingType = SortingType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  setSortingTypeClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      this.getElement().querySelectorAll(`a`).forEach((el) => {
        el.classList.remove(`sort__button--active`);
      });

      const selectedSortingType = evt.target.dataset.sortingType;
      evt.target.classList.add(`sort__button--active`);

      if (this._currenSortingType === selectedSortingType) {
        return;
      }

      this._currenSortingType = selectedSortingType;
      handler(this._currenSortingType);
    });
  }
}
