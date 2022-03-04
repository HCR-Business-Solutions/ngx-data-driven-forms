# NGX Data Driven Forms (ngx-data-driven-forms)

Data driven forms is an angular component library that allows for developers to quickly and safely create forms from a
json configuration string.

## Installation & Setup

In a fresh angular project, run the following command

```bash
npm install @nys-hcr-its/ngx-data-driven-forms
```

After installation in your app.module.ts import the DDForms Module

```ts
import { DDFormsModule } from 'ngx-data-driven-forms'
```

and add the module to your Apps imports using `forRoot()`.

### Example

```ts
@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    DDFormsModule.forRoot({}),
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
```

Take notice of the empty object being passed to the `forRoot` function.

### DDForms Configuration

A configuration object can be defined with the `forRoot` function within the input, the possible Configurations are as
defined.

```ts
export interface ModuleConfig{
  staticValues?: {
    components?: Map<string, Type<any>>;
    conditions?: Map<string, ConditionsFunction>;
    crossFieldValidators?: Map<string, NormalizedCrossFieldValidator>;
    dataHandlers?: Map<string, DataHandlerFunction<any>>;
    fieldConfigValidators?: Map<string, FieldConfigValidator>;
    messageHandlers?: Map<string, ErrorMessageFunction>;
    validators?: Map<string, NormalizedValidator>;
  };

  skipDefaults?: {
    components?: boolean;
    conditions?: boolean;
    crossFieldValidators?: boolean;
    dataHandlers?: boolean;
    fieldConfigValidators?: boolean;
    messageHandlers?: boolean;
    validators?: boolean;
  };
  skipDefaultStyles?: boolean;
}
```

The static values allow developers to define custom logic, validators, components and more. Allowing for projects to
adapt the library to its own needs while still using the JSON Configurations provided.

Skip defaults allows developers to remove the default logic, validators, components, ect. This is to allow developers to
override base functionality.

While finally skip default styles will disable all default styling from the project.

## Writing the Form
The power of this application comes from being able to write a simple JSON file and have a consistent and accessible form render from it. There are many properties needed to create a fully functional form, but we have done our best to simplify as much as possible.

In addition, our library offers an **at runtime** form configuration validator that will return an error object defining incorrect configuration details.

###Basic Structure
An application object consists of a single json object with child properties defining all application areas.
```ts
application = {
  pages: [
    {
      ...Page Properties
      section: [
        {
          ...Section Properties
          questions: {
            question: {
              ... Question Properties
            },
          }
        }
      ]
    }
  ]
}
```
An Application is composed of 1-n Pages, A Page is composed of 1-n Sections, and a Section is composed of 1-n Questions.

### Defining A Question
A question only requires two properties `id` and `type`. The `id` **must** be unique  within the section it is defined or collisions will occur. Questions also accept multiple other properties. In order to create an accessible field you must define either `label` or `ariaLabel` where the `label ` will be displayed and an `ariaLabel` will only be available to screen readers.

#### The IQuestion Interface
```ts
export interface IQuestion {

  id: string; // MUST BE UNIQUE TO CONTAINING SECTION
  type: string; // Must be a type registedf with the consuming application.

  label?: string; // This or ariaLabel must be defined for accessibility. Allows the use of our custom special text handler. (See later section)
  ariaLabel?: string; // This or label must be defined for accessibility.
  placeholder?: string; // Placeholder text (optional)

  hint?: { // Hint Text Object.
    text: string; // Defined the content of the hint.
    style?: 'markdown' | 'plaintext'; // Defaults to plaintext; Allows for the use of markdown in hints
  };

  readonly?: boolean; // Field appears but is not editable
  isFlag?: boolean; // Field is hidden, useful for compute or extra validation.

  fieldConfig?: unknown; // An extendable object for defining more complex fields.


  validation?: IQuestionValidation; // Provides all default validators included within the project. (See later section)
  customValidation?: ICustomValidation; // Allows the use of custom validators that can be registered within the consuming application. (See later section)
  crossFieldValidation?: ICrossFieldValidatorPackage[]; // Allows the addition of cross field validators, validators that are trigured based off of other Questions. (See Later section)

  shouldAsk?: IStatements; // Conditions for Showing/Hiding fields, when not present the question will allways be asked. (See later section)
  retainWhenNotAsked?: boolean; // Defines if the value the question asks should be retained when the question is not asked. By default any not asked question will be cleared when hidden.
  
}
```
Please note the comments for each property.

#### Basic Validation
This library provides some basic validation for common questions. This will let you cover most forms.
```ts
export interface IQuestionValidation {
  min?: number; // html min validator (validates that the input is greater than or equal to the supplied value)
  max?: number; // html max validator (validates that the input is less than or equal to the supplied value)
  required?: boolean; // html required validator (validates that input has a value)
  requiredTrue?: boolean; // html requiredTrue validatior (validates that the input is true)
  email?: boolean; // html email validator (validates input is a valid email)
  minLength?: number; // html min length validator (validates character length is at least min)
  maxLength?: number; // html max length validator (validates character length does not exceed max)
  pattern?: string; // html pattern validator (validates that the input matches the supplied pattern)
  isGreaterThan?: number; // validates that the input is greater than supplied value.
  isLessThan?: number; // validaters that the input is less than supplied value
  isEqualTo?: number; // validates that the input is equal to supplied value
  isLessOrEqual?: number; // validates that the input is less than or equal to supplied value.
  isGreaterOrEqual?: number; // validates that the input is greater than or equal to supplied value
  isTruthy?: boolean; // validates that the input is truthy.
  isFalsy?: boolean; // validates that the input is falsy
  isDate?: boolean; // validates that the input is a date
  isDateBefore?: Date | string; // validates that the input is before a supplied date (or current date using $today)
  isDateAfter?: Date | string; // validates that the input is after a supplied date (or current date using $today)
  isDateOn?: Date | string; // validates that the input is on a supplied date (or current date using $today)
  isDateOnOrBefore?: Date | string; // validates that the input is on or before a supplied date (or currnet date using $today)
  isDateOnOrAfter?: Date | string; // validates that the input is on or after a supplied date (or current date using $today)
  isAgeGreaterThan?: number; // validates that the input (a date) results in an age (years) greater than the supplied value
  isAgeLessThan?: number; // validates that the input (a date) results in an age (years) less than the supplied value
  isAgeEqualTo?: number; // validates that the input (a date) results in an age (years) equal to the supplied value
  isAgeGreaterOrEqual?: number; // validates that the input (a date) results in an age (years) greater or eqaul to supplied value
  isAgeLessOrEqual?: number; // validates that the input (a date) resutls in an age (years) less or equal to supplied value.
}
```

#### Custom Validation 
The custom validation object expects key value pairs where key is a string and the value is anything. The key will be used to get relevant validators (see the Registering Logic and Components at Runtime Section).
```ts
question = {
  // ... Question Properties
  customValidation: {
    customValidator: true,
  }
}
```

#### Cross Field Validation
Cross field validators are applied in packages. A package expects a property `sibling` to point to the key of the sibling value to compare against. It also requires an `expectedParentLevel`, this tells the validator where the nearest common parent is:
1. Same Section
2. Same Page
3. Same Application

To add validators you use the `crossFieldValidation` property to add one of the provided default validators or the `customCrossFieldValidation` property to add a custom key value pair much like the normal validators.

The included validators are as follows:
```ts
export interface ICrossFieldValidation {

  requireIf?: boolean; // required if the sibling has a value
  requireIfMatch?: any; // required if the sibling as a value and the value matches the provided value.
  isLessThan?: boolean; // validates that the input is less than the sibling value 
  isGreaterThan?: boolean; // validates that the input is greater than the sibling value
  isEqualTo?: boolean; // validates that the input is equal to the sibling value
  isLessOrEqual?: boolean; // validates that the input is less than or equal to the sibling value
  isGreaterOrEqual?: boolean; // validates that the input is greater than or equal to the sibling value
  isDateBefore?: boolean; // validates that the input is before the sibling
  isDateAfter?: boolean; // validates that the input is after the sibling
  isDateOn?: boolean; // validates that the input and the sibling are on the same date
  isDateOnOrBefore?: boolean; // validates that the input is either on or before the sibling
  isDateOnOrAfter?: boolean; // validates that the input is either on or after the sibling 
}

```



## Registering Logic and Components at Runtime

In addition to statically defining logic and components on import, you may also register them in your application
lifecycle, this allows for greater flexibility but can cause race conditions and inconsistent functionality between
application modules. It is recommended that you place this registration in the **root component** of your application (
e.g: application.component.ts)

### Example

```ts
export class AppComponent implements OnInit {

  constructor(
    private ddformsConf: DataDrivenFormsConfigService,
  ) {
  }
  
  public onInit(): void {
    this.ddformsConf.registerComponent('map', MapInputComponent);
    this.ddformsConf.registerValidator('isValidLocation', ValidLocationValidatorFunction);
    this.ddformsConf.registerDataHandler('map', MapDataHandler);
    this.ddformsConf.registerErrorMessageHandler('isValidLocation', ValidLocationErrorHandler);
  }

}
```

Registering single items is as easy as providing a key and a value, you can also register multiple items at once using
the plural versions of the register functions.

## Registering Complex Components

Some components may need additional configuration, this can easily be done by using the `fieldConfig` property. Note that by default this field is `unknown`, so any consuming field must resolve this. Default fields that use this pattern are:
1. Select, Radio and Checkbox to provide Options
2. Mask to provide mask pattern.

It is recommended that developers add a fieldConfig validator for whatever fieldConfig they create and then register it with the `DataDrivenFormsConfigService` using the `registerFieldConfigValidators` function.

### Example

For ease of use, you can create 2 functions, one to validate the type and another to generate the error messages.
```ts
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
```

You would then register it like any other registration.
```ts
export class AppComponent implements OnInit {

  constructor(
    private ddformsConf: DataDrivenFormsConfigService,
  ) { }

  public onInit(): void {
    this.ddformsConf.registerFieldConfigValidators('mask', validateMask)
  }
  
}
``` 
