import { ChangeDetectorRef, Component } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import {
  MasterReigistryService,
  RenderErrorBaseComponent,
} from '../../../../core';

@Component({
  selector: 'ddforms-error-default',
  template: `<div
    class="errors-container form-errors"
    role="alert"
    *ngIf="this.shouldShowError()"
  >
    <div
      class="form-error has-danger"
      *ngFor="let message of this.resolveErrorMessages()"
    >
      {{ message }}
    </div>
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

  public shouldShowError(): boolean {
    //if control is form array check if it has errors
    if (this.control instanceof UntypedFormArray) {
      return this.control.errors ? true : false;
    }

    return (
      !!this.control.errors && (this.control.dirty || this.control.touched)
    );
  }

  public resolveErrorMessages(): string[] {
    const errorMessageRegistry =
      this.masterRegistry._errorMessageRegistry.getRegistry();
    return this.errors.map(({ error, value }) => {
      const registryResponse = errorMessageRegistry.get(error);
      if (!registryResponse) return error;
      return registryResponse(this.control.errors) ?? error;
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
