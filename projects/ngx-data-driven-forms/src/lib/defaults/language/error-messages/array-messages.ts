import { ErrorMessageFn } from '../../../core';

export const arrayMin: ErrorMessageFn = (error) => {
  return `Minimum number of items is ${error.arrayMin.expected}.`;
};

export const arrayMax: ErrorMessageFn = (error) => {
  return `Maximum number of items is ${error.arrayMax.expected}.`;
};
