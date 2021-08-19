import { HttpClient, HttpContext, HttpContextToken, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AsyncValidatorFn, ValidatorFn, Validators } from "@angular/forms";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, delay } from "rxjs/operators";
import { environment as env } from 'src/environments/environment';
import { CustomValidators } from "../components/multisteps-form/validators/custom-validators";
import { CustomFormControl, CustomValidator } from "../models/custom-form-control";
import { CONTROLS } from "../models/form-controls";

export const RETRY_TOKEN = new HttpContextToken(() => 1);

const validatorsList = {
  EMAIL: CustomValidators.email,
  EMAILTAKEN: CustomValidators.existingEmail,
  MINLENGTH: (value: number) => Validators.minLength(value),
  MAXLENGTH: (value: number) => Validators.maxLength(value),
  MIN: (value: number) => Validators.min(value),
  MAX: (value: number) => Validators.max(value),
  PATTERN: (value: string | RegExp) => Validators.pattern(value),
  PASSWORD: null,
  PHONE: CustomValidators.phone,
  REQUIRED: Validators.required,
  USERNAMETAKEN: CustomValidators.existingUsername
};

@Injectable({ providedIn: 'root' })
export class ControlService {

  constructor(private http: HttpClient) { }

  // getControls(): Observable<CustomFormControl[][] | []> {
  //   return this.http.get<CustomFormControl[][]>(
  //     env.API_URL,
  //     { context: new HttpContext().set(RETRY_TOKEN, 3) }
  //   )
  //   .pipe(
  //     map(controlList => {
  //       return controlList.map(controls => {
  //         return controls.map(control => {
  //           if (control.validators) {
  //             control.validators.forEach(validator => {
  //               validator = this.getValidatorFn(validator);
  //             });
  //           }
  //           return this.createCustomFormControl(control);
  //         });
  //       });
  //     }),
  //     delay(1600),
  //     catchError(this.errorHandler)
  //   );
  // }

  getControls(): Observable<CustomFormControl[][] | []> {
    return of(CONTROLS);
  }

  private createCustomFormControl(control: any): CustomFormControl {
    return new CustomFormControl(control);
  }

  private getValidatorFn(validator: CustomValidator): CustomValidator {
    const matchingValidator = validatorsList[validator.type];

    if (['MINLENGTH', 'MAXLENGTH', 'MIN', 'MAX', 'PATTERN']
      .includes(validator.type) && validator.criteria) {
      validator.validator = <any>matchingValidator!(<any>validator?.criteria);
    } else {
      validator.validator = <ValidatorFn | AsyncValidatorFn>matchingValidator;
    }
    return validator;
  }
  
  private errorHandler(error: HttpErrorResponse): Observable<never> {
    let message = '';

    if (error.status === 0) message = 'Something went wrong. Please retry later';
    else message = 'Unable to retrive data' + error.message;
    return throwError(new Error(message));
  }

}