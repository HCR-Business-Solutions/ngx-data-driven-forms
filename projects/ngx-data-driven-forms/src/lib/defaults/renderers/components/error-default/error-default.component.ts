import { ChangeDetectorRef, Component } from '@angular/core';
import {
  MasterReigistryService,
  RenderErrorBaseComponent,
} from 'ngx-data-driven-forms/src/lib/core';

@Component({
  selector: 'ddforms-error-default',
  template: `<div
    class="errors-container form-errors"
    role="alert"
    *ngIf="this.control.errors && (this.control.dirty || this.control.touched)"
  >
    <div
      class="form-error has-danger"
      *ngFor="let message of this.resolveErrorMessages()"
    ></div>
  </div>`,
  styles: [],
})
export class ErrorDefaultComponent extends RenderErrorBaseComponent {
  constructor(
    protected masterRegistry: MasterReigistryService,
    protected cdr: ChangeDetectorRef
  ) {
    super();
  }

  public resolveErrorMessages(): string[] {
    const errorMessageRegistry =
      this.masterRegistry._errorMessageRegistry.getRegistry();
    return this.errors.map(({ error, value }) => {
      const registryResponse = errorMessageRegistry.get(error);
      if (!registryResponse) return error;
      return registryResponse({ [`${error}`]: value }) ?? error;
    });
  }

  get errors(): { error: string; value: any }[] {
    if (!this.control.errors) return [];
    return Object.entries(this.control.errors).map(([error, value]) => ({
      error,
      value,
    }));
  }
}
