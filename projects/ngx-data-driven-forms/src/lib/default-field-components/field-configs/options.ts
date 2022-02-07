export type IOptionsConfig = HardCodedSelect | APISource;

export function isOptions(r: unknown): r is IOptionsConfig {
  if (typeof r === 'object') {
    return (r?.hasOwnProperty('options') ?? false) || (r?.hasOwnProperty('apiSourceString') ?? false)
  }
  return false;
}

export interface HardCodedSelect {
  options: {display: string, value: string | number}[]
}

export interface APISource {
  apiSourceString: string;
}
