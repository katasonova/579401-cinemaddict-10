import {getRandomInteger} from '../utils/common';

const Level = {
  MIN: 1,
  MAX: 100
};

const generateUserLevel = () => getRandomInteger(Level.MIN, Level.MAX);

export {generateUserLevel};
