import { Component, Input, OnInit } from '@angular/core';
import { CustomFormControl } from 'src/app/models/custom-form-control';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
  @Input() errorMessage!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
