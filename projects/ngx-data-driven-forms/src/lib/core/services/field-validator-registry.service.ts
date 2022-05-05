import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CoreModule } from '../core.module';
import { FieldValidatorFn } from '../types/field-validator';

export type REGISTRY_KEY = string;
export type REGISTRY_VALUE = FieldValidatorFn;
export type REGISTRY = Map<REGISTRY_KEY, REGISTRY_VALUE>
export const DEFAULT_REGISTRY: REGISTRY = new Map<REGISTRY_KEY, REGISTRY_VALUE>();

@Injectable({
  providedIn: CoreModule
})
export class FieldValidatorRegistryService {

  private _registry: BehaviorSubject<REGISTRY> = new BehaviorSubject<REGISTRY>(DEFAULT_REGISTRY);

  constructor() { }

  public getRegistry(): REGISTRY {
    return this._registry.getValue();
  }

  public register(key: REGISTRY_KEY, fieldValidator: REGISTRY_VALUE): void {
    const map = this.getRegistry();
    this._registry.next(new Map([...map.entries(), [key, fieldValidator]]));
  }

  public registerMultiple(registries: [[REGISTRY_KEY, REGISTRY_VALUE]]): void {
    const map = this.getRegistry();
    this._registry.next(new Map([...map.entries(), ...registries]));
  }

}
