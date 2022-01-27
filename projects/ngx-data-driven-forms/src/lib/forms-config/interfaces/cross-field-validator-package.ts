import {ICrossFieldValidation} from './cross-field-validation';
import {ICustomCrossFieldValidation} from './custom-cross-field-validation';


export interface ICrossFieldValidatorPackage {

  sibling: string;
  expectedParentLevel: number;
  crossFieldValidation?: ICrossFieldValidation;
  customCrossFieldValidation?: ICustomCrossFieldValidation;

}
