import { Injectable } from '@angular/core';
import { CoreModule } from '../../core.module';
import { FieldSchemaValidatorRegistryService, FieldValidatorRegistryService, CrossFieldValidatorRegistryService, ConditionsRegistryService } from '../registry';

@Injectable({
  providedIn: CoreModule 
})
export class SchemaValidatorService {

  constructor(
    private _fieldSchemaValidatorSvc: FieldSchemaValidatorRegistryService,
    private _fieldValidatorSvc: FieldValidatorRegistryService,
    private _crossFieldValidatorSvc: CrossFieldValidatorRegistryService,
    private _conditionsSvc: ConditionsRegistryService,
  ) { }

  public validateApplicationSchema(application: unknown):  {[key: string]: any} | null {

    // Ensure all required fields are present and of correct type
    // Ensure if renderer is provided that renderer exists
    // Check each page

    return null;

  }


  public validatePageSchema(page: unknown):  {[key: string]: any} | null {

    // Ensure all required fields are present and of correct type
    // Ensure if renderer is provided that renderer exists
    // Check each section

    return null;

  }

  public validateSectionSchema(section: unknown):  {[key: string]: any} | null {

    // Ensure all required fields are present and of correct type
    // Ensure if renderer is provided that renderer exists
    // Ensure conditions exist
    // Check each question

    return null;

  }
  
  public validateQuestionSchema(question: unknown):  {[key: string]: any} | null {

    // Ensure all required fields are present and of correct type
    // Ensure if renderer is provided that renderer exists
    // Ensure that field type exists
    // Ensure that validators exist
    // Ensure that conditions exist
    // Ensure that field schema is accurate if found

    return null;

  }
}
