import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomFormControl } from 'src/app/models/custom-form-control';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() arrayName!: string;
  @Input() groupName!: string | number | null;
  @Input() control!: CustomFormControl;
  
  constructor() { }

  ngOnInit(): void {
  }

}
