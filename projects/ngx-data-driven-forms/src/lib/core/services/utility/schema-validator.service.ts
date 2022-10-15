import { Injectable } from '@angular/core';
import { IQuestion } from 'ngx-data-driven-forms';
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

    // check if question exists and is an object
    if (!question || typeof question !== 'object') {
      errors['question'] = 'Question is not an object';
    }

    // take question as an IQuestion
    const q = question as IQuestion;

    // ensure that question has an id
    if (!q.id) {
      errors['id'] = 'Question id is missing';
    }

    // ensure that question has a type
    if (!q.type) {
      errors['type'] = 'Question type is missing';
    }

    // if keyId and q.id are not equal, throw an error
    if (keyId && q.id && keyId !== q.id) {
      errors['id-missmatch'] = 'Question id does not match key';
    }

    // check if type is in questionRendererRegistry.getRegistry()
    if (
      q.type &&
      !this._master._questionRendererRegistry.getRegistry().has(q.type)
    ) {
      warnings[
        'unknown-type'
      ] = `Question type ${q.type} is not registered, renderer will attempt to use default.`;
    }

    // check inputMode if it exists is a valid inputMode
    if (
      q.inputMode &&
      ![
        'none',
        'text',
        'decimal',
        'numeric',
        'tel',
        'search',
        'email',
        'url',
      ].includes(q.inputMode)
    ) {
      warnings['input-mode'] = `Question inputMode ${q.inputMode} is not valid`;
    }

    // check if label or ariaLabel exists
    if (!q.label && !q.ariaLabel) {
      warnings['label'] =
        'Question label or ariaLabel is missing, this question will not meet accessibility standards';
    }

    // gather all fieldValidation keys
    const fieldValidationKeys = q.fieldValidation
      ? Object.keys(q.fieldValidation)
      : [];

    // check if fieldValidation keys are in fieldValidationRegistry.getRegistry() return a warning of all those that are not
    const unknownFieldValidationKeys = fieldValidationKeys.filter(
      (key) => !this._master._fieldValidatorRegistry.getRegistry().has(key)
    );

    if (unknownFieldValidationKeys.length > 0) {
      warnings['unknown-field-validation'] = {
        msg: 'Question fieldValidation contains unknown validators',
        keys: unknownFieldValidationKeys,
      };
    }

    // gather all crossFieldValidation packs and gather all validation keys
    const crossFieldValidationPacks = q.crossFieldValidation
      ? q.crossFieldValidation
      : [];
    const crossFieldValidationKeys = crossFieldValidationPacks
      .map((pack) => Object.keys(pack.validation))
      .reduce((acc, val) => acc.concat(val), []);

    // check if crossFieldValidation keys are in crossFieldValidationRegistry.getRegistry() return a warning of all those that are not
    const unknownCrossFieldValidationKeys = crossFieldValidationKeys.filter(
      (key) => !this._master._crossFieldValidatorRegistry.getRegistry().has(key)
    );

    if (unknownCrossFieldValidationKeys.length > 0) {
      warnings['unknown-cross-field-validation'] = {
        msg: 'Question crossFieldValidation contains unknown validators',
        keys: unknownCrossFieldValidationKeys,
      };

    // gather all conditions from shouldAsk
    const conditionPacks = q.shouldAsk ? q.shouldAsk.conditions : [];

    // gather all condition keys
    const conditionKeys = conditionPacks
      .map((pack) => Object.keys(pack))
      .reduce((acc, val) => acc.concat(val), []);

    // check if condition keys are in conditionRegistry.getRegistry() return a warning of all those that are not
    const unknownConditionKeys = conditionKeys.filter(
      (key) => !this._master._conditionsRegistry.getRegistry().has(key)
    );

    if (unknownConditionKeys.length > 0) {
      warnings['unknown-condition'] = {
        msg: 'Question shouldAsk contains unknown conditions',
        keys: unknownConditionKeys,
      };
    }


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
}
