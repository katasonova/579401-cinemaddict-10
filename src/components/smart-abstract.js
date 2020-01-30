import AbstractComponent from './abstract';

export default class AbstractSmartComponent extends AbstractComponent {
  constructor() {
    super();
  }

  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();
    if (parent) {
      parent.replaceChild(newElement, oldElement);
    }

    this.recoveryListeners();
  }
}
