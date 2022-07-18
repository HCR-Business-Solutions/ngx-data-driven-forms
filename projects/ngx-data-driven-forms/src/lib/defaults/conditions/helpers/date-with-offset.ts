interface Offset {
  year: number;
  month: number;
  date: number;
  hour: number;
  min: number;
  sec: number;
  ms: number;
}

function getStarting(
  dateStr: string
): { starting: Date | undefined; remainder: string } | undefined {
  if (!dateStr.startsWith('$')) return undefined;

  const todayRegex = new RegExp(/\$today/);
  const nowRegex = new RegExp(/\$now/);
  const dateRegex = new RegExp(/\$\(.*\)/);

  let starting: Date | undefined;
  let remainder: string | undefined;
  const todayCheck = todayRegex.exec(dateStr);
  const nowCheck = nowRegex.exec(dateStr);
  const dateCheck = dateRegex.exec(dateStr);
  if (
    [!!todayCheck, !!nowCheck, !!dateCheck].filter((v) => v === true).length > 1
  )
    return undefined;

  if (todayCheck || nowCheck) {
    starting = new Date();
    if (todayCheck) {
      starting.setHours(0, 0, 0, 0);
    }
    remainder = dateStr.replace(todayRegex, '');
  } else if (dateCheck) {
    const res = dateCheck[0].slice(2, -1);
    starting = new Date(res) ?? new Date();
    remainder = dateStr.replace(dateRegex, '');
  }
  return remainder ? { starting, remainder } : undefined;
}

function getOffset(offsetStr: string): Offset {
  const addSearch = new RegExp(/\+([0-9][a-zA-Z]*)*/g).exec(offsetStr);
  const subSearch = new RegExp(/\-([0-9][a-zA-Z]*)*/g).exec(offsetStr);

  let add = addSearch ? addSearch[0] : '';
  let sub = subSearch ? subSearch[0] : '';

  const getVal = (scale: string): number => {
    const posSearch = new RegExp(`[0-9]*${scale}`).exec(add);
    const pos = Number(
      (posSearch ? posSearch[0] : `0${scale}`).slice(0, -scale.length)
    );
    const negSearch = new RegExp(`[0-9]*${scale}`).exec(sub);
    const neg =
      Number((negSearch ? negSearch[0] : `0${scale}`).slice(0, -scale.length)) *
      -1;
    return pos + neg;
  };

  return {
    year: getVal('y') ?? 0,
    month: getVal('m') ?? 0,
    date: getVal('d') ?? 0,
    hour: getVal('h') ?? 0,
    min: getVal('min') ?? 0,
    sec: getVal('sec') ?? 0,
    ms: getVal('ms') ?? 0,
  };
}

export default function dateWithOffset(dateStr: string): Date | undefined {
  const startingResult = getStarting(dateStr);
  if (!startingResult) return undefined;
  const { starting, remainder } = startingResult;
  if (!starting) return undefined;
  const offset = getOffset(remainder);

  const offsetYear = starting.getFullYear() + offset.year;
  const offsetMonth = starting.getMonth() + offset.month;
  const offsetDate = starting.getDate() + offset.date;
  const offsetHour = starting.getHours() + offset.hour;
  const offsetMin = starting.getMinutes() + offset.min;
  const offsetSec = starting.getSeconds() + offset.sec;
  const offsetMs = starting.getMilliseconds() + offset.ms;

  return new Date(
    offsetYear,
    offsetMonth,
    offsetDate,
    offsetHour,
    offsetMin,
    offsetSec,
    offsetMs
  );
}
