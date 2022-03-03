import {ErrorMessageFunction} from '../../../shared/types';


export const min: ErrorMessageFunction = (error: any) => `Value must be less than or equal to  ${error.min ?? '??'}.`;

export const max: ErrorMessageFunction = (error: any) => `Value must be greater than or equal to  ${error.max ?? '??'}.`;

export const required: ErrorMessageFunction = () => `This value is required.`;

export const email: ErrorMessageFunction = () => `Must be a valid email.`;

export const minLength: ErrorMessageFunction = (error: any) => `Must be greater than ${error.requiredLength ?? '??'} characters long.`;

export const maxLength: ErrorMessageFunction = (error: any) => `Must be less than ${error.requiredLength ?? '??'} characters long.`;

export const pattern: ErrorMessageFunction = (error: any) => `Value must match pattern ${error.requiredPattern ?? '??'}.`;

export const isTruthy: ErrorMessageFunction = () => `Value must be present.`;

export const isFalsy: ErrorMessageFunction = () => `Value must be absent.`;

export const lessThan: ErrorMessageFunction = (error: any) => `Value must be less than ${error.expected ?? '??'}.`;

export const greaterThan: ErrorMessageFunction = (error: any) => `Value must be greater than ${error.expected ?? '??'}.`;

export const equalTo: ErrorMessageFunction = (error: any) => `Value must be equal to ${error.expected ?? '??'}.`;

export const lessOrEqual: ErrorMessageFunction = (error: any) => `Value must be less than or equal to ${error.expected ?? '??'}.`;

export const greaterOrEqual: ErrorMessageFunction = (error: any) => `Value must be greater than or equal to ${error.expected ?? '??'}.`;

export const isDate: ErrorMessageFunction = () => `Must be a valid date.`;

export const dateBefore = (error: any) => `Date must be before ${new Date(error.expected ?? null)}.`;

export const dateAfter = (error: any) => `Date must be after ${new Date(error.expected ?? null)}.`;

export const dateOn = (error: any) => `Date must be on ${new Date(error.expected ?? null)}.`;

export const dateOnOrBefore = (error: any) => `Date must be on or before ${new Date(error.expected ?? null)}.`;

export const dateOnOrAfter = (error: any) => `Date must be on or after ${new Date(error.expected ?? null)}.`;

export const ageLess = (error: any) => `Must be younger than ${error.expected}.`;

export const ageGreater = (error: any) => `Must be older than ${error.expected}.`;

export const ageEqual = (error: any) => `Must be ${error.expected} years old.`;

export const ageLessOrEqual = (error: any) => `Must be ${error.expected} or younger.`;

export const ageGreaterOrEqual = (error: any) => `Must be ${error.expected} or older.`;

export const mask = (error: any) => `Value must match pattern ${error.requiredMask}.`;
