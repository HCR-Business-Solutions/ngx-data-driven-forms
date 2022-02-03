export type IOptionsConfig = HardCodedSelect | APISource;

export function isOptions(r: unknown): r is IOptionsConfig {
  return 'options' in (r as any) || 'apiSourceString' in (r as any);
}

export interface HardCodedSelect {
  options: {display: string, value: string | number}[]
}

export interface APISource {
  apiSourceString: string;
}
