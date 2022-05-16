import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RenderSectionBaseComponent } from '../../../../components';

type REGISTRY_KEY = string;
type REGISTRY_VALUE = Type<RenderSectionBaseComponent>;
type REGISTRY = Map<REGISTRY_KEY, REGISTRY_VALUE>;
const DEFAULT_REGISTRY: REGISTRY = new Map<REGISTRY_KEY, REGISTRY_VALUE>();

@Injectable()
export class SectionRendererRegistryService {
  private _registry: BehaviorSubject<REGISTRY> = new BehaviorSubject<REGISTRY>(
    DEFAULT_REGISTRY
  );

  constructor() {}

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
