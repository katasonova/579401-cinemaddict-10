const renderGenres = (genres) => {
  if (typeof genres === 'string') {
    return `<span class="film-details__genre">${genres}</span>`
  }
  return Array.from(genres).map(el => {
    return (
      `<span class="film-details__genre">${el}</span>`
    )
  }).join(``);
}

export const renderExtraMovieDetails = (card) => {
  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${card.poster}" alt="">

            <p class="film-details__age">${card.isAdultMovie ? `18+` : ``}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${card.title}</h3>
                <p class="film-details__title-original">Original: ${card.title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${card.rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${card.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${card.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${card.actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${card.releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${card.duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${card.country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                ${renderGenres(card.genres)}
              </tr>
            </table>

            <p class="film-details__film-description">
              ${card.description}
          </div>
        </div>
      </div>
        </section>
      </div>
    </form>
  </section>`
  );
};
