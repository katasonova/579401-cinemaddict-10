import {isEscWasPressed} from '../utils/common';
import Card from '../components/movie-card';
import ExtraMovieDetails from '../components/extra-movie-details';
import {render, replace} from '../utils/render';

const Mode = {
  DEFAULT: `default`,
  POPOVER: `popover`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._cardItem = null;
    this._mode = Mode.DEFAULT;
    this._onViewChange = onViewChange;
    this._cardItemWithExtraDetails = null;
  }

  _closeMoviePopover() {
    this._cardItemWithExtraDetails.getElement().remove();
    this._mode = Mode.DEFAULT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeMoviePopover();
    }
  }

  renderCard(card) {
    const oldCard = this._cardItem;
    this._cardItem = new Card(card);
    this._cardItemWithExtraDetails = new ExtraMovieDetails(card);

    const openMovieCardPopupHander = (openedCard) => {
      render(document.querySelector(`body`), openedCard.getElement());
      this._mode = Mode.POPOVER;
    };

    // loop?
    this._closeMovieCardPopupHandler = (evt) => {
      isEscWasPressed(evt, () => {
        // this._cardItemWithExtraDetails.getElement().remove();
        this._closeMoviePopover();
        this._cardItemWithExtraDetails.removeElement();
        document.removeEventListener(`keydown`, this._closeMovieCardPopupHandler);
      });
    };

    this._cardItem.setCardTitleClickHandler(() => {
      openMovieCardPopupHander(this._cardItemWithExtraDetails);
      document.addEventListener(`keydown`, (evt) => this._closeMovieCardPopupHandler(evt));
    });

    this._cardItem.setCardPosterClickHandler(() => {
      openMovieCardPopupHander(this._cardItemWithExtraDetails);
      document.addEventListener(`keydown`, (evt) => this._closeMovieCardPopupHandler(evt));
    });

    this._cardItem.setCardCommentsClickHandler(() => {
      openMovieCardPopupHander(this._cardItemWithExtraDetails);
      document.addEventListener(`keydown`, (evt) => this._closeMovieCardPopupHandler(evt));
    });

    const closeCardPopupButton = this._cardItemWithExtraDetails.getElement().querySelector(`.film-details__close-btn`);
    closeCardPopupButton.addEventListener(`click`, () => {
      this._cardItemWithExtraDetails.getElement().remove();
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

    if (oldCard) {
      replace(this._cardItem, oldCard);
    } else {
      render(this._container, this._cardItem.getElement());
    }
  }
}
