import dateWithOffset from './date-with-offset';

export default function normalizeDate(
  date: any,
  clearHours: boolean = false
): Date {
  let ret: Date | undefined;
  const dateType = typeof date;
  if (dateType === 'string' && (date as string).startsWith('$')) {
    ret = dateWithOffset(date);
  } else {
    ret = new Date(date);
  }
  if (clearHours && ret) {
    ret.setHours(0, 0, 0, 0);
  }
  return ret ?? new Date();
}
