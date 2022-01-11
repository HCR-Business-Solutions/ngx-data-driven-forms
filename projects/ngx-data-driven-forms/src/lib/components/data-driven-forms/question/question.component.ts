import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Question} from '../../../forms-config';
import {DataDrivenFormsConfigService} from '../../../services';
import {IQuestionFieldComponent} from '../../_interfaces';

@Component({
  selector: 'ddforms-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, AfterViewInit {

  @Input() control!: FormControl | null;
  @Input() config!: Question;

  @ViewChild('fieldHost', {read: ViewContainerRef}) fieldHost!: ViewContainerRef;

  constructor(
    private ddFormsConf: DataDrivenFormsConfigService,
    private _changeDetector: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    if (!this.control) {
      throw new TypeError(`${this.constructor.name} must be passed a control of either AbstractControl or FormControl.`);
    }

    if (!this.config) {
      throw new TypeError(`${this.constructor.name} must be passed a config of Question.`);
    }

  }

  public ngAfterViewInit() {

    this.fieldHost.clear();

    const components = this.ddFormsConf.getComponents();
    const field = components.get(this.config.type);


    if (!field) {
      throw new Error(`Could not find component with key of ${this.config.type}`);
    }

    const componentRef = this.fieldHost.createComponent<IQuestionFieldComponent>(field.component);
    componentRef.instance.control = this.control;
    componentRef.instance.config = this.config;
    this._changeDetector.detectChanges();
  }


}
