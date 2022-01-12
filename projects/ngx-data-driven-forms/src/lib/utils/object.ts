export class ObjectUtils {

  public static hasProperties<T>(obj: unknown, properties: string[]): string[] {
    // @ts-ignore
    return properties.filter(_ => (obj as T)[_] === undefined);
  }

}
