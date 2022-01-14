import {v4 as uuid} from 'uuid';

export function generateFieldUUID(): string {
  const unique = uuid();
  return 'fieldId-' + btoa(unique);
}
