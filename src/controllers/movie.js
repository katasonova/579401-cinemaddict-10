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
    this._oldOpenedCard = null;
    this.setDefaultView = this.setDefaultView.bind(this);
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
    const oldOpenedCard = this._cardItemWithExtraDetails;

    this._cardItem = new Card(card);
    this._cardItemWithExtraDetails = new ExtraMovieDetails(card);

    this._openMovieCardPopupHander = (openedCard) => {
      render(document.querySelector(`body`), openedCard.getElement());
    };

    this._openPopover = () => {
      this._onViewChange();
      this._openMovieCardPopupHander(this._cardItemWithExtraDetails);
      document.addEventListener(`keydown`, (evt) => this._closeMovieCardPopupHandler(evt));
      this._mode = Mode.POPOVER;
    };

    this._closeMovieCardPopupHandler = (evt) => {
      isEscWasPressed(evt, () => {
        this._closeMoviePopover();
        document.removeEventListener(`keydown`, this._closeMovieCardPopupHandler);
      });
    };

    this._cardItem.setCardTitleClickHandler(this._openPopover);
    this._cardItem.setCardPosterClickHandler(this._openPopover);
    this._cardItem.setCardCommentsClickHandler(this._openPopover);

    this._cardItemWithExtraDetails.setCloseButtonClickHandler(() => this._closeMoviePopover());

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

    this._cardItemWithExtraDetails.setAddToWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, {
        isInWatchlist: !card.isInWatchlist,
      }));
    });

    this._cardItemWithExtraDetails.setAddToWatchedListButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, {
        isWatched: !card.isWatched,
      }));
    });

    this._cardItemWithExtraDetails.setAddToFavoiriteListButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, {
        isFavourite: !card.isFavourite,
      }));
    });

    if (oldCard && oldOpenedCard) {
      replace(this._cardItem, oldCard);
      replace(this._cardItemWithExtraDetails, oldOpenedCard);
    } else {
      render(this._container, this._cardItem.getElement());
    }
  }
}
