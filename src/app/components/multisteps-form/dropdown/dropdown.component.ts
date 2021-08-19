import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomFormControl } from 'src/app/models/custom-form-control';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() arrayName!: string;
  @Input() groupName!: string | number | null;
  @Input() control!: CustomFormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
