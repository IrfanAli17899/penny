import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export interface PasswordStrengthErrors extends ValidationErrors {
    minLength?: boolean;
    noUpperCase?: boolean;
    noLowerCase?: boolean;
    noNumber?: boolean;
    noSpecialChar?: boolean;
}

export class CustomValidators {
    static readonly PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    static passwordMatch(passwordField: string, confirmPasswordField: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!(control instanceof FormGroup)) {
                return null;
            }

            const password = control.get(passwordField);
            const confirmPassword = control.get(confirmPasswordField);

            if (!password || !confirmPassword) {
                return null;
            }

            if (confirmPassword.errors && !confirmPassword.errors['passwordMismatch']) {
                return null;
            }

            if (password.value !== confirmPassword.value) {
                const error = { passwordMismatch: true };
                confirmPassword.setErrors(error);
                return error;
            } else {
                const errors = { ...confirmPassword.errors };
                delete errors['passwordMismatch'];
                confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
                return null;
            }
        };
    }

    static passwordStrength(minLength?: number): ValidatorFn {
        return (control: AbstractControl): PasswordStrengthErrors | null => {
            if (!control.value) {
                return null;
            }

            const errors: PasswordStrengthErrors = {};

            if (control.value.length < (minLength || 8)) {
                errors.minLength = true;
            }

            const hasUpperCase = /[A-Z]/.test(control.value);
            const hasLowerCase = /[a-z]/.test(control.value);
            const hasNumber = /\d/.test(control.value);
            const hasSpecialChar = /[@$!%*?&]/.test(control.value);

            if (!hasUpperCase) errors.noUpperCase = true;
            if (!hasLowerCase) errors.noLowerCase = true;
            if (!hasNumber) errors.noNumber = true;
            if (!hasSpecialChar) errors.noSpecialChar = true;

            return Object.keys(errors).length ? errors : null;
        };
    }
}



type ErrorMessageFunction = (params: any) => string;
type ErrorMessageValue = string | ErrorMessageFunction;

interface ErrorMessages {
    [key: string]: ErrorMessageValue;
}

@Injectable({
    providedIn: 'root'
})
export class ValidationMessagesService {
    private readonly messages: ErrorMessages = {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        minLength: 'Password must be at least 8 characters',
        maxlength: (params: { requiredLength: number }) =>
            `Maximum length is ${params.requiredLength} characters`,
        passwordMismatch: 'Passwords do not match',
        noUpperCase: 'Password must contain at least one uppercase letter',
        noLowerCase: 'Password must contain at least one lowercase letter',
        noNumber: 'Password must contain at least one number',
        noSpecialChar: 'Password must contain at least one special character (@$!%*?&)',
        pattern: 'Invalid format'
    };

    getErrorMessage(control: AbstractControl | null): string {
        if (!control || !control.errors) return '';

        const firstError = Object.entries(control.errors)[0];
        const errorKey = firstError[0];
        const errorValue = firstError[1];

        const message = this.messages[errorKey];

        if (typeof message === 'function') {
            return (message as ErrorMessageFunction)(errorValue);
        }

        return message?.toString() || 'Invalid value';
    }
}

export abstract class FormBase {
    constructor(protected validationMessages: ValidationMessagesService) { }

    getErrorMessage(form: FormGroup, controlName: string): string {
        const control = form.get(controlName);
        return this.validationMessages.getErrorMessage(control);
    }
}