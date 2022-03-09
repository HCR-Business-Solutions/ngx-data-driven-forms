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
import { DDFormsModule } from '@nys-hcr-its/ngx-data-driven-forms'
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
  staticValues?: { // Allows developers to register custom logic and components on component import.
    components?: Map<string, Type<any>>;
    conditions?: Map<string, ConditionsFunction>;
    crossFieldValidators?: Map<string, NormalizedCrossFieldValidator>;
    dataHandlers?: Map<string, DataHandlerFunction<any>>;
    fieldConfigValidators?: Map<string, FieldConfigValidator>;
    messageHandlers?: Map<string, ErrorMessageFunction>;
    validators?: Map<string, NormalizedValidator>;
  };

  skipDefaults?: { // Allows developers to skip loading default logic and components.
    components?: boolean;
    conditions?: boolean;
    crossFieldValidators?: boolean;
    dataHandlers?: boolean;
    fieldConfigValidators?: boolean;
    messageHandlers?: boolean;
    validators?: boolean;
  };
  skipDefaultStyles?: boolean; // Allows developers to disable default styling provided by the libary (keeps all classes in place)
}
```

### Registering Custom Logic and Components (On Import)
As shown in the comments above, it is possible to register custom logic and components when importing the Module, this can be done in addition to registering at runtime which is explained in a later section.

Each logic or component type is registered individually as a key value pair, where the key is the type of logic being registered and the value is a map of string logic pairs that will be available for use.

Each map expects a key value pair, please note that duplicate keys will overwrite the functionality with whichever functionality is defined latest.

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

#### Example Question
This json object will define a Question that asks a for a First Name 
```json
{
  "id": "firstName",
  "type": "text",
  "label": "First Name",
  "ariaLabel": "First Name",
  "hint": {
    "text": "Your first(given) name."
  },
  "validation": {
    "required": true,
    "minLength": 3
  }
}
```

### Defining A Section
A section is a group of similar questions, it requires a string `id`, an object `questions` which is a group of question objects, and a list of strings `questionOrder`.

The section `id` should be unique to the page. The `questions` object is an object of key value pairs where the key is the question's and the value is a defined question.

`questionOrder` is a list of question id strings which should point to your questions, this lets you define the order the questions will be shown in. Any question not in this list will not be displayed on the page.

#### The ISection Interface
```ts
export interface ISection {

  id: string; // An id, should be unique to the page this section is a part of.
  title?: string; // A Title for the section, displays a title for Section splitting.
  border?: boolean; // When true will apply the section-border css class to the section. 

  narrative?: { // When present defines a narrative section.
    text: string; // The content of the narrative.
    style?: 'markdown' | 'plaintext'; // allows to switch between markdown and plaintext
  };

  questions: IQuestionGroup; // A group of key value pairs defining where the key is the questionId and the value is a question object.
  questionOrder: string[]; // A list of questionIds that define the order that questions will be rendered in.

  repeat?: { // Defines if a section should repeat (and in what style).
    style: 'list' | 'table'; // Defines if the repeating section should be a list or table.
    inputStyle?: string; // Defines how to add new items.
    itemName?: string; // Defines an item name for list view
    minEntries?: number; // min number of entries
    maxEntries?: number; // max number of entries
  };
  shouldAsk?: IStatements; // Conditions for Showing/Hiding sections, when not present the question will allways be asked. (See later section) 
  retainWhenNotAsked?: boolean; // Defines if the values the section asks should be retained when the question is not asked. By default any not asked question will be cleared when hidden.

}
```

#### Example Section
This example json will define a section that asks for basic information. ***(Please note that the question will not be defined in full)***
```json
{
  "id": "basicInfo",
  "title": "Basic Information",
  "narrative": {
    "title": "Please enter your current information, legal name is not required."
  },
  "questions": {
    "firstName": {
      "id": "firstName",
      ... Question Properties
    },
    "middleName": {
      "id": "middleName",
      ... Question Properties
    },
    "lastName": {
      "id": "lastName",
      ... Question Properties
    }
  },
  "questionOrder": ["firstName", "middleName", "lastName"]
}
```

#### Example Repeating Section
This example will define a section that collects items. ***(Please note that the questions will not be defined in full)***
```json
{
  "id": "items",
  "title": "Items Available",
  "narrative": {
    "text": "A list of items available."
  },
  "questions": {
    "itemName": {
      "id": "itemName",
      ... Question Properties
    },
    "quantity": {
      "id": "quantity",
      ... Question Properties
    }
  },
  "questionOrder": ["itemName", "quantity"],
  "repeat": {
    "style": "list",
    "itemName": "Item"
  }
}
```

### Defining A Page
A Page is a group of sections that will be displayed on a single web page. A Page will most likely be a group of similar sections.

The page Object required the following:
- an `id` which should be unique to the application
- a `navigationName` which will should be a Human Recognizable name for navigation 
- a list of sections (as defined above) in an array `sections`

#### The IPage Interface
```ts
export interface IPage {

  id: string; // An id that must be unique to the application.
  navigationName: string; // A human readable name that will be used for navigation
  title?: string; // A title that can be displayed on a page for Label purposes.

  narrative?: { // If present will display a narrative section.
    text: string; // The content of a narrative block.
    style?: 'markdown' | 'plaintext'; // Allows the use of markdown or plaintext (with special rendering).
  };

  sections: ISection[]; // The sections that will be present on a page.

  shouldAsk?: IStatements; // Conditions for Showing/Hiding pages, when not present the question will allways be asked. (See later section) 
  retainWhenNotAsked?: boolean; // Defines if the values the page asks should be retained when the question is not asked. By default any not asked question will be cleared when hidden.

}
```
#### Example Page
This example json will define a page. ***(Please note that the sections will not be defined in full)***

```json
{
  "id": "example Page",
  "navigationName": "Example Page",
  "title": "Example Page",
  "narrative": {
    "text": "Defines an Example Page."
  },
  "sections": [
    {
      "id": "testSection1",
      ... Section Properties
    },
    {
      "id": "testSection2",
      ... Section Properties
    }
  ]
}
```

### Defining a Conditional "Should Ask" (Questions, Sections and Pages)
Questions and Sections both accept a property `shouldAsk` which allows for a conditional Show/Hide functionality based off of defined statements. ***(Note: When a Question/Section/Page is hidden in this manner it will not trigger validation.)***

`shouldAsk` is defined by the  `Statements` object which is composed of individual `Statement` objects as well as some meta info.
### Defining A Statement using The IStatement Interface
A statement requires a `sibling` which points to the id of a sibling and a `expectedParentLevel` which tells the statement checker where to look for the sibling ***(Note: These values refer to different objects for Questions, Sections and Pages)***

`expectedParentLevel` Values:
0. For Questions, Sibling is on Same Question (Not Possible). For Sections, Sibling is on Same Section. For Pages, Sibling is on Same Page.
1. For Questions, Sibling is on Same Section. For Sections, Sibling is on Same Page. For Pages, Sibling is on Same Application.
2. For Questions, Sibling is on Same Page. For Sections, Sibling is on Same Application. For Pages, this value is invalid.
3. For Questions, Sibling is on Same Application. For Sections, this value is invalid. For Pages, this value is invalid.

```ts
export interface IStatement {

  sibling: string; // The id of the sibling the conditions will be compared against.
  expectedParentLevel: number; // The expected parent level of the sibling(see above)
  conditions?: IConditions; // The default conditions that should be checked (see Default Conditions)
  customConditions?: ICustomConditions; // An object of key value pairs that will tell the Statement checker to run a custom condition (See Logic and Component Registration)
  check?: 'one' | 'all'; // Will tell the statement checker if the statement must meet one condition or all conditions, if not defined statement checker will only require one condition to pass.

}
```

#### Default Conditions
The default conditions are conditions that are defined by default by this library, the default conditions are very similar to the default validators.
```ts
export interface IConditions {
hasValue?: boolean; // Checks is sibling has a value.
valueMatches?: any; // Checks if the sibling has a value that matches a provided value.
pattern?: string; // Checks if the sibling matches the provided pattewrn
isLessThan?: number; // Checks if sibling has a value less than the provided value.
isGreaterThan?: number; // Checks if the sibling has a value greater than the provided value.
isEqualTo?: number; // Checks if the sibling has a value equal to the provided value.
isLessOrEqual?: number; // Checks if the sibling has a value less than or equal to the provided value.
isGreaterOrEqual?: number; // Checks if the sibling has a value that is greater than or equal to the provided value.
isTruthy?: boolean; // Checks if the sibling has a value that evaultes to true.
isFalsy?: boolean; // Checks if the sibling has a value that evaluates to fale.
isDate?: boolean; // Checks is the sibling is a date.
isDateBefore?: Date | string; // Checks if the sibling is a date before a given date (or the current date)
isDateAfter?: Date | string; // Checks if the sibling is a date after a given date (or the current date)
isDateOn?: Date | string; // Checks if the sibling is a date on a given date (or the current date)
isDateOnOrBefore?: Date | string; // Checks if the sibling is a date on or before a given date (or the current date)
isDateOnOrAfter?: Date | string; // Checks if the sibling is a date on or after a given datre (or the current date)
isAgeGreaterThan?: number; // Checks if the sibling date results in an age(years) greater than a given age(years)
isAgeLessThan?: number;// Checks if the sibling date results in an age(years) less than a given age(years)
isAgeEqualTo?: number; // Checks if the sibling date results in an age(years) equal to a given age(years)
isAgeGreaterOrEqual?: number; // Checks if the sibling date results in an age(years) greater than or equal to a given age(years)
isAgeLessOrEqual?: number; // Checks if the sibling date results in an an age(years) less than or equal to a given age(years)
}
````

#### Custom Conditions
Custom conditions are defined as a key value pair where the key is a string that will point to a registered condition (See Registering Custom Logic and Components), and the value is a value to compare against.

### Packaging Statements for a `shouldAsk` using the IStatements Interface
The `shouldAsk` property on Questions, Sections, and Pages expects a `Statements` object which consists of a list of statements, as well as an optional flag for the checking requirements.

The property ``statements`` accepts an array of the Statement Objects detailed above. This is required for a Statements Object

The property `check` is optional and will accept the values 'one' or 'all'. When one is selected only one statement must pass for the section/question to be displayed, when the set to 'all' all statements must pass for the section/question to be displayed. When no option is provided the checking will use the same logic as when the property is set to 'one'.

```ts
export interface IStatements {
  statements: IStatement[]; // list of statements (see above)
  check?: 'one' | 'all'; // check property, when not set the statement processor will use 'one'.
}
```

## Registering Custom Logic and Components (at Runtime)

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
