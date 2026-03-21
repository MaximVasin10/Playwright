export const VALIDATION_MESSAGES = {
    passwordValidationError: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    passwordMatchError: 'Passwords do not match',
    emailIncorrect: 'Email is incorrect'
} as const; // only for reading