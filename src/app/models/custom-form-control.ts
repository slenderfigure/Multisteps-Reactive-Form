import {
  FormGroup,
  FormControl,
  ValidatorFn,
  AsyncValidatorFn
} from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export type FormSteps = { key: string, group: FormGroup }[];
export interface MultistepForm { steps: FormSteps, form: FormGroup };
export enum ControlType {
  TEXTFIELD = 'textfield',
  DROPDOWN = 'dropdown',
  TEXTAREA = 'textarea',
  FILE = 'file'
} 
export type TextfieldType = 'text' | 'email' | 'password' | 'number' | 'url' | null;
export type DropdownOptions = { key: string; value: any }[]
export type ValidatorErrorType = 'EMAIL' | 'EMAILTAKEN' | 'MINLENGTH' | 'MAXLENGTH' |
  'MIN' | 'MAX' | 'PATTERN' | 'PASSWORD' | 'PHONE' | 'REQUIRED' | 'USERNAMETAKEN';

export type CustomValidator = {
  validator: ValidatorFn | AsyncValidatorFn | null,
  type: ValidatorErrorType,
  message: string,
  async?: boolean,
  criteria?: string | number | RegExp
}

export class CustomFormControl extends FormControl {
  key!: string;
  order!: number;
  label!: string;
  controlType!: ControlType;
  textfieldType!: TextfieldType;
  dropdownOptions!: DropdownOptions;
  validators!: CustomValidator[];
  private _errorMessage!: string;

  constructor(params: {
    value?: any,
    order?: number,
    key?: string,
    label?: string,
    controlType?: ControlType,
    validators?: CustomValidator[],
    textfieldType?: TextfieldType,
    dropdownOptions?: DropdownOptions,
  }) {
    super(params.value);
    this.key = params.key || 'customFormControl';
    this.order = params.order || 0;
    this.label = params.label || 'Custom form control';
    this.validators = params.validators || [];
    this.controlType = params.controlType || ControlType.TEXTFIELD;
    this.textfieldType = params.textfieldType || 'text';
    this.dropdownOptions = params.dropdownOptions || [];
    this.initValidators();
  }

  get errorMessage(): string { return this._errorMessage; }

  private initValidators(): void {
    const SYNC_VALIDATORS = <ValidatorFn[]>this.validators
      .filter(cValidator => !cValidator.async)
      .map(cValidator => cValidator.validator);
    const ASYNC_VALIDATORS = <AsyncValidatorFn[]>this.validators
      .filter(cValidator => cValidator.async)
      .map(cValidator => cValidator.validator);

    // Set all validators
    this.setValidators(SYNC_VALIDATORS);
    this.setAsyncValidators(ASYNC_VALIDATORS);

    this.onError.subscribe((type: ValidatorErrorType) => {
      const validator = this.validators.find(cValidator => {
        return cValidator.type === type?.toUpperCase();
      });
      this._errorMessage = validator?.message || '';    
    });
  }

  private get onError(): Observable<any> {
    return this.valueChanges.pipe(map(() => {
      try { return Object.keys(<{}>this.errors)[0]; } 
      catch (e) { return null; }
    }));
  }
  
}