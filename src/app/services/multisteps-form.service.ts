import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomFormControl } from '../models/custom-form-control';

@Injectable({ providedIn: 'root' })
export class MultistepsFormService {

  constructor(private fb: FormBuilder) { }

  generateForm(controls: CustomFormControl[][]): FormGroup {
    const STEPS: FormGroup[] = [];

    controls.forEach(step => {
      const GROUP: any = {};
      step.forEach(control => GROUP[control.key] = control);
      STEPS.push(this.fb.group(GROUP));
    });
    return this.fb.group({ steps: this.fb.array(STEPS) });
  }

}
