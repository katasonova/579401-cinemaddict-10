import {isEscWasPressed} from '../utils/common';
import Card from '../components/movie-card';
import ExtraMovieDetails from '../components/extra-movie-details';
import {render, replace} from '../utils/render';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._cardItem = null;
  }

  renderCard(card) {
    const oldCard = this._cardItem;
    this._cardItem = new Card(card);
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

    this._cardItem.setCardTitleClickHandler(() => {
      openMovieCardPopupHander(cardItemWithExtraDetails);
      document.addEventListener(`keydown`, (evt) => closeMovieCardPopupHandler(evt, cardItemWithExtraDetails));
    });

    this._cardItem.setCardPosterClickHandler(() => {
      openMovieCardPopupHander(cardItemWithExtraDetails);
      document.addEventListener(`keydown`, (evt) => closeMovieCardPopupHandler(evt, cardItemWithExtraDetails));
    });

    this._cardItem.setCardCommentsClickHandler(() => {
      openMovieCardPopupHander(cardItemWithExtraDetails);
      document.addEventListener(`keydown`, (evt) => closeMovieCardPopupHandler(evt, cardItemWithExtraDetails));
    });

    const closeCardPopupButton = cardItemWithExtraDetails.getElement().querySelector(`.film-details__close-btn`);
    closeCardPopupButton.addEventListener(`click`, () => {
      cardItemWithExtraDetails.getElement().remove();
    });

    this._cardItem.setAddToWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, {
        isInWatchlist: !card.isInWatchlist,
      }));
    });

    this._cardItem.setAddToWatchedListButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, {
        isWatched: !card.isWatched,
      }));
    });

    this._cardItem.setAddToFavoiriteListButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, {
        isFavourite: !card.isFavourite,
      }));
    });

    // cardItemWithExtraDetails.setAddToWatchlistButtonClickHandler(() => {
    //   this._onDataChange(this, card, Object.assign({}, card, {
    //     isWatched: !card.isWatched,
    //   }));
    // });

    // cardItemWithExtraDetails.setAddToWatchedListButtonClickHandler(() => {
    //   this._onDataChange(this, card, Object.assign({}, card, {
    //     isInWatchlist: !card.isInWatchlist,
    //   }));
    // });

    // cardItemWithExtraDetails.setAddToFavoiriteListButtonClickHandler(() => {
    //   this._onDataChange(this, card, Object.assign({}, card, {
    //     isFavourite: !card.isFavourite,
    //   }));
    // });

    if (oldCard) {
      replace(this._cardItem, oldCard);
    } else {
      render(this._container, this._cardItem.getElement());
    }
  }
}
