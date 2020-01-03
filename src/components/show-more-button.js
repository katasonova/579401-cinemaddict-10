import AbstractComponent from './abstract';

const createSnowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class SnowMoreButton extends AbstractComponent {
  getTemplate() {
    return createSnowMoreButtonTemplate();
  }

  setShowMoreClickButtonHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
