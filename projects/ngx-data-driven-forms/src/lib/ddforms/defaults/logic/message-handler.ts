import { ErrorMessageFunction } from '../../../shared/types';
 

export const min: ErrorMessageFunction = (error: any) => `Value must be less than or equal to  ${error.min ?? '??'}`;

export const max: ErrorMessageFunction = (error: any) => `Value must be greater than or equal to  ${error.max ?? '??'}`;

export const required: ErrorMessageFunction = () => `This value is required.`;

export const email: ErrorMessageFunction = () => `Must be a valid email.`;

export const minLength: ErrorMessageFunction = (error: any) => `Must be greater than ${error.requiredLength ?? '??'} characters long.`;

export const maxLength: ErrorMessageFunction = (error: any) => `Must be less than ${error.requiredLength ?? '??'} characters long.`;

export const pattern: ErrorMessageFunction = (error: any) => `Value must match pattern ${error.requiredPattern ?? '??'}`
