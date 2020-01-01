const getRandomInteger = (min, max) => Math.ceil(min - 0.5 + Math.random() * (max - min + 1));

const getRandomBoolean = () => Math.random() > 0.5;

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export {getRandomInteger, getRandomBoolean, createElement}
