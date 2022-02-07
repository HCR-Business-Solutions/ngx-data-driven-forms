export function hasProperties<T>(obj: unknown, properties: string[]): string[] {
  // @ts-ignore
  return properties.filter((_) => (obj as T)[_] === undefined);
}

export function isNullOrUndefined(val?: any) {
  return val === null || val === undefined;
}
