import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { CustomFormControl } from '../../models/custom-form-control';
import { MultistepsFormService } from '../../services/multisteps-form.service';

@Component({
  selector: 'multisteps-form',
  templateUrl: './multisteps-form.component.html',
  styleUrls: ['./multisteps-form.component.scss'],
  providers: [MultistepsFormService]
})
export class MultistepsFormComponent implements OnInit, OnDestroy {
  @Input() bannerIcon!: string;
  @Input() controls: CustomFormControl[][] = [];
  @Output('onSubmit') formSubmitted = new EventEmitter<{}>();
  multistepsForm!: FormGroup;
  stepIndex: number = 0;
  completed: boolean = false;

  constructor(private formService: MultistepsFormService) { }

  ngOnInit(): void {
    this.multistepsForm = this.formService.generateForm(this.controls);
  }

  ngOnDestroy(): void {
    this.multistepsForm.reset();
  }

  get steps(): FormArray {
    return <FormArray>this.multistepsForm.get('steps');
  }

  get activeStep(): FormGroup {
    return <FormGroup>this.steps.at(this.stepIndex);
  }

  get activeStepControls(): CustomFormControl[] {
    return <CustomFormControl[]>Object.values(this.activeStep.controls);
  }

  onNext(index?: number): void {
    if (index == null) {
      if (this.activeStep.invalid) return;      
      if (this.stepIndex === this.steps.length - 1) return this.onSubmit();
      this.stepIndex = ++this.stepIndex % this.steps.length;
    } else {
      if (this.steps.at(index).invalid) return;
      this.stepIndex = index;
    }
  }
 
  onSubmit<T>(): void {
    if (this.multistepsForm.invalid) return;

    const data = this.steps.value as T[];
    const flattenedData = data.reduce((acc, val) => ({ ...acc, ...val }), {});

    this.multistepsForm.reset();
    this.formSubmitted.emit(flattenedData);
    this.completed = true;
  }

}
