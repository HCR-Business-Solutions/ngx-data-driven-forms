import { RequireAtLeastOne } from '../../types';
import { IRendererConfig } from './renderer-config';
import { ICrossFieldValidationPack } from './cross-field-validation-pack';
import { IShouldAsk } from './should-ask';

export interface IQuestion {
  id: string;
  type: string;

  label?: string;
  ariaLabel?: string;

  placeholder?: string;

  hint?: string;

  readonly?: boolean;
  isFlag?: boolean;

  fieldValidation?: { [key: string]: any };
  crossFieldValidation?: ICrossFieldValidationPack[];

  shouldAsk?: IShouldAsk;

  rendererConfig?: IRendererConfig;

  customProps?: { [key: string]: any };
}

export type IQuestionAccessible = RequireAtLeastOne<
  IQuestion,
  'label' | 'ariaLabel'
>;
