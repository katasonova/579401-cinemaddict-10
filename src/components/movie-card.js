const isPropertyActive = (property) => {
  return property ? `film-card__controls-item--active` : ``;
};

export const renderMovieCard = (card) => {
  return (
    `<article class="film-card">
    <h3 class="film-card__title">${card.title}</h3>
    <p class="film-card__rating">${card.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${card.year}</span>
      <span class="film-card__duration">${card.duration}</span>
      <span class="film-card__genre">${card.genre}</span>
    </p>
    <img src="${card.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${card.description}.</p>
    <a class="film-card__comments">${card.comments} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isPropertyActive(card.isInWatchlist)}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isPropertyActive(card.isWatched)}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${isPropertyActive(card.isFavourite)}">Mark as favorite</button>
    </form>
  </article>`
  );
};
