export const getChildHeights = (childrens: HTMLElement[]) => {
  return childrens.map((child) => child.offsetTop);
};
