import {isEscWasPressed} from '../utils/common';
import Card from '../components/movie-card';
import ExtraMovieDetails from '../components/extra-movie-details';
import {render} from '../utils/render';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
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

    cardItem.setAddToWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, {
        isWatched: !card.isWatched,
      }));
    });

    cardItem.setAddToWatchedListButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, {
        isInWatchlist: !card.isInWatchlist,
      }));
    });

    cardItem.setAddToFavoiriteListButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, {
        isFavourite: !card.isFavourite,
      }));
    });

    cardItemWithExtraDetails.setAddToWatchlistButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isWatched: !card.isWatched,
      }));
    });

    cardItemWithExtraDetails.setAddToWatchedListButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isInWatchlist: !card.isInWatchlist,
      }));
    });

    cardItemWithExtraDetails.setAddToFavoiriteListButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isFavourite: !card.isFavourite,
      }));
    });

    render(this._container, cardItem.getElement());
  }
}
