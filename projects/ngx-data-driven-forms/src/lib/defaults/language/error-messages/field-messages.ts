/**
 * field-messages.ts
 * has error messages for all validators in 'ngx-data-driven-forms\src\lib\defauls\validators\field-validators'
 * each message is an ErrorMessageFn which takes an error object and returns a string
 */
import { ErrorMessageFn } from '../../../core';

//ageEquals error message
export const ageEquals: ErrorMessageFn = (error) => {
  return `Age must be equal to ${error.ageEquals.expected}.`;
};

//ageGreaterEquals error message
export const ageGreaterEquals: ErrorMessageFn = (error) => {
  return `Age must be greater than or equal to ${error.ageGreaterEquals.expected}.`;
};

//ageGreater error message
export const ageGreater: ErrorMessageFn = (error) => {
  return `Age must be greater than ${error.ageGreater.expected}.`;
};

//ageLessEquals error message
export const ageLessEquals: ErrorMessageFn = (error) => {
  return `Age must be less than or equal to ${error.ageLessEquals.expected}.`;
};

//ageLess error message
export const ageLess: ErrorMessageFn = (error) => {
  return `Age must be less than ${error.ageLess.expected}.`;
};

//dateAfterOn error message (convert date to locale)
export const dateAfterOn: ErrorMessageFn = (error) => {
  return `Date must be after or on ${error.dateAfterOn.expected.toLocaleDateString()}.`;
};

//dateAfter error message (convert date to locale)
export const dateAfter: ErrorMessageFn = (error) => {
  return `Date must be after ${error.dateAfter.expected.toLocaleDateString()}.`;
};

//dateBeforeOn error message (convert date to locale)
export const dateBeforeOn: ErrorMessageFn = (error) => {
  return `Date must be before or on ${error.dateBeforeOn.expected.toLocaleDateString()}.`;
};

//dateBefore error message (convert date to locale)
export const dateBefore: ErrorMessageFn = (error) => {
  return `Date must be before ${error.dateBefore.expected.toLocaleDateString()}.`;
};

//dateOn error message (convert date to locale)
export const dateOn: ErrorMessageFn = (error) => {
  return `Date must be on ${error.dateOn.expected.toLocaleDateString()}.`;
};

//email error message
export const email: ErrorMessageFn = (error) => {
  return `Email is invalid.`;
};

//hasValue error message
export const hasValue: ErrorMessageFn = (error) => {
  return `Value is required.`;
};

//noValue error message
export const noValue: ErrorMessageFn = (error) => {
  return `Value is not allowed.`;
};

//maxlength error message
export const maxlength: ErrorMessageFn = (error) => {
  return `Value must be less than ${error.maxlength.requiredLength} characters.`;
};

// minlength error message
export const minlength: ErrorMessageFn = (error) => {
  return `Value must be at least ${error.minlength.requiredLength} characters.`;
};

//max error message
export const max: ErrorMessageFn = (error) => {
  return `Value must be less than ${error.max.max}.`;
};

//min error message
export const min: ErrorMessageFn = (error) => {
  return `Value must be greater than ${error.min.min}.`;
};

//numberEquals error message
export const numberEquals: ErrorMessageFn = (error) => {
  return `Value must be equal to ${error.numberEquals.expected}.`;
};

//numberGreaterEquals error message
export const numberGreaterEquals: ErrorMessageFn = (error) => {
  return `Value must be greater than or equal to ${error.numberGreaterEquals.expected}.`;
};

//numberGreater error message
export const numberGreater: ErrorMessageFn = (error) => {
  return `Value must be greater than ${error.numberGreater.expected}.`;
};

//numberLessEquals error message
export const numberLessEquals: ErrorMessageFn = (error) => {
  return `Value must be less than or equal to ${error.numberLessEquals.expected}.`;
};

//numberLess error message
export const numberLess: ErrorMessageFn = (error) => {
  return `Value must be less than ${error.numberLess.expected}.`;
};

//pattern error message
export const pattern: ErrorMessageFn = (error) => {
  return `Value is invalid.`;
};

//required error message
export const required: ErrorMessageFn = (error) => {
  return `Value is required.`;
};

//requiredTrue error message
export const requiredTrue: ErrorMessageFn = (error) => {
  return `Value must be true.`;
};
