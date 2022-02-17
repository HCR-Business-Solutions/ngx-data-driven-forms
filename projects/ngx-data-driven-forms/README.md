#NGX Data Driven Forms (ngx-data-driven-forms)
Data driven forms is an angular component library that allows for developers to quickly and safely create forms from a json configuration string.

##Installation & Setup
In a fresh angular project, run the following command
```bash
npm install ngx-data-driven-forms
```
After installation in your app.module.ts import the DDForms Module
```ts
import { DDForms } from 'ngx-data-driven-forms'
```
and add the module to your Apps imports using `forRoot()`.

###Example
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

###DDForms Configuration
A configuration object can be defined with the `forRoot` function within the input, the possible Configurations are as defined.
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
The static values allow developers to define custom logic, validators, components and more. Allowing for projects to adapt the library to its own needs while still using the JSON Configurations provided.

Skip defaults allows developers to remove the default logic, validators, components, ect. This is to allow developers to override base functionality.

While finally skip default styles will disable all default styling from the project. 

##Registering Logic and Components at Runtime
In addition to statically defining logic and components on import, you may also register them in your application lifecycle, this allows for greater flexibility but can cause race conditions and inconsistent functionality between application modules. 
It is recommended that you place this registration in the **root component** of your application (e.g: application.component.ts)

###Example

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

Registering single items is as easy as providing a key and a value, you can also register multiple items at once using the plural versions of the register functions.
