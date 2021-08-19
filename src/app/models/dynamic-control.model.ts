import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";

abstract class FormField {
  key!: string;
  label!: string;
  value: any = null;
  required: boolean = false;
  validators!: {
    validators: ValidatorFn[],
    asyncValidators?: AsyncValidatorFn[] | any
  } | null;
  controlType!: 'textfield' | 'dropdown' | 'textarea';
  type!: 'text' | 'email' | 'password' | 'number' | 'url';
  options!: { key: string; value: any }[];

  constructor(config: {
    key: string,
    label: string,
    value?: any,
    required?: boolean,
    validators?: {
      validators: ValidatorFn[],
      asyncValidators?: AsyncValidatorFn[] | any
    }
  }) {
    this.key = config.key;
    this.label = config.label || config.key;
    this.value = config.value || this.value;
    this.required = config.required || this.required;
    this.validators = config.validators || null;
  }
}

class Textfield extends FormField {
  type!: 'text' | 'email' | 'password' | 'number' | 'url';

  constructor(params: {
    key: string,
    label: string,
    value?: any,
    type?: 'text' | 'email' | 'password' | 'number' | 'url',
    validators?: {
      validators: ValidatorFn[],
      asyncValidators?: AsyncValidatorFn[] | any
    }
  }) {
    super(params);
    super.controlType = 'textfield';
    this.type = params.type || 'text';
  }
}

class Dropdown extends FormField {

  constructor(params: {
    key: string,
    label: string,
    options: { key: string; value: any }[],
    validators?: {
      validators: ValidatorFn[],
      asyncValidators?: AsyncValidatorFn[] | any
    }
  }) {
    super(params);
    super.controlType = 'dropdown';
    this.options = params.options || [];
  }
}

class Textarea extends FormField {

  constructor(params: {
    key: string,
    label: string,
    value?: any,
    validators?: {
      validators: ValidatorFn[],
      asyncValidators?: AsyncValidatorFn[] | any
    }
  }) {
    super(params);
    super.controlType = 'textarea';
  }
}

type FormFieldGroup = Array<FormField[]>; 

export {
  FormField,
  FormFieldGroup,
  Textfield,
  Dropdown,
  Textarea
}