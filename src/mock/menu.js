const getWatchlistNumber = (cards) => cards.filter((card) => card.isInWatchlist).length;

const getHistoryNumber = (cards) => cards.filter((card) => card.isWatched).length;

const getFavouritesNumber = (cards) => cards.filter((card) => card.isFavourite).length;

const generateMenu = (cards) => {
  return {
    watchlist: getWatchlistNumber(cards),
    history: getHistoryNumber(cards),
    favourites: getFavouritesNumber(cards)
  };
};

export {generateMenu};
