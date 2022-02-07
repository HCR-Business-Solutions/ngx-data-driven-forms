import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import { IQuestionBase } from '../../../shared/interfaces';
import { Question } from '../../../shared/form-config';
import { DataDrivenFormsConfigService, DataDrivenFormsService } from '../../../ddforms/services';
import { DynamicFieldDirective } from '../../../shared/directives';

@Component({
  selector: 'ddforms-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy, IQuestionBase{

  @Input() public config: Question | null = null;
  @Input() public control: AbstractControl | null = null;
  @ViewChild(DynamicFieldDirective, {static: true}) private host!: DynamicFieldDirective;

  private shouldAsk: boolean = false;
  private shouldAskSub?: Subscription;

  constructor(
    private ddForms: DataDrivenFormsService,
    private ddFormsConf: DataDrivenFormsConfigService,
    private _changeDetection: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    if (!this.config || !this.control) return;

    this.shouldAsk = this.ddForms.shouldAskQuestion(this.control, this.config);
    this.shouldAskSub = this.ddForms.gatherQuestionEvents(this.control as FormControl, this.config)?.subscribe(() => {
      this.shouldAsk = this.control && this.config ? this.ddForms.shouldAskQuestion(this.control, this.config) : true;
      this.loadComponent();
    });

    this.loadComponent();
  }

  public ngOnDestroy(): void {
    if (this.shouldAskSub) {
      if (!this.shouldAskSub.closed) this.shouldAskSub.unsubscribe();
    }

    if (this.host) {
      const viewContainerRef = this.host.viewContainerRef;
      if (viewContainerRef) {
        viewContainerRef.clear();
      }
    }
  }

  private loadComponent(): void {
    if (!this.host) return;
    const viewContainerRef = this.host.viewContainerRef;
    if (!viewContainerRef) return;
    viewContainerRef.clear();

    if(!this.config || !this.control || !this.shouldAsk) return;


    const components = this.ddFormsConf.getComponents();
    const component = components.get(this.config.type);

    if (!component) return;

    const componentRef = viewContainerRef.createComponent<IQuestionBase>(component);
    componentRef.instance.config = this.config;
    componentRef.instance.control = this.control;
    this._changeDetection.detectChanges();

  }


}
