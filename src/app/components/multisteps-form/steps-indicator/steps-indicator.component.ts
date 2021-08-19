import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-steps-indicator',
  templateUrl: './steps-indicator.component.html',
  styleUrls: ['./steps-indicator.component.scss']
})
export class StepsIndicatorComponent implements OnInit {
  @Input() steps!: FormArray;
  @Input() activeStep!: FormGroup;
  @Input() stepIndex!: number;
  @Output() stepChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onStepChanged(index?: number): void {
    this.stepChanged.emit(index);
  }

}
