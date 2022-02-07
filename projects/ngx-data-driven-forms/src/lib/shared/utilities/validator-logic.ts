import { NumberComparison } from '..';
import { calculateAge, normalizeDate } from './date';

export const NUMBER_COMPARISONS = {
  'lessThan': isLessThan,
  'greaterThan': isGreaterThan,
  'equalTo': isEqualTo,
  'lessOrEqual': isLessOrEqual,
  'greaterOrEqual': isGreaterOrEqual
}

export function hasValue(value: any, check: boolean) {
  if (!check) return undefined;
  return value !== null && value !== undefined;
}

export function valueMatches(value: any, match: any) {
  return value === match;
}

export function pattern(value: string, pattern: string): boolean | undefined {
  const regex = RegExp(pattern);
  return regex.test(value);
}

export function isLessThan(value: number, comp: number): boolean {
  return value < comp;
}

export function isGreaterThan(value: number, comp: number): boolean {
  return value > comp;
}

export function isEqualTo(value: number, comp: number): boolean {
  return value === comp;
}

export function isLessOrEqual(value: number, comp: number): boolean {
  return value <= comp;
}

export function isGreaterOrEqual(value: number, comp: number): boolean {
  return value >= comp;
}

export function isTruthy(value: any, check: boolean) {
  if (!check) return undefined;
  return !!value;

}

export function isFalsy(value: any, check: boolean) {
  if (!check) return undefined;
  return !value;
}

export function isDate(value: any, check: boolean) {
  if (!check) return undefined;
  return !!Date.parse(value);
}

export function isDateBefore(value: Date | string, compare: Date | string) {
  value = normalizeDate(value, true);
  compare = normalizeDate(compare, true);

  return value.getTime() < compare.getTime();

}

export function isDateAfter(value: Date | string, compare: Date | string) {
  value = normalizeDate(value, true);
  compare = normalizeDate(compare, true);

  return value.getTime() > compare.getTime();
}

export function isDateOn(value: Date | string, compare: Date | string) {
  value = normalizeDate(value, true);
  compare = normalizeDate(compare, true);

  return value.getTime() === compare.getTime();
}

export function isDateOnOrBefore(value: Date | string, compare: Date | string) {
  value = normalizeDate(value, true);
  compare = normalizeDate(compare, true);

  return value.getTime() <= compare.getTime();
}

export function isDateOnOrAfter(value: Date | string, compare: Date | string) {
  value = normalizeDate(value, true);
  compare = normalizeDate(compare, true);

  return value.getTime() >= compare.getTime();
}

export function isAgeGreaterThan(value: Date | string, compare: number) {
  value = normalizeDate(value, true);
  const age = calculateAge(value);
  return age > compare;
}

export function isAgeLessThan(value: Date | string, compare: number) {
  value = normalizeDate(value, true);
  const age = calculateAge(value);
  return age < compare;
}

export function isAgeEqualTo(value: Date | string, compare: number) {
  value = normalizeDate(value, true);
  const age = calculateAge(value);
  return age === compare;
}

export function isAgeGreaterOrEqual(value: Date | string, compare: number) {
  value = normalizeDate(value, true);
  const age = calculateAge(value);
  return age >= compare;
}

export function isAgeLessOrEqual(value: Date | string, compare: number) {
  value = normalizeDate(value, true);
  const age = calculateAge(value);
  return age < compare;
}
