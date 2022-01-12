import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DynamicFieldDirective} from '../../../directives/dynamic-field.directive';
import {IQuestionFieldComponent} from '../../_interfaces';
import {AbstractControl} from '@angular/forms';
import {Question} from '../../../forms-config';
import {DataDrivenFormsConfigService} from '../../../services';

@Component({
  selector: 'ddforms-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, IQuestionFieldComponent {

  @Input() public config: Question | null = null;
  @Input() public control: AbstractControl | null = null;
  @ViewChild(DynamicFieldDirective, {static: true}) private host!: DynamicFieldDirective;

  constructor(
    private ddFormsConf: DataDrivenFormsConfigService,
    private _changeDetection: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.loadComponent();
  }

  private loadComponent(): void {
    if (!this.host || !this.config || !this.control) return;
    const viewContainerRef = this.host.viewContainerRef;
    if (!viewContainerRef) return;
    viewContainerRef.clear();

    const components = this.ddFormsConf.getComponents();
    const component = components.get(this.config.type);

    if (!component) return;

    const componentRef = viewContainerRef.createComponent<IQuestionFieldComponent>(component.component);
    componentRef.instance.config = this.config;
    componentRef.instance.control = this.control;
    this._changeDetection.detectChanges();

  }


}
