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
