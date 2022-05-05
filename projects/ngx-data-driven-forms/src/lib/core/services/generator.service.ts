import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CoreModule } from '../core.module';
import { SchemaValidatorService } from './schema-validator.service';

@Injectable({
  providedIn: CoreModule 
})
export class GeneratorService {

  constructor(
    private _schemaValidator: SchemaValidatorService,
    private _fb: FormBuilder,
  ) { }



}
