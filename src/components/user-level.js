import {generateUserLevel} from '../mock/user-level';

export const renderUserLevel = () => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${generateUserLevel()}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};
