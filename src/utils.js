const getRandomInteger = (min, max) => Math.ceil(min - 0.5 + Math.random() * (max - min + 1));

const getRandomBoolean = () => Math.random() > 0.5;

export {getRandomInteger, getRandomBoolean}
