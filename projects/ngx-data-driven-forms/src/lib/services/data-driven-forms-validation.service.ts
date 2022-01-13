import {Injectable} from '@angular/core';
import {DataDrivenFormsConfigService} from './data-driven-forms-config.service';
import {IApplication, IPage, IQuestion, ISection, IStatement, IStatements} from '../forms-config';
import {ObjectUtils} from '../utils/object';

@Injectable({
  providedIn: 'root'
})
export class DataDrivenFormsValidationService {

  constructor(
    private ddFormsConf: DataDrivenFormsConfigService,
  ) {
  }

  public validateConfiguration(config: unknown, type: 'question' | 'section' | 'page' | 'application'): null | { [key: string]: any } {

    switch (type) {
      case 'application':
        return this.validateApplication(config);
      case 'page':
        return this.validatePage(config);
      case 'section':
        return this.validateSection(config);
      case 'question':
        return this.validateQuestion(config);
    }
    return null;
  }

  public validateApplication(config: unknown): null | { [key: string]: any } {

    const missingProperties: string[] = ObjectUtils.hasProperties<IApplication>(config, ['id', 'description', 'pages']);
    if (missingProperties.length > 0) return {missingProperties};

    const application = config as IApplication;
    const errors: Map<string, any> = new Map<string, any>();

    if (!application.id) {
      errors.set('noId', true);
    }

    if (!application.description) {
      errors.set('noDescription', true);
    }

    if (!application.pages || application.pages.length <= 0) {
      errors.set('noPages', true);
    } else {
      application.pages.forEach((page, index) => {
        const pageErrors = this.validatePage(page);
        if (pageErrors) {
          errors.set(`page${index}`, pageErrors);
        }
      });
    }

    return errors.size > 0 ? Object.fromEntries(errors.entries()) : null;
  }

  public validatePage(config: unknown): null | { [key: string]: any } {
    const missingProperties: string[] = ObjectUtils.hasProperties<IPage>(config, ['id', 'sections']);
    if (missingProperties.length > 0) return {missingProperties};

    const page = config as IPage;
    const errors: Map<string, any> = new Map<string, any>();

    if (!page.id) {
      errors.set('noId', true);
    }
    if (!page.sections || page.sections.length <= 0) {
      errors.set('noSections', true);
    } else {
      page.sections.forEach((section, index) => {
        const sectionErrors = this.validateSection(section);
        if (sectionErrors) {
          errors.set(`section${index}`, sectionErrors);
        }
      });
    }

    if (page.shouldAsk) {
      const statementsErrors = this.validateStatements(page.shouldAsk);
      if (statementsErrors) {
        errors.set('statements', statementsErrors);
      }
    }

    return errors.size > 0 ? Object.fromEntries(errors.entries()) : null;
  }

  public validateSection(config: unknown): null | { [key: string]: any } {
    const missingProperties: string[] = ObjectUtils.hasProperties<ISection>(config, ['id', 'questions', 'questionOrder']);
    if (missingProperties.length > 0) return {missingProperties};

    const section = config as ISection;
    const errors: Map<string, any> = new Map<string, any>();

    if (!section.id) {
      errors.set('noId', true);
    }

    if (!section.questions) {
      errors.set('noQuestions', true);
    }

    if (section.questionOrder && section.questionOrder.length > 0) {
      const missingConfig = section.questionOrder.filter(_ => !Object.keys(section.questions).includes(_));
      if (missingConfig.length > 0) {
        errors.set('missingConfig', missingConfig);
      }
    }

    Object.entries(section.questions).forEach(([key, value]: [string, IQuestion]) => {
      const questionErrors = this.validateQuestion(value);
      if (questionErrors) {
        errors.set(key, questionErrors);
      }
    });

    if (section.shouldAsk) {
      const statementsErrors = this.validateStatements(section.shouldAsk);
      if (statementsErrors) {
        errors.set('statements', statementsErrors);
      }
    }

    return errors.size > 0 ? Object.fromEntries(errors.entries()) : null;
  }

  public validateQuestion(config: unknown): null | { [key: string]: any } {
    const missingProperties: string[] = ObjectUtils.hasProperties<IQuestion>(config, ['id', 'type']);
    if (missingProperties.length > 0) return {missingProperties};

    const question = config as IQuestion;
    const errors: Map<string, any> = new Map<string, any>();

    if (!question.id) {
      errors.set('noId', true);
    }
    if (!question.type) {
      errors.set('noType', true);
    } else if (!Array.from(this.ddFormsConf.getComponents().keys()).includes(question.type)) {
      errors.set('unsupportedType', question.type);
    }

    if (question.validation || question.customValidation) {
      const validators = Object.keys({...question.validation ?? {}, ...question.customValidation ?? {}});
      const knownValidators = Array.from(this.ddFormsConf.getValidators().keys());

      const unknownValidators = validators.filter(_ => !knownValidators.includes(_));
      if (unknownValidators.length > 0) {
        errors.set('unknownValidators', unknownValidators);
      }
    }

    if (question.shouldAsk) {
      const statementsErrors = this.validateStatements(question.shouldAsk);
      if (statementsErrors) {
        errors.set('statements', statementsErrors);
      }
    }


    return errors.size > 0 ? Object.fromEntries(errors.entries()) : null;
  }

  public validateStatements(config: unknown): null | { [key: string]: any } {

    const missingProperties: string[] = ObjectUtils.hasProperties<IQuestion>(config, ['statements']);
    if (missingProperties.length > 0) return {missingProperties};

    const statements = config as IStatements;
    const errors: Map<string, any> = new Map<string, any>();

    if (!statements.statements) {
      errors.set('noStatements', true);
    } else {
      statements.statements.forEach((statement, index) => {
        const statementErrors = this.validateStatement(statement);
        if (statementErrors) {
          errors.set(`statement${index}`, statementErrors);
        }
      });
    }

    return errors.size > 0 ? Object.fromEntries(errors.entries()) : null;
  }

  public validateStatement(config: unknown): null | { [key: string]: any } {
    const missingProperties: string[] = ObjectUtils.hasProperties<IQuestion>(config, ['sibling', 'expectedParentLevel']);
    if (missingProperties.length > 0) return {missingProperties};

    const statement = config as IStatement;
    const errors: Map<string, any> = new Map<string, any>();

    if (!statement.sibling) {
      errors.set('noSibling', true);
    }

    if (statement.expectedParentLevel < 0) {
      errors.set('invalidParentLevel', statement.expectedParentLevel);
    }

    if (!statement.conditions && !statement.customConditions) {
      errors.set('noConditions', true);
    }

    if (statement.conditions || statement.customConditions) {
      const conditions = Object.keys({...statement.conditions ?? {}, ...statement.customConditions ?? {}});
      const knownConditions = Array.from(this.ddFormsConf.getConditions().keys());

      const unknownConditions = conditions.filter(_ => !knownConditions.includes(_));
      if (unknownConditions.length > 0) {
        errors.set('unknownConditions', unknownConditions);
      }
    }

    return errors.size > 0 ? Object.fromEntries(errors.entries()) : null;
  }

}