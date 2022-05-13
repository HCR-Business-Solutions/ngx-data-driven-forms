import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { RenderFieldDirective } from '../../directives/render-field/render-field.directive';
import { Question } from '../../forms/classes/question';
import { FieldRendererRegistryService } from '../../services';
import { RenderFieldBaseComponent } from '../render-field-base';
import { v4 as uuid } from 'uuid';

@Component({
  template: '',
  styles: [],
})
export class RenderQuestionBaseComponent implements OnInit, OnDestroy {
  @Input() question!: Question;
  @Input() control!: AbstractControl;
  @Input() public isReadonly: boolean = false;

  private shouldAsk: boolean = true;
  private idModifier: string = btoa(uuid());

  @ViewChild(RenderFieldDirective, { static: true })
  private fieldHost!: RenderFieldDirective;

  constructor(
    private _fieldRegistry: FieldRendererRegistryService,
    private _cdRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.renderElements();
  }

  public ngOnDestroy(): void {
    this.clearElements();
  }

  private renderElements(): void {
    if (
      !this.question ||
      !this.control ||
      !this.shouldAsk ||
      (this.question?.isFlag ?? false)
    )
      return;

    this.clearElements();

    if (this.question.label) {
      this.renderLabel();
    }

    this.renderField();

    if (this.question.hint) {
      this.renderHint();
    }

    if (this.control.errors) {
      this.renderError();
    }
  }

  private clearElements(): void {
    if (this.fieldHost && this.fieldHost.viewContainerRef) {
      this.fieldHost.viewContainerRef.clear();
    }
  }

  private renderLabel(): void {}

  private renderField(): void {
    if (!this.fieldHost) return;
    const fieldViewContainerRef = this.fieldHost.viewContainerRef;
    if (!fieldViewContainerRef) return;

    const target: Type<RenderFieldBaseComponent> | undefined =
      this._fieldRegistry.getRegistry().get(this.question.id ?? '');
    if (!target) return;

    const componentRef =
      fieldViewContainerRef.createComponent<RenderFieldBaseComponent>(target);
    componentRef.instance.fieldId = `${this.question.id}-${this.idModifier}`;
    componentRef.instance.question = this.question;
    componentRef.instance.control = this.control;
    componentRef.instance.isReadonly = this.isReadonly;
    this._cdRef.detectChanges();
  }

  private renderHint(): void {}

  private renderError(): void {}
}
