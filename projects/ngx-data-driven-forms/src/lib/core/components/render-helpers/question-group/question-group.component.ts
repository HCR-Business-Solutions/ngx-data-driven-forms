import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { RenderQuestionDirective } from '../../../directives';
import { Question, Section } from '../../../forms';
import { QuestionRendererRegistryService } from '../../../services';
import { ValueOrArray } from '../../../types';
import { RenderQuestionBaseComponent } from '../../renderer-bases';

@Component({
  selector: 'ddforms-question-group',
  template: `
    <div
      class="question-group {{ this.baseClassName }} {{
        this.identifierClassName
      }}"
    >
      <ng-container #ref></ng-container>
    </div>
  `,
  styles: [],
})
export class QuestionGroupComponent implements OnInit, OnDestroy {
  @Input() section!: Section;
  @Input() control!: AbstractControl;

  @Input() layout!: ValueOrArray<string>[];
  @Input() subLevel: number = 0;

  @ViewChild('ref', { read: ViewContainerRef, static: true })
  vcRef?: ViewContainerRef;

  constructor(
    private _questionRegistry: QuestionRendererRegistryService,
    private _cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.renderElements();
  }

  public ngOnDestroy(): void {
    this.clearElements();
  }

  get baseClassName(): string {
    return `sub-${this.subLevel}`;
  }

  get identifierClassName(): string {
    const flatten = (items: ValueOrArray<string>[]): string[] => {
      const flat: string[] = [];
      items.forEach((item: ValueOrArray<string>) => {
        if (Array.isArray(item)) {
          flat.push(...flatten(item));
        } else {
          flat.push(item);
        }
      });
      return flat;
    };
    return `${flatten(this.layout).join('-')}-group`;
  }

  private clearElements(): void {
    this.vcRef?.clear();
  }

  private renderElements(): void {
    this.renderQuestions();
  }

  private renderQuestions(): void {
    if (!this.vcRef) {
      return;
    }

    if (!this.section.questions || !this.layout || this.layout.length <= 0) {
      return;
    }

    const renderQuestion = (question?: Question): void => {
      if (!question) return;

      const control = this.control.get(question.id);
      if (!control) return;

      const rendererConfig =
        question.rendererConfig?.renderers['question'] ?? undefined;

      if (rendererConfig?.target === 'none') {
        return;
      }

      const target = this._questionRegistry
        .getRegistry()
        .get(rendererConfig?.target ?? 'default');
      if (!target) return;
      const componentRef =
        this.vcRef?.createComponent<RenderQuestionBaseComponent>(target);
      if (componentRef) {
        componentRef.instance.control = control;
        componentRef.instance.isReadonly = false;
        componentRef.instance.question = question;
      }
    };

    const renderGroup = (subLayout: ValueOrArray<string>[]) => {
      const componentRef = this.vcRef?.createComponent(QuestionGroupComponent);
      if (componentRef) {
        componentRef.instance.layout = subLayout;
        componentRef.instance.control = this.control;
        componentRef.instance.section = this.section;
        componentRef.instance.subLevel = this.subLevel + 1;
      }
    };

    this.layout.forEach((item: ValueOrArray<string>) => {
      if (Array.isArray(item)) {
        renderGroup(item);
      } else {
        renderQuestion(this.section.questions[item]);
      }
    });
  }
}
