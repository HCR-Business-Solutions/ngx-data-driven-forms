import { Injectable } from '@angular/core';
import { IQuestion } from '../../forms';
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

    // if errors and warnings are empty, return undefined
    if (
      Object.keys(errors).length === 0 &&
      Object.keys(warnings).length === 0
    ) {
      return undefined;
    }

    // return errors and warnings if they are not empty
    return {
      errors: Object.keys(errors).length === 0 ? undefined : errors,
      warnings: Object.keys(warnings).length === 0 ? undefined : warnings,
    };
  }

  public validatePageSchema(
    page: unknown,
    keyId?: string
  ): SchemaValidationResult {
    const errors: KeyValue = {};
    const warnings: KeyValue = {};

    // if errors and warnings are empty, return undefined
    if (
      Object.keys(errors).length === 0 &&
      Object.keys(warnings).length === 0
    ) {
      return undefined;
    }

    // return errors and warnings if they are not empty
    return {
      errors: Object.keys(errors).length === 0 ? undefined : errors,
      warnings: Object.keys(warnings).length === 0 ? undefined : warnings,
    };
  }

  public validateSectionSchema(
    section: unknown,
    keyId?: string
  ): SchemaValidationResult {
    const errors: KeyValue = {};
    const warnings: KeyValue = {};

    // if errors and warnings are empty, return undefined
    if (
      Object.keys(errors).length === 0 &&
      Object.keys(warnings).length === 0
    ) {
      return undefined;
    }

    // return errors and warnings if they are not empty
    return {
      errors: Object.keys(errors).length === 0 ? undefined : errors,
      warnings: Object.keys(warnings).length === 0 ? undefined : warnings,
    };
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
