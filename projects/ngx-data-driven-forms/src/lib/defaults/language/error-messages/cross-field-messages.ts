/**
 * cross-field-messages.ts
 * has error messages for all validators in 'ngx-data-driven-forms\src\lib\defauls\validators\cross-field-validators'
 * each message is an ErrorMessageFn which takes an error object and returns a string
 */

import { ErrorMessageFn } from '../../../core';

//non exported function getOrderText
//takes in an orderType (BEFORE, AFTER, ON, BEFORE_ON, AFTER_ON)
//returns a string
//if orderType is BEFORE, AFTER, ON, returns the orderType to lowercase
//if orderType is BEFORE_ON, AFTER_ON, returns the orderType to lowercase and replaces the underscore with a space
function getOrderText(orderType: string): string {
  if (orderType === 'BEFORE' || orderType === 'AFTER' || orderType === 'ON')
    return orderType.toLowerCase();
  return orderType.toLowerCase().replace('_', ' ');
}

//order error message
//error.order.dataType is the data type of the field (number, date, or unknown)
//error.order.orderType is expected order (BEFORE, AFTER, ON, BEFORE_ON, AFTER_ON)
//error.order.expected is the expected value
//error.order.actual is the actual value
//generate a message that describes the error and the expected value (convert date to locale)
//convert the orderType to a string using getOrderText
export const order: ErrorMessageFn = (error) => {
  // if error.order does not have required properties, return an empty string
  if (
    !error.order ||
    !error.order.dataType ||
    !error.order.orderType ||
    !error.order.expected ||
    !error.order.actual
  )
    return '';

  const dataType = error.order.dataType,
    orderType = getOrderText(error.order.orderType),
    expected = error.order.expected,
    actual = error.order.actual;
  if (dataType === 'number')
    return `Number must be ${orderType} ${expected}. Actual: ${actual}.`;
  if (dataType === 'date')
    return `Date must be ${orderType} ${expected.toLocaleDateString()}. Actual: ${actual.toLocaleDateString()}.`;
  return `Value must be ${orderType} ${expected}. Actual: ${actual}.`;
};
