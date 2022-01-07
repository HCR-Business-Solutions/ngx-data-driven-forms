import {DateUtils} from './date';

export class SupportedLogicUtils {

  public static hasValue(value: any, check: boolean) {
    if (!check) return undefined;
    return value !== null && value !== undefined;
  }

  public static valueMatches(value: any, match: any) {
    return value === match;
  }

  public static pattern(value: string, pattern: string): boolean | undefined {
    const regex = RegExp(pattern);
    return regex.test(value);
  }

  public static isLessThen(value: number, comp: number): boolean | undefined {
    return value < comp;
  }

  public static isGreaterThan(value: number, comp: number): boolean | undefined {
    return value > comp;
  }

  public static isEqualTo(value: number, comp: number): boolean | undefined {
    return value === comp;
  }

  public static isLessOrEqual(value: number, comp: number): boolean | undefined {
    return value <= comp;
  }

  public static isGreaterOrEqual(value: number, comp: number): boolean | undefined {
    return value >= comp;
  }

  public static isTruthy(value: any, check: boolean) {
    if (!check) return undefined;
    return !!value;

  }

  public static isFalsy(value: any, check: boolean) {
    if (!check) return undefined;
    return !value;
  }

  public static isDate(value: any, check: boolean) {
    if (!check) return undefined;
    return !!Date.parse(value);
  }

  public static isDateBefore(value: Date | string, compare: Date | string) {
    value = DateUtils.normalizeDate(value, true);
    compare = DateUtils.normalizeDate(compare, true);

    return value.getTime() < compare.getTime();

  }

  public static isDateAfter(value: Date | string, compare: Date | string) {
    value = DateUtils.normalizeDate(value, true);
    compare = DateUtils.normalizeDate(compare, true);

    return value.getTime() > compare.getTime();
  }

  public static isDateOn(value: Date | string, compare: Date | string) {
    value = DateUtils.normalizeDate(value, true);
    compare = DateUtils.normalizeDate(compare, true);

    return value.getTime() === compare.getTime();
  }

  public static isDateOnOrBefore(value: Date | string, compare: Date | string) {
    value = DateUtils.normalizeDate(value, true);
    compare = DateUtils.normalizeDate(compare, true);

    return value.getTime() <= compare.getTime();
  }

  public static isDateOnOrAfter(value: Date | string, compare: Date | string) {
    value = DateUtils.normalizeDate(value, true);
    compare = DateUtils.normalizeDate(compare, true);

    return value.getTime() >= compare.getTime();
  }

  public static isAgeGreaterThan(value: Date | string, compare: number) {
    value = DateUtils.normalizeDate(value, true);
    const age = DateUtils.calculateAge(value);
    return age > compare;
  }

  public static isAgeLessThan(value: Date | string, compare: number) {
    value = DateUtils.normalizeDate(value, true);
    const age = DateUtils.calculateAge(value);
    return age < compare;
  }

  public static isAgeEqualTo(value: Date | string, compare: number) {
    value = DateUtils.normalizeDate(value, true);
    const age = DateUtils.calculateAge(value);
    return age === compare;
  }

  public static isAgeGreaterOrEqual(value: Date | string, compare: number) {
    value = DateUtils.normalizeDate(value, true);
    const age = DateUtils.calculateAge(value);
    return age >= compare;
  }

  public static isAgeLessOrEqual(value: Date | string, compare: number) {
    value = DateUtils.normalizeDate(value, true);
    const age = DateUtils.calculateAge(value);
    return age < compare;
  }

}
