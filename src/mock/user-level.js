import {getRandomInteger} from '../utils';

const Level = {
  MIN: 1,
  MAX: 100
};

const generateUserLevel = () => getRandomInteger(Level.MIN, Level.MAX);

export {generateUserLevel};
