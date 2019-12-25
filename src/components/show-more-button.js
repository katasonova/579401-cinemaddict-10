import {createElement} from '../utils';

const createSnowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class SnowMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSnowMoreButtonTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
