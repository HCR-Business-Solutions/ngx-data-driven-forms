import {Inject, Injectable, Type} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { IDefaultValues, IModuleConfig } from '../interfaces';
import { ConditionsFunction, DataHandlerFunction, ErrorMessageFunction, FieldConfigValidator, NormalizedCrossFieldValidator, NormalizedValidator } from '../../shared/types';

@Injectable({
  providedIn: 'root'
})
export class DataDrivenFormsConfigService {

  private readonly validators: BehaviorSubject<Map<string, NormalizedValidator> | null | undefined> = new BehaviorSubject<Map<string, NormalizedValidator> | null | undefined>(null);
  private readonly crossFieldValidators: BehaviorSubject<Map<string, NormalizedCrossFieldValidator> | null | undefined> = new BehaviorSubject<Map<string, NormalizedCrossFieldValidator> | null | undefined>(null);
  private readonly conditions: BehaviorSubject<Map<string, ConditionsFunction> | null | undefined> = new BehaviorSubject<Map<string, ConditionsFunction> | null | undefined>(null);
  private readonly components: BehaviorSubject<Map<string, Type<any>> | null | undefined> = new BehaviorSubject<Map<string, Type<any>> | null | undefined>(null);

  private readonly errorMessages: BehaviorSubject<Map<string, ErrorMessageFunction> | null | undefined> = new BehaviorSubject<Map<string, ErrorMessageFunction> | null | undefined>(null);
  private readonly dataHandlers: BehaviorSubject<Map<string, DataHandlerFunction<any>> | null | undefined> = new BehaviorSubject<Map<string, DataHandlerFunction<any>> | null | undefined>(null);
  private readonly fieldConfigValidators: BehaviorSubject<Map<string, FieldConfigValidator> | null | undefined> = new BehaviorSubject<Map<string, FieldConfigValidator> | null | undefined>(null);

  private readonly ignoreDefaultStyles: BehaviorSubject<boolean | null | undefined> = new BehaviorSubject<boolean | null | undefined>(false);
  
  constructor(
    @Inject('moduleConfig') private config: IModuleConfig,
    @Inject('defaults') private defaults: IDefaultValues,
  ) {

    if (!this.validators.getValue()?.size) {
      this.validators.next(defaults.validators);
    }

    if (!this.crossFieldValidators.getValue()?.size) {
      this.crossFieldValidators.next(defaults.crossFieldValidators);
    }

    if (!this.conditions.getValue()?.size) {
      this.conditions.next(defaults.conditions);
    }

    if (!this.components.getValue()?.size) {
      this.components.next(defaults.components);
    }

    if (!this.errorMessages.getValue()?.size) {
      this.errorMessages.next(defaults.messageHandlers);
    }

    if (!this.dataHandlers.getValue()?.size) {
      this.dataHandlers.next(defaults.dataHandlers);
    }

    if(!this.fieldConfigValidators.getValue()?.size) {
      this.fieldConfigValidators.next(defaults.fieldConfigValidators);
    }

    if (config?.staticValues?.validators) {
      this.registerValidators(config.staticValues.validators);
    }

    if (config?.staticValues?.crossFieldValidators) {
      this.registerCrossFieldValidators(config.staticValues.crossFieldValidators);
    }

    if (config?.staticValues?.conditions) {
      this.registerConditions(config.staticValues.conditions);
    }

    if (config?.staticValues?.components) {
      this.registerComponents(config.staticValues.components);
    }

    if(config?.staticValues?.messageHandlers) {
      this.registerErrorMessageHandlers(config.staticValues.messageHandlers);
    }

    if(config?.staticValues?.dataHandlers) {
      this.registerDataHandlers(config.staticValues.dataHandlers);
    }

    if(config?.staticValues?.fieldConfigValidators) {
      this.registerFieldConfigValidators(config.staticValues.fieldConfigValidators);
    }

    this.ignoreDefaultStyles.next(config?.skipDefaultStyles ?? false);

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

  public getComponents(): Map<string, Type<any>> {
    const components = this.components.getValue();
    return new Map<string, Type<any>>([
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

  public getFieldConfigValidators(): Map<string, FieldConfigValidator> {
    const fieldConfigValidators = this.fieldConfigValidators.getValue();
    return fieldConfigValidators ?  fieldConfigValidators : new Map<string, FieldConfigValidator>();
  }

  public getShouldIgnoreStyles(): boolean {
    return this.ignoreDefaultStyles.getValue() ?? false;
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

  public registerComponent(key: string, component: Type<any>): void {
    const components = this.getComponents();
    this.components.next(new Map<string, Type<any>>([
      ...components.entries(),
      [key, component]
    ]));
  }

  public registerComponents(components: [string, Type<any>][]): void;
  public registerComponents(components: Map<string, Type<any>>): void;
  public registerComponents(components: [string, Type<any>][] | Map<string, Type<any>>): void {
    let toRegister: Map<string, Type<any>>;
    if (Array.isArray(components)) {
      toRegister = new Map([...components]);
    } else {
      toRegister = components;
    }
    this.components.next(new Map<string, Type<any>>([
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

  public registerFieldConfigValidator(key: string, validator: FieldConfigValidator): void {
    const fieldConfigValidators = this.getFieldConfigValidators();
    this.fieldConfigValidators.next(new Map<string, FieldConfigValidator>([
      ...fieldConfigValidators.entries(),
      [key, validator]
    ]));
  }

  public registerFieldConfigValidators(validators: [string, FieldConfigValidator][]): void;
  public registerFieldConfigValidators(validators: Map<string, FieldConfigValidator>): void;
  public registerFieldConfigValidators(validators: [string, FieldConfigValidator][] | Map<string, FieldConfigValidator>): void {
    let toRegister: Map<string, FieldConfigValidator>;
    if (Array.isArray(validators)) {
      toRegister = new Map([...validators]);
    } else {
      toRegister = validators;
    }
    this.fieldConfigValidators.next(new Map<string, FieldConfigValidator>([
      ...this.getFieldConfigValidators(),
      ...toRegister.entries(),
    ]));
  }

}


