const getRandomInteger = (min, max) => Math.ceil(min - 0.5 + Math.random() * (max - min + 1));

const getRandomBoolean = () => Math.random() > 0.5;

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const isEscWasPressed = (evt, escPressHandler) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    escPressHandler();
  }
};

export {getRandomInteger, getRandomBoolean, createElement, isEscWasPressed};
