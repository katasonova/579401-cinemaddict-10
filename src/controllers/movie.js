import {isEscWasPressed} from '../utils/common';
import Card from '../components/movie-card';
import ExtraMovieDetails from '../components/extra-movie-details';
import {render} from '../utils/render';

export default class MovieController {
  constructor(container) {
    this._container = container;
  }

  renderCard(card) {
    const cardItem = new Card(card);
    const cardItemWithExtraDetails = new ExtraMovieDetails(card);

    const openMovieCardPopupHander = (openedCard) => {
      render(document.querySelector(`body`), openedCard.getElement());
    };

    const closeMovieCardPopupHandler = (evt, element) => {
      isEscWasPressed(evt, () => {
        element.getElement().remove();
        element.removeElement();
        document.removeEventListener(`keydown`, closeMovieCardPopupHandler);
      });
    };

    cardItem.setCardTitleClickHandler(() => {
      openMovieCardPopupHander(cardItemWithExtraDetails);
      document.addEventListener(`keydown`, (evt) => closeMovieCardPopupHandler(evt, cardItemWithExtraDetails));
    });

    cardItem.setCardPosterClickHandler(() => {
      openMovieCardPopupHander(cardItemWithExtraDetails);
      document.addEventListener(`keydown`, (evt) => closeMovieCardPopupHandler(evt, cardItemWithExtraDetails));
    });

    cardItem.setCardCommentsClickHandler(() => {
      openMovieCardPopupHander(cardItemWithExtraDetails);
      document.addEventListener(`keydown`, (evt) => closeMovieCardPopupHandler(evt, cardItemWithExtraDetails));
    });

    const closeCardPopupButton = cardItemWithExtraDetails.getElement().querySelector(`.film-details__close-btn`);
    closeCardPopupButton.addEventListener(`click`, () => {
      cardItemWithExtraDetails.getElement().remove();
    });

    render(this._container, cardItem.getElement());
  }
}
