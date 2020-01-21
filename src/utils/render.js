export const render = (container, node, place = `beforeend`) => {
  switch (place) {
    case `afterbegin`:
      container.prepend(node);
      break;
    case `beforeend`:
      container.append(node);
      break;
  }
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};
