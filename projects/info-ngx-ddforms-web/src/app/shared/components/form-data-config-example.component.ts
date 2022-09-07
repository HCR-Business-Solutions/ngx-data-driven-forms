import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Application } from 'ngx-data-driven-forms/src/public-api';

@Component({
  selector: 'app-form-data-config-example',
  template: `
    <ng-container *ngIf="this.appConfig">
      <div
        class="self-center flex flex-row items-center justify-center gap-4 my-4"
      >
        <button
          (click)="this.setSection('form')"
          class="py-2 px-4 rounded-md text-white"
          [disabled]="this.section === 'form'"
          [ngClass]="{
            'bg-amber-400 cursor-not-allowed': this.section === 'form',
            'bg-amber-600 hover:bg-amber-700': this.section !== 'form'
          }"
        >
          Form
        </button>
        <button
          (click)="this.setSection('config')"
          class="py-2 px-4 rounded-md text-white"
          [disabled]="this.section === 'config'"
          [ngClass]="{
            'bg-amber-400 cursor-not-allowed': this.section === 'config',
            'bg-amber-600 hover:bg-amber-700': this.section !== 'config'
          }"
        >
          Config
        </button>
        <button
          (click)="this.setSection('data')"
          class="py-2 px-4 rounded-md text-white"
          [disabled]="this.section === 'data'"
          [ngClass]="{
            'bg-amber-400 cursor-not-allowed': this.section === 'data',
            'bg-amber-600 hover:bg-amber-700': this.section !== 'data'
          }"
        >
          Data
        </button>
      </div>
      <div
        class="border-2 border-gray-400 border-opacity-60 rounded-md px-8 py-2 flex flex-col w-full"
      >
        <div [ngSwitch]="this.section">
          <ng-container *ngSwitchCase="'form'">
            <app-safe-form-wrapper
              [form]="this.appConfig"
              (formValue)="this.formValue = $event"
            ></app-safe-form-wrapper>
          </ng-container>
          <ng-container *ngSwitchCase="'config'">
            <code>
              <pre>{{ this.appConfig | json }}</pre>
            </code>
          </ng-container>
          <ng-container *ngSwitchDefault>
            <code>
              <pre>{{ this.formValue | json }}</pre>
            </code>
          </ng-container>
        </div>
      </div>
    </ng-container>
  `,
  styles: [],
})
export class FormDataConfigExampleComponent {
  @Input() appConfig!: Application;
  formValue: any | null = null;

  section: 'form' | 'config' | 'data' = 'form';

  constructor() {}

  public setSection(target: 'form' | 'config' | 'data') {
    if (target === this.section) return;
    this.section = target;
  }
}
