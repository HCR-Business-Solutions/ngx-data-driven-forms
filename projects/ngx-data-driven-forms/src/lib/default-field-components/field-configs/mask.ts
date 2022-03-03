export function isMask(r: unknown): r is IMaskConfig {
  if (typeof r === 'object') {
    return (r?.hasOwnProperty('mask') ?? false);
  }
  return false;
}

export function validateMask(r: unknown): null | { [key: string]: any } {
  if (isMask(r)) {
    if ('mask' in r) {
      if (typeof r.mask === 'string') {
        return null;
      }
      return {maskNotString: true};
    }
    return {missingMask: true};
  } else {
    return {notMask: true};
  }
}


export interface IMaskConfig {
  mask: string;
}
