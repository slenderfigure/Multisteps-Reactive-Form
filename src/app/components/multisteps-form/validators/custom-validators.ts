import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";

export class CustomValidators {
  static phone(control: AbstractControl): ValidationErrors | null {
    const REGEX = /^(\d{3}|\(\d{3}\))[\s-]?\d{3}[\s-]?\d{4}$/;
    return REGEX.test(control.value) || !control.value ? null : { phone: true }; 
  }

  static email(control: AbstractControl): ValidationErrors | null {
    const REGEX = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
    return REGEX.test(control.value) || !control.value ? null : { email: true };
  }

  static username(control: AbstractControl): ValidationErrors | null {
    const REGEX = /^[A-z0-9]+$/;
    return REGEX.test(control.value) || !control.value ? null: { username: true };
  }
  
  static existingUsername(control: AbstractControl): Observable<ValidationErrors | null> {
    const USERS = ['hirayoki', 'shinigami'];
    const result = USERS.includes(control.value) ? { usernameTaken: true } : null;
    return of(result);
  }

  static existingEmail(control: AbstractControl): Observable<ValidationErrors | null> {
    const EMAILS = ['hirayoki.nova@gmail.com', 'email@domain.com'];
    const result = EMAILS.includes(control.value) ? { emailTaken: true } : null;
    return of(result);
  }
}