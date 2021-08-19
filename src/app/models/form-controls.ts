import { Validators } from '@angular/forms';
import { CustomFormControl, ControlType } from '../models/custom-form-control';
import { CustomValidators } from '../components/multisteps-form/validators/custom-validators';

export const CONTROLS: CustomFormControl[][] = [
  [
    new CustomFormControl({
      order: 1,
      key: 'firstName',
      label: 'First name',
      controlType: ControlType.TEXTFIELD,
      validators: [
        {
          validator: Validators.required,
          type: 'REQUIRED',
          message: 'Please enter your first name'
        },
        {
          validator: Validators.minLength(2),
          type: 'MINLENGTH',
          message: 'Cannot be less than 2 characters long'
        }
      ],
    }),
    new CustomFormControl({
      order: 2,
      key: 'lastName',
      label: 'Last name',
      controlType: ControlType.TEXTFIELD,
      validators: [
        {
          validator: Validators.required,
          type: 'REQUIRED',
          message: 'Please enter your last name'
        },
        {
          validator: Validators.minLength(2),
          type: 'MINLENGTH',
          message: 'Cannot be less than 2 characters long'
        }
      ]
    }),
    new CustomFormControl({
      order: 3,
      key: 'age',
      label: 'Age',
      controlType: ControlType.TEXTFIELD,
      validators: [
        {
          validator: Validators.min(18),
          type: 'MIN',
          message: 'You must be 18+ years old to proceed'
        },
        {
          validator: Validators.max(100),
          type: 'MAX',
          message: 'This age is suspcious'
        }
      ],
      textfieldType: 'number'
    }),
    new CustomFormControl({
      order: 4,
      key: 'gender',
      label: 'Gender',
      controlType: ControlType.DROPDOWN,
      validators: [{
        validator: Validators.required,
        type: 'REQUIRED',
        message: 'Please select your gender'
      }],
      dropdownOptions: [
        { value: null, key: 'Choose an option' },
        { value: 'male', key: 'Male' },
        { value: 'female', key: 'Female' },
        { value: 'other', key: 'lol' }
      ]
    })
  ],
  [
    new CustomFormControl({
      order: 1,
      key: 'phone',
      label: 'Phone',
      controlType: ControlType.TEXTFIELD,
      validators: [
        {
          validator: Validators.required,
          type: 'REQUIRED',
          message: 'Please enter your phone number'
        },
        {
          validator: CustomValidators.phone,
          type: 'PHONE',
          message: 'Enter a valid phone number'
        }
      ]
    }),
    new CustomFormControl({
      order: 2,
      key: 'phone2',
      label: 'Phone (2)',
      controlType: ControlType.TEXTFIELD,
      validators: [{
        validator: CustomValidators.phone,
        type: 'PHONE',
        message: 'Enter a valid phone number'
      }]
    }),
    new CustomFormControl({
      order: 3,
      key: 'email',
      label: 'Email',
      controlType: ControlType.TEXTFIELD,
      validators: [
        {
          validator: Validators.required,
          type: 'REQUIRED',
          message: 'Please enter your email'
        },
        {
          validator: CustomValidators.email,
          type: 'EMAIL',
          message: 'Enter a valid email'
        },
        {
          validator: CustomValidators.existingEmail,
          type: 'EMAILTAKEN',
          message: 'This email is already taken',
          async: true
        }
      ],
      textfieldType: 'email'
    })
  ],
  [
    new CustomFormControl({
      order: 1,
      key: 'country',
      label: 'Country',
      controlType: ControlType.DROPDOWN,
      validators: [{
        validator: Validators.required,
        type: 'REQUIRED',
        message: 'Select your country'
      }],
      dropdownOptions: [
        { value: null, key: 'Select your country' },
        { value: 'us', key: 'United States' },
        { value: 'uk', key: 'United Kingdom' },
        { value: 'au', key: 'Australia' },
        { value: 'ca', key: 'Canada' },
        { value: 'do', key: 'Dominican Republic' },
        { value: 'jp', key: 'Japan' }
      ]    
    }),
    new CustomFormControl({
      order: 2,
      key: 'profession',
      label: 'What do you do?',
      validators: [{
        validator: Validators.required,
        type: 'REQUIRED',
        message: 'Please enter your profession'
      }],
      controlType: ControlType.TEXTFIELD,
      textfieldType: 'text'
    }),
    new CustomFormControl({
      order: 3,
      key: 'about',
      label: 'About you',
      controlType: ControlType.TEXTAREA
    })
  ]
];