import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CoreModule } from '../core.module';
import { ErrorMessageFn } from '../types/error-message.function';

type REGISTRY_KEY = string;
type REGISTRY_VALUE = ErrorMessageFn;
type REGISTRY = Map<REGISTRY_KEY, REGISTRY_VALUE>
const DEFAULT_REGISTRY: REGISTRY = new Map<REGISTRY_KEY, REGISTRY_VALUE>();

@Injectable({
  providedIn: CoreModule
})
export class ErrorMessageRegistryService {

  private _registry: BehaviorSubject<REGISTRY> = new BehaviorSubject<REGISTRY>(DEFAULT_REGISTRY);

  constructor() { }

  public getRegistry(): REGISTRY {
    return this._registry.getValue();
  }

  public register(key: REGISTRY_KEY, value: REGISTRY_VALUE): void {
    const map = this.getRegistry();
    this._registry.next(new Map([...map.entries(), [key, value]]));
  }

  public registerMultiple(registries: [[REGISTRY_KEY, REGISTRY_VALUE]]): void {
    const map = this.getRegistry();
    this._registry.next(new Map([...map.entries(), ...registries]));
  }

}
