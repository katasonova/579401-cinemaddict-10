import {generateUserLevel} from '../mock/user-level';
import AbstractComponent from './abstract';

const createUserLevelTemplate = () => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${generateUserLevel()}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export default class UserLevel extends AbstractComponent {
  getTemplate() {
    return createUserLevelTemplate();
  }
}
