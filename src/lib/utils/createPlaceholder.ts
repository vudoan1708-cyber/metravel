import { Loader } from '@svelteuidev/core';

export const createPlaceholder = (): HTMLElement => {
  const widget = document.createElement('placeholder');
  new Loader({
    target: widget,
  });
  return widget;
};
