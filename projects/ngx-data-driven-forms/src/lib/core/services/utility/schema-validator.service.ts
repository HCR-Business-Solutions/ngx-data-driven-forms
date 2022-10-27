import { Injectable } from '@angular/core';
import { IApplication, IPage, IQuestion, ISection } from '../../forms';
import { MasterReigistryService } from '../registry';

type KeyValue = { [key: string]: any };
type SchemaValidationResult =
  | { errors?: KeyValue; warnings?: KeyValue }
  | undefined;

@Injectable({
  providedIn: 'root',
})
export class SchemaValidatorService {
  constructor(private _master: MasterReigistryService) {}

  public validateApplicationSchema(
    application: unknown
  ): SchemaValidationResult {
    const errors: KeyValue = {};
    const warnings: KeyValue = {};

    if (!application) {
      errors['no-application'] = 'Section does not exist';
      return { errors };
    }

    if (typeof application !== 'object') {
      errors['page-not-object'] = 'Section is not an object';
    }

    const a = application as IApplication;

    // #region Schema Errors
    if (!a.id) {
      errors['no-id'] = 'Application does not have an id property.';
    }

    if (a.pages === null || a.pages === undefined) {
      errors['no-pages'] =
        "Application cannot have no pages property, if you want to have no pages use an empty array '[]'.";
    }

    if (a.pages) {
      const pageIds = a.pages.map((page) => page.id);
      const duplicates = [
        ...new Set(
          pageIds.filter((item, index) => pageIds.indexOf(item) !== index)
        ),
      ];

      if (duplicates.length > 0) {
        errors['duplicate-page-ids'] = {
          msg: 'Two or more pages have the same ids.',
          duplicates,
        };
      }
      const pageErrors = a.pages.reduce((prev, curr) => {
        const pageErrors = this.validatePageSchema(curr);
        if (pageErrors && pageErrors.errors) {
          return { ...prev, [curr.id]: pageErrors.errors };
        }
        return { ...prev };
      }, {});
      if (Object.keys(pageErrors).length > 0) {
        errors['pages'] = pageErrors;
      }
    }
    // #endregion Schema Errors

    // #region Schema Warnings
    if (a.pages) {
      const pageWarnings = a.pages.reduce((prev, curr) => {
        const pageValidator = this.validatePageSchema(curr);
        if (pageValidator && pageValidator.warnings) {
          return { ...prev, [curr.id]: pageValidator.warnings };
        }
        return { ...prev };
      }, {});
      if (Object.keys(pageWarnings).length > 0) {
        errors['pages'] = pageWarnings;
      }
    }
    // #endregion Schema Warnings

    const result: SchemaValidationResult = {};

    if (Object.keys(errors).length > 0) {
      result.errors = errors;
    }

    if (Object.keys(warnings).length > 0) {
      result.warnings = warnings;
    }

    return result.warnings || result.errors ? result : undefined;
  }

  public validatePageSchema(page: unknown): SchemaValidationResult {
    const errors: KeyValue = {};
    const warnings: KeyValue = {};

    if (!page) {
      errors['no-page'] = 'Section does not exist';
      return { errors };
    }

    if (typeof page !== 'object') {
      errors['section-not-object'] = 'Section is not an object';
    }

    const p = page as IPage;

    // #region Schema Errors
    if (!p.id) {
      errors['no-id'] = 'Page does not have an id property.';
    }

    if (p.sections === null || p.sections === undefined) {
      errors['no-sections'] =
        "Page cannot have no sections property, if you want to have no sections use an empty array '[]'.";
    }

    if (p.sections) {
      const sectionIds = p.sections.map((section) => section.id);
      const duplicates = [
        ...new Set(
          sectionIds.filter((item, index) => sectionIds.indexOf(item) !== index)
        ),
      ];

      if (duplicates.length > 0) {
        errors['duplicate-section-ids'] = {
          msg: 'Two or more sections have the same ids.',
          duplicates,
        };
      }
      const sectionErrors = p.sections.reduce((prev, curr) => {
        const sectionErrors = this.validateSectionSchema(curr);
        if (sectionErrors && sectionErrors.errors) {
          return { ...prev, [curr.id]: sectionErrors.errors };
        }
        return { ...prev };
      }, {});
      if (Object.keys(sectionErrors).length > 0) {
        errors['sections'] = sectionErrors;
      }
    }
    // #endregion Schema Errors

    // #region Schema Warnings
    if (p.sections) {
      const sectionWarnings = p.sections.reduce((prev, curr) => {
        const sectionValidator = this.validateSectionSchema(curr);
        if (sectionValidator && sectionValidator.warnings) {
          return { ...prev, [curr.id]: sectionValidator.warnings };
        }
        return { ...prev };
      }, {});
      if (Object.keys(sectionWarnings).length > 0) {
        errors['sections'] = sectionWarnings;
      }
    }
    // #endregion Schema Warnings

    const result: SchemaValidationResult = {};

    if (Object.keys(errors).length > 0) {
      result.errors = errors;
    }

    if (Object.keys(warnings).length > 0) {
      result.warnings = warnings;
    }

    return result.warnings || result.errors ? result : undefined;
  }

  public validateSectionSchema(section: unknown): SchemaValidationResult {
    const errors: KeyValue = {};
    const warnings: KeyValue = {};

    if (!section) {
      errors['no-section'] = 'Section does not exist';
      return { errors };
    }

    if (typeof section !== 'object') {
      errors['section-not-object'] = 'Section is not an object';
    }

    const s = section as ISection;

    // #region Schema Errors
    if (!s.id) {
      errors['no-id'] = 'Section does not have an id property.';
    }

    if (s.questions === null || s.questions === undefined) {
      errors['no-questions'] =
        "Section cannot have no questions property, if you want to have no questions use an empty object '{}'.";
    }

    if (s.layout === null || s.layout === undefined) {
      errors['no-layout'] =
        "Section cannot have no layout property, if you want to have no layout use an empty array '[]'.";
    }

    if (s.repeat && !s.repeat.handler) {
      errors['no-repeat-handler'] =
        "A repeat handler must be defined, use 'default' if you do not have a custom handler.";
    }

    if (s.questions) {
      const sectionQuestionErrors = Object.entries(s.questions).reduce(
        (prev: { [key: string]: any }, [qID, question]) => {
          const qErrors = this.validateQuestionSchema(question, qID);
          if (qErrors !== undefined && qErrors.errors !== undefined) {
            return { ...prev, [qID]: qErrors.errors };
          }
          return prev;
        },
        {}
      );
      if (Object.keys(sectionQuestionErrors).length > 0) {
        errors['question-errors'] = sectionQuestionErrors;
      }
    }
    // #endregion Schema Errors

    // #region Schema Warnings

    if (s.questions && s.layout) {
      const notIncluded = Object.keys(s.questions).filter(
        (key) => !s.layout.includes(key)
      );
      if (notIncluded.length > 0) {
        warnings['layout-missing-questions'] = {
          msg: 'The layout is missing some questions. These questions will not be rendered on the page (this may be intended).',
          questions: notIncluded,
        };
      }
    }

    if (s.questions) {
      const sectionQuestionWarnings = Object.entries(s.questions).reduce(
        (prev: { [key: string]: any }, [qID, question]) => {
          const qErrors = this.validateQuestionSchema(question, qID);
          if (qErrors !== undefined && qErrors.warnings !== undefined) {
            return { ...prev, [qID]: qErrors.warnings };
          }
          return prev;
        },
        {}
      );
      if (Object.keys(sectionQuestionWarnings).length > 0) {
        warnings['question-warnings'] = sectionQuestionWarnings;
      }
    }
    // #endregion Schema Warnings

    const result: SchemaValidationResult = {};

    if (Object.keys(errors).length > 0) {
      result.errors = errors;
    }

    if (Object.keys(warnings).length > 0) {
      result.warnings = warnings;
    }

    return result.warnings || result.errors ? result : undefined;
  }

  public validateQuestionSchema(
    question: unknown,
    keyId?: string
  ): SchemaValidationResult {
    const errors: KeyValue = {};
    const warnings: KeyValue = {};

    // #region Type Errors
    if (!question) {
      errors['no-question'] = 'Question does not exist.';
      return { errors };
    }

    if (typeof question !== 'object') {
      errors['question-not-object'] = 'Question is not an object.';
      return { errors };
    }
    //#endregion Type Errors

    const q = question as IQuestion;

    // #region Schema Errors
    if (!q.id) {
      errors['no-id'] = 'Question does not have an id property.';
    }

    if (keyId && q.id && keyId !== q.id) {
      errors['id-mismatch'] = {
        msg: 'ID does not match at higher level.',
        expected: keyId,
        actual: q.id,
      };
    }

    if (!q.type) {
      errors['no-type'] = 'Question does not have a type property.';
    }
    // #endregion Schema Errors

    // #region Warnings

    if (!q.label && !q.ariaLabel) {
      warnings['no-label'] =
        'Question does not have a label or ariaLabel. This question will not meet accessibility standards.';
    }

    if (
      q.type &&
      !this._master._fieldRendererRegistry.getRegistry().has(q.type)
    ) {
      warnings['unknown-quetion'] = `${q.type} is not a known question type.`;
    }

    if (q.fieldValidation) {
      const presentValidators = Object.keys(q.fieldValidation);
      const unknownValidators = presentValidators.filter(
        (validator) =>
          !this._master._fieldValidatorRegistry.getRegistry().has(validator)
      );
      if (unknownValidators.length > 0) {
        warnings['unknown-field-validators'] = {
          msg: 'Unknown field validators.',
          validators: unknownValidators,
        };
      }
    }

    if (q.crossFieldValidation) {
      const presentValidators = q.crossFieldValidation
        .map((_) => _.validation)
        .reduce((prev: string[], curr) => [...prev, ...Object.keys(curr)], []);
      const unknownValidators = presentValidators.filter(
        (validator) =>
          !this._master._crossFieldValidatorRegistry
            .getRegistry()
            .has(validator)
      );
      if (unknownValidators.length > 0) {
        warnings['unknown-cross-field-validators'] = {
          msg: 'Unknown cross field validators.',
          validators: unknownValidators,
        };
      }
    }

    if (q.shouldAsk) {
      const presentConditions = q.shouldAsk.conditions
        .map((_) => _.conditions)
        .reduce((prev: string[], curr) => [...prev, ...Object.keys(curr)], []);
      const unknownConditions = presentConditions.filter(
        (condition) =>
          !this._master._conditionsRegistry.getRegistry().has(condition)
      );
      if (unknownConditions.length > 0) {
        warnings['unknown-conditions'] = {
          msg: 'Unknown conditions',
          conditions: unknownConditions,
        };
      }
    }

    // #endregion Warnings

    const result: SchemaValidationResult = {};

    if (Object.keys(errors).length > 0) {
      result.errors = errors;
    }

    if (Object.keys(warnings).length > 0) {
      result.warnings = warnings;
    }

    return result.warnings || result.errors ? result : undefined;
  }
}
