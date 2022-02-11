export type IOptionsConfig = HardCodedSelect | APISource | KnownDataSourceReference;

export function isOptions(r: unknown): r is IOptionsConfig {
  if (typeof r === 'object') {
    return (r?.hasOwnProperty('options') ?? false) || (r?.hasOwnProperty('apiSourceString') ?? false) || (r?.hasOwnProperty('dataSourceRef') ?? false);
  }
  return false;
}

export function validateOptions(r: unknown): null | {[key: string]: any} {
  if (isOptions(r)) {
    if ('options' in r) {
      if (Array.isArray(r.options)) {
        return null;
      } else {
        return {optionsNotArray: true};
      }
    } else if('apiSourceString' in r) {
      if (!r.apiSourceString) {
        return {missingSourceString: true};
      }
    } else if('dataSourceRef' in r) {
      if (!r.dataSourceRef) {
        return {missingDataSourceRef: true};
      }
    }
    return null;
  } else {
    return {notOptions: true};
  }
}

export interface HardCodedSelect {
  options: {display: string, value: string | number}[]
}

export interface APISource {
  apiSourceString: string;
}

export interface KnownDataSourceReference {
  dataSourceRef: string;
}
