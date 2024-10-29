import * as joi from "joi";

export const PASSWORD_RULES = {
    MIN_LENGTH: 8,
    ALLOWED_SPECIAL_CHARS: '@$!%*?&',
    REQUIREMENTS: {
        MIN_LENGTH: 8,
        UPPERCASE: true,
        LOWERCASE: true,
        NUMBER: true,
        SPECIAL_CHAR: true
    }
} as const;

export const PASSWORD_PATTERN = 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const passwordValidation = joi.string()
    .required()
    .min(PASSWORD_RULES.MIN_LENGTH)
    .pattern(PASSWORD_PATTERN)
    .messages({
        'string.min': `Password must be at least ${PASSWORD_RULES.MIN_LENGTH} characters`,
        'string.pattern.base': `Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (${PASSWORD_RULES.ALLOWED_SPECIAL_CHARS})`,
        'any.required': 'Password is required'
    });

export const testPasswordStrength = (password: string): {
    isValid: boolean;
    errors: string[];
} => {
    const errors: string[] = [];
    
    if (password.length < PASSWORD_RULES.MIN_LENGTH) {
        errors.push(`Password must be at least ${PASSWORD_RULES.MIN_LENGTH} characters`);
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    if (!new RegExp(`[${PASSWORD_RULES.ALLOWED_SPECIAL_CHARS}]`).test(password)) {
        errors.push(`Password must contain at least one special character (${PASSWORD_RULES.ALLOWED_SPECIAL_CHARS})`);
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};