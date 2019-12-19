
const getWatchlistNumber = (cards) => {
  let number = 0;
  cards.forEach((card) => card.isInWatchlist ? number++ : number);
  return number;
};

const getHistoryNumber = (cards) => {
  let number = 0;
  cards.forEach((card) => card.isWatched ? number++ : number);
  return number;
};

const getFavouritesNumber = (cards) => {
  let number = 0;
  cards.forEach((card) => card.isFavourite ? number++ : number);
  return number;
};

const generateMenu = (cards) => {
  return {
    watchlist: getWatchlistNumber(cards),
    history: getHistoryNumber(cards),
    favourites: getFavouritesNumber(cards)
  };
};

export {generateMenu};
