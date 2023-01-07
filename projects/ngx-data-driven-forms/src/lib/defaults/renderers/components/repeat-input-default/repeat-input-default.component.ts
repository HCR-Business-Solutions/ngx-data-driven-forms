import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FormGenerationService,
  RenderRepeatInputBaseComponent,
} from '../../../../core';

@Component({
  selector: 'ddforms-repeat-input-default',
  template: `
    <div
      class="repeat-input-form-container {{ this.section.id }}-input {{
        this.classes
      }}"
    >
      <ddforms-section-default
        [section]="this.section"
        [control]="this.inputForm"
        [surpressText]="true"
      ></ddforms-section-default>
    </div>
  `,
  styles: [],
})
export class RepeatInputDefaultComponent extends RenderRepeatInputBaseComponent {
  constructor(public fg: FormGenerationService) {
    super();
  }

  get classes(): string {
    if (!this.section.customProps) return '';
    if (!this.section.customProps['repeatInputClasses']) return '';
    return this.section.customProps['repeatInputClasses'];
  }
}
