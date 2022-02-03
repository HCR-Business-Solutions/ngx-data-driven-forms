import {Inject, Injectable} from '@angular/core';
import {ConditionsFunction, DataHandlerFunction, ErrorMessageFunction, NormalizedCrossFieldValidator, NormalizedValidator} from '../types';
import {BehaviorSubject} from 'rxjs';
import {FieldItem} from '../_classes';

@Injectable({
  providedIn: 'root'
})
export class DataDrivenFormsConfigService {

  private readonly validators: BehaviorSubject<Map<string, NormalizedValidator> | null | undefined> = new BehaviorSubject<Map<string, NormalizedValidator> | null | undefined>(null);
  private readonly crossFieldValidators: BehaviorSubject<Map<string, NormalizedCrossFieldValidator> | null | undefined> = new BehaviorSubject<Map<string, NormalizedCrossFieldValidator> | null | undefined>(null);
  private readonly conditions: BehaviorSubject<Map<string, ConditionsFunction> | null | undefined> = new BehaviorSubject<Map<string, ConditionsFunction> | null | undefined>(null);
  private readonly components: BehaviorSubject<Map<string, FieldItem> | null | undefined> = new BehaviorSubject<Map<string, FieldItem> | null | undefined>(null);
  private readonly errorMessages: BehaviorSubject<Map<string, ErrorMessageFunction> | null | undefined> = new BehaviorSubject<Map<string, ErrorMessageFunction> | null | undefined>(null);
  private readonly dataHandlers: BehaviorSubject<Map<string, DataHandlerFunction<any>> | null | undefined> = new BehaviorSubject<Map<string, DataHandlerFunction<any>> | null | undefined>(null);
  private readonly ignoreDefaultStyles: BehaviorSubject<boolean | null | undefined> = new BehaviorSubject<boolean | null | undefined>(false);
  private readonly fieldConfigValidators: BehaviorSubject<Map<string, (r: unknown) => boolean> | null | undefined> = new BehaviorSubject<Map<string, (r: unknown) => boolean> | null | undefined>(null);

  constructor(
    @Inject('dataDrivenFormsConfig') private config: any,
    @Inject('defaultValues') private defaults: any,
  ) {

    if (!this.validators.getValue()?.size) {
      this.validators.next(defaults.defaultValidators);
    }

    if (!this.crossFieldValidators.getValue()?.size) {
      this.crossFieldValidators.next(defaults.defaultCrossFieldValidators);
    }

    if (!this.conditions.getValue()?.size) {
      this.conditions.next(defaults.defaultConditions);
    }

    if (!this.components.getValue()?.size) {
      this.components.next(defaults.defaultComponents);
    }

    if (!this.errorMessages.getValue()?.size) {
      this.errorMessages.next(defaults.defaultMessageHandlers);
    }

    if (!this.dataHandlers.getValue()?.size) {
      this.dataHandlers.next(defaults.defaultDataHandlers);
    }

    if(!this.fieldConfigValidators.getValue()?.size) {
      this.dataHandlers.next(defaults.defaultFieldConfigValidators);
    }

    if (config?.customValidators) {
      this.registerValidators(config.customValidators);
    }

    if (config?.customCrossFieldValidators) {
      this.registerCrossFieldValidators(config.customCrossFieldValidators);
    }

    if (config?.customConditions) {
      this.registerConditions(config.customConditions);
    }

    if (config?.customFieldComponents) {
      this.registerComponents(config.customFieldComponents);
    }

    if(config?.customErrorMessageHandlers) {
      this.registerErrorMessageHandlers(config.customErrorMessageHandlers);
    }

    if(config?.customDataHandlers) {
      this.registerDataHandlers(config.customDataHandlers);
    }

    if(config?.customFieldConfigValidators) {
      this.registerFieldConfigValidators(config.customFieldConfigValidators);
    }

    this.ignoreDefaultStyles.next(config?.ignoreDefaultStyles ?? false);

  }

  public getValidators(): Map<string, NormalizedValidator> {
    const validators = this.validators.getValue();
    return new Map<string, NormalizedValidator>([
      ...validators ? validators.entries() : [],
    ]);
  }

  public getCrossFieldValidators(): Map<string, NormalizedCrossFieldValidator> {
    const validators = this.crossFieldValidators.getValue();
    return new Map<string, NormalizedCrossFieldValidator>([
      ...validators ? validators.entries() : [],
    ]);
  }

  public getConditions(): Map<string, ConditionsFunction> {
    const conditions = this.conditions.getValue();
    return new Map<string, ConditionsFunction>([
      ...conditions ? conditions.entries() : [],
    ]);
  }

  public getComponents(): Map<string, FieldItem> {
    const components = this.components.getValue();
    return new Map<string, FieldItem>([
      ...components ? components.entries() : [],
    ]);
  }

  public getErrorMessageHandlers(): Map<string, ErrorMessageFunction> {
    const errorMessageHandlers = this.errorMessages.getValue();
    return errorMessageHandlers ? errorMessageHandlers : new Map<string,ErrorMessageFunction>();
  }

  public getDataHandlers(): Map<string, DataHandlerFunction<any>> {
    const dataHandlers = this.dataHandlers.getValue();
    return dataHandlers ? dataHandlers : new Map<string, DataHandlerFunction<any>>();
  }

  public getShouldIgnoreStyles(): boolean {
    return this.ignoreDefaultStyles.getValue() ?? false;
  }

  public getFieldConfigValidators(): Map<string, (r: unknown) => boolean> {
    const fieldConfigValidators = this.fieldConfigValidators.getValue();
    return fieldConfigValidators ?  fieldConfigValidators : new Map<string, (r: unknown) => boolean>();
  }

  public registerValidator(key: string, validator: NormalizedValidator): void {
    const validators = this.getValidators();
    this.validators.next(new Map<string, NormalizedValidator>([
      ...validators.entries(),
      [key, validator]
    ]));
  }

  public registerValidators(validators: [string, NormalizedValidator][]): void;
  public registerValidators(validators: Map<string, NormalizedValidator>): void;
  public registerValidators(validators: [string, NormalizedValidator][] | Map<string, NormalizedValidator>): void {
    let toRegister: Map<string, NormalizedValidator>;
    if (Array.isArray(validators)) {
      toRegister = new Map([...validators]);
    } else {
      toRegister = validators;
    }
    this.validators.next(new Map<string, NormalizedValidator>([
      ...this.getValidators(),
      ...toRegister.entries(),
    ]));
  }

  public registerCrossFieldValidator(key: string, validator: NormalizedCrossFieldValidator): void {
    const validators = this.getCrossFieldValidators();
    this.crossFieldValidators.next(new Map<string, NormalizedCrossFieldValidator>([
      ...validators.entries(),
      [key, validator]
    ]));
  }

  public registerCrossFieldValidators(validators: [string, NormalizedCrossFieldValidator][]): void;
  public registerCrossFieldValidators(validators: Map<string, NormalizedCrossFieldValidator>): void;
  public registerCrossFieldValidators(validators: [string, NormalizedCrossFieldValidator][] | Map<string, NormalizedCrossFieldValidator>): void {
    let toRegister: Map<string, NormalizedCrossFieldValidator>;
    if (Array.isArray(validators)) {
      toRegister = new Map([...validators]);
    } else {
      toRegister = validators;
    }
    this.crossFieldValidators.next(new Map<string, NormalizedCrossFieldValidator>([
      ...this.getCrossFieldValidators(),
      ...toRegister.entries(),
    ]));
  }

  public registerCondition(key: string, condition: ConditionsFunction): void {
    const conditions = this.getConditions();
    this.conditions.next(new Map<string, ConditionsFunction>([
      ...conditions.entries(),
      [key, condition]
    ]));
  }

  public registerConditions(conditions: [string, ConditionsFunction][]): void;
  public registerConditions(conditions: Map<string, ConditionsFunction>): void;
  public registerConditions(conditions: [string, ConditionsFunction][] | Map<string, ConditionsFunction>): void {
    let toRegister: Map<string, ConditionsFunction>;
    if (Array.isArray(conditions)) {
      toRegister = new Map([...conditions]);
    } else {
      toRegister = conditions;
    }
    this.conditions.next(new Map<string, ConditionsFunction>([
      ...this.getConditions(),
      ...toRegister.entries(),
    ]));
  }

  public registerComponent(key: string, component: FieldItem): void {
    const components = this.getComponents();
    this.components.next(new Map<string, FieldItem>([
      ...components.entries(),
      [key, component]
    ]));
  }

  public registerComponents(components: [string, FieldItem][]): void;
  public registerComponents(components: Map<string, FieldItem>): void;
  public registerComponents(components: [string, FieldItem][] | Map<string, FieldItem>): void {
    let toRegister: Map<string, FieldItem>;
    if (Array.isArray(components)) {
      toRegister = new Map([...components]);
    } else {
      toRegister = components;
    }
    this.components.next(new Map<string, FieldItem>([
      ...this.getComponents(),
      ...toRegister.entries(),
    ]));
  }

  public registerErrorMessageHandler(key: string, messageHandler: ErrorMessageFunction): void {
    const messageHandlers = this.getErrorMessageHandlers();
    this.errorMessages.next(new Map<string, ErrorMessageFunction>([
      ...messageHandlers.entries(),
      [key, messageHandler]
    ]));
  }

  public registerErrorMessageHandlers(messageHandlers: [string, ErrorMessageFunction][]): void;
  public registerErrorMessageHandlers(messageHandlers: Map<string, ErrorMessageFunction>): void;
  public registerErrorMessageHandlers(messageHandlers: [string, ErrorMessageFunction][] | Map<string, ErrorMessageFunction>): void {
    let toRegister: Map<string, ErrorMessageFunction>;
    if (Array.isArray(messageHandlers)) {
      toRegister = new Map([...messageHandlers]);
    } else {
      toRegister = messageHandlers;
    }
    this.errorMessages.next(new Map<string, ErrorMessageFunction>([
      ...this.getErrorMessageHandlers(),
      ...toRegister.entries(),
    ]));
  }

  public registerDataHandler(key: string, dataHandler: DataHandlerFunction<any>): void {
    const dataHandlers = this.getDataHandlers();
    this.dataHandlers.next(new Map<string, DataHandlerFunction<any>>([
      ...dataHandlers.entries(),
      [key, dataHandler]
    ]));
  }

  public registerDataHandlers(dataHandlers: [string, DataHandlerFunction<any>][]): void;
  public registerDataHandlers(dataHandlers: Map<string, DataHandlerFunction<any>>): void;
  public registerDataHandlers(dataHandlers: [string, DataHandlerFunction<any>][] | Map<string, ErrorMessageFunction>): void {
    let toRegister: Map<string, DataHandlerFunction<any>>;
    if (Array.isArray(dataHandlers)) {
      toRegister = new Map([...dataHandlers]);
    } else {
      toRegister = dataHandlers;
    }
    this.dataHandlers.next(new Map<string, DataHandlerFunction<any>>([
      ...this.getDataHandlers(),
      ...toRegister.entries(),
    ]));
  }

  public registerFieldConfigValidator(key: string, validator: (r: unknown) => boolean): void {
    const fieldConfigValidators = this.getFieldConfigValidators();
    this.fieldConfigValidators.next(new Map<string, (r: unknown) => boolean>([
      ...fieldConfigValidators.entries(),
      [key, validator]
    ]));
  }

  public registerFieldConfigValidators(validators: [string, (r: unknown) => boolean][]): void;
  public registerFieldConfigValidators(validators: Map<string, (r: unknown) => boolean>): void;
  public registerFieldConfigValidators(validators: [string, (r: unknown) => boolean][] | Map<string, (r: unknown) => boolean>): void {
    let toRegister: Map<string, (r: unknown) => boolean>;
    if (Array.isArray(validators)) {
      toRegister = new Map([...validators]);
    } else {
      toRegister = validators;
    }
    this.fieldConfigValidators.next(new Map<string, (r: unknown) => boolean>([
      ...this.getFieldConfigValidators(),
      ...toRegister.entries(),
    ]));
  }

}


