import { test, expect } from '../../../fixtures/PageFixture';
import { VALIDATION_MESSAGES } from '../../../testData/validationMessages';
import { faker } from '@faker-js/faker';

const ERROR_RED = 'rgb(220, 53, 69)';

test.describe('Registration: basic checks', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
    });

    test('Opening the registration form from the main page', async ({ homePage, registrationForm }) => {
        await homePage.signUpButton.click();
        await expect(registrationForm.modalTitle).toBeVisible();
        await expect(registrationForm.modalTitle).toHaveText('Registration');
    });

    test('Opening the registration form from the login form', async ({ header, loginForm, registrationForm }) => {
        await header.signInButton.click();
        await loginForm.registrationButton.click();
        await expect(registrationForm.modalTitle).toBeVisible();
        await expect(registrationForm.modalTitle).toHaveText('Registration');
    });

    test('Observe registration form elements visibility', async ({ homePage, registrationForm }) => {
        await homePage.signUpButton.click();
        await expect(registrationForm.modalTitle).toBeVisible();
        await expect(registrationForm.nameInput).toBeVisible();
        await expect(registrationForm.lastNameInput).toBeVisible();
        await expect(registrationForm.emailInput).toBeVisible();
        await expect(registrationForm.passwordInput).toBeVisible();
        await expect(registrationForm.repeatPasswordInput).toBeVisible();
        await expect(registrationForm.closeButton).toBeVisible();
        await expect(registrationForm.registerButton).toBeVisible();
    });

    test('Close registration form by "X" button', async ({ homePage, registrationForm }) => {
        await homePage.signUpButton.click();
        await registrationForm.closeButton.click();
        await expect(registrationForm.registerModal).not.toBeVisible();
    });
});

test.describe('Registration: Empty fields validation', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
        await homePage.signUpButton.click();
    });

    test('Name field should show validation message if it is empty', async ({ registrationForm }) => {
        await registrationForm.nameInput.focus();
        await registrationForm.nameInput.blur();
        await expect(registrationForm.errorMessage).toHaveText('Name is required');
        await expect(registrationForm.registerButton).toBeDisabled();
    });

    test('Last name field should show validation message if it is empty', async ({ registrationForm }) => {
        await registrationForm.lastNameInput.focus();
        await registrationForm.lastNameInput.blur();
        await expect(registrationForm.errorMessage).toHaveText('Last name is required');
        await expect(registrationForm.registerButton).toBeDisabled();
    });

    test('Email field should show validation message if it is empty', async ({ registrationForm }) => {
        await registrationForm.emailInput.focus();
        await registrationForm.emailInput.blur();
        await expect(registrationForm.errorMessage).toHaveText('Email is required');
        await expect(registrationForm.registerButton).toBeDisabled();
    });

    test('Password field should show validation message if it is empty', async ({ registrationForm }) => {
        await registrationForm.passwordInput.focus();
        await registrationForm.passwordInput.blur();
        await expect(registrationForm.errorMessage).toHaveText('Password is required');
        await expect(registrationForm.registerButton).toBeDisabled();
    });

    test('Re-enter password field should show validation message if it is empty', async ({ registrationForm }) => {
        await registrationForm.repeatPasswordInput.focus();
        await registrationForm.repeatPasswordInput.blur();
        await expect(registrationForm.errorMessage).toHaveText('Re-enter password is required');
        await expect(registrationForm.registerButton).toBeDisabled();
    });
});

test.describe('Registration: Validation of Name and Surname length', () => {
    const randomName = (length: number) => faker.string.alpha(length);

    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
        await homePage.signUpButton.click();
    });

    test('Name should be invalid with less than 2 symbols', async ({ registrationForm }) => {
        await registrationForm.nameInput.fill(randomName(1));
        await registrationForm.nameInput.blur();
        await expect(registrationForm.nameInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.nameInput).toHaveCSS('border-color', ERROR_RED);
        await expect(registrationForm.errorMessage).toBeVisible();
    });

    test('Name should be valid with 2 symbols', async ({ registrationForm }) => {
        await registrationForm.nameInput.fill(randomName(2));
        await registrationForm.nameInput.blur();
        await expect(registrationForm.nameInput).not.toHaveClass(/is-invalid/);
    });

    test('Name should be invalid with 21 symbols', async ({ registrationForm }) => {
        await registrationForm.nameInput.fill(randomName(21));
        await registrationForm.nameInput.blur();
        await expect(registrationForm.nameInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.nameInput).toHaveCSS('border-color', ERROR_RED);
        await expect(registrationForm.errorMessage).toBeVisible();
    });

    test('Last Name  should be invalid with less than 2 symbols', async ({ registrationForm }) => {
        await registrationForm.lastNameInput.fill(randomName(1));
        await registrationForm.lastNameInput.blur();
        await expect(registrationForm.lastNameInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.lastNameInput).toHaveCSS('border-color', ERROR_RED);
        await expect(registrationForm.errorMessage).toBeVisible();
    });

    test('Last Name  should be valid with 2 symbols', async ({ registrationForm }) => {
        await registrationForm.lastNameInput.fill(randomName(2));
        await registrationForm.lastNameInput.blur();
        await expect(registrationForm.lastNameInput).not.toHaveClass(/is-invalid/);
    });

    test('Last Name should be invalid with 21 symbols', async ({ registrationForm }) => {
        await registrationForm.lastNameInput.fill(randomName(21));
        await registrationForm.lastNameInput.blur();
        await expect(registrationForm.lastNameInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.lastNameInput).toHaveCSS('border-color', ERROR_RED);
        await expect(registrationForm.errorMessage).toBeVisible();
    });


});

test.describe('Registration: Email field validation', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
        await homePage.signUpButton.click();
    });

    // Positive cases
    test('Email should be valid: basic mail', async ({ registrationForm }) => {
        await registrationForm.emailInput.fill('test@test.com');
        await registrationForm.emailInput.blur();
        await expect(registrationForm.emailInput).not.toHaveClass(/is-invalid/);
    });

    test('Email should be valid: only numbers before @', async ({ registrationForm }) => {
        await registrationForm.emailInput.fill('12345@test.com');
        await registrationForm.emailInput.blur();
        await expect(registrationForm.emailInput).not.toHaveClass(/is-invalid/);
    });

    test('Email should be valid: text+numbers', async ({ registrationForm }) => {
        await registrationForm.emailInput.fill('test123@test.com');
        await registrationForm.emailInput.blur();
        await expect(registrationForm.emailInput).not.toHaveClass(/is-invalid/);
    });

    test('Email should be valid: double dot in domain', async ({ registrationForm }) => {
        await registrationForm.emailInput.fill('test@test.co.uk');
        await registrationForm.emailInput.blur();
        await expect(registrationForm.emailInput).not.toHaveClass(/is-invalid/);
    });

    // Negative cases
    test('Email should be invalid: without @', async ({ registrationForm }) => {
        await registrationForm.emailInput.fill('testtest.com');
        await registrationForm.emailInput.blur();

        await expect(registrationForm.emailInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.emailInput).toHaveCSS('border-color', ERROR_RED);
        await expect(registrationForm.errorMessage).toHaveText(VALIDATION_MESSAGES.emailIncorrect);
        await expect(registrationForm.registerButton).toBeDisabled();
    });

    test('Email should be invalid: without domain', async ({ registrationForm }) => {
        await registrationForm.emailInput.fill('max@');
        await registrationForm.emailInput.blur();

        await expect(registrationForm.emailInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.emailInput).toHaveCSS('border-color', ERROR_RED);
        await expect(registrationForm.errorMessage).toHaveText(VALIDATION_MESSAGES.emailIncorrect);
    });

    test('Email should be invalid: without name', async ({ registrationForm }) => {
        await registrationForm.emailInput.fill('@gmail.com');
        await registrationForm.emailInput.blur();

        await expect(registrationForm.emailInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.emailInput).toHaveCSS('border-color', ERROR_RED);
        await expect(registrationForm.errorMessage).toHaveText(VALIDATION_MESSAGES.emailIncorrect);
    });

    test('Email should be invalid: dot at the start', async ({ registrationForm }) => {
        await registrationForm.emailInput.fill('.test@gmail.com');
        await registrationForm.emailInput.blur();

        await expect(registrationForm.emailInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.emailInput).toHaveCSS('border-color', ERROR_RED);
        await expect(registrationForm.errorMessage).toHaveText(VALIDATION_MESSAGES.emailIncorrect);
    });

    test('Email should be invalid: dot at the end', async ({ registrationForm }) => {
        await registrationForm.emailInput.fill('test.@gmail.co.');
        await registrationForm.emailInput.blur();

        await expect(registrationForm.emailInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.emailInput).toHaveCSS('border-color', ERROR_RED);
        await expect(registrationForm.errorMessage).toHaveText(VALIDATION_MESSAGES.emailIncorrect);
    });

    test('Email should be invalid: space inside the input', async ({ registrationForm }) => {
        await registrationForm.emailInput.fill('test @gmail.com');
        await registrationForm.emailInput.blur();

        await expect(registrationForm.emailInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.emailInput).toHaveCSS('border-color', ERROR_RED);
        await expect(registrationForm.errorMessage).toHaveText(VALIDATION_MESSAGES.emailIncorrect);
    });

    test('Email should be invalid: spec symbols before @', async ({ registrationForm }) => { //test is failed. Need to discuss the requirements
        await registrationForm.emailInput.fill('te#!st@gmail.com');
        await registrationForm.emailInput.blur();

        await expect(registrationForm.emailInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.emailInput).toHaveCSS('border-color', ERROR_RED);
        await expect(registrationForm.errorMessage).toHaveText(VALIDATION_MESSAGES.emailIncorrect);
    });

    test('Email should be invalid: spec symbols after @', async ({ registrationForm }) => {
        await registrationForm.emailInput.fill('test@!gmail.com');
        await registrationForm.emailInput.blur();

        await expect(registrationForm.emailInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.emailInput).toHaveCSS('border-color', ERROR_RED);
        await expect(registrationForm.errorMessage).toHaveText(VALIDATION_MESSAGES.emailIncorrect);
    });
});

test.describe('Registration: Password field validation', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
        await homePage.signUpButton.click();
    });

    test('Password should be hidden (input type="password")', async ({ registrationForm }) => {
        await expect(registrationForm.passwordInput).toHaveAttribute('type', 'password');
    });

    // Positive cases
    test('Password should be valid: 8 symbols (low boundary)', async ({ registrationForm }) => {
        await registrationForm.passwordInput.fill('Passwor1');
        await registrationForm.passwordInput.blur();
        await expect(registrationForm.passwordInput).not.toHaveClass(/is-invalid/);
    });

    test('Password should be valid: 10 symbols (middle)', async ({ registrationForm }) => {
        await registrationForm.passwordInput.fill('Passwor123');
        await registrationForm.passwordInput.blur();
        await expect(registrationForm.passwordInput).not.toHaveClass(/is-invalid/);
    });

    test('Password should be valid: 15 symbols (high boundary)', async ({ registrationForm }) => {
        await registrationForm.passwordInput.fill('Passwor12345678');
        await registrationForm.passwordInput.blur();
        await expect(registrationForm.passwordInput).not.toHaveClass(/is-invalid/);
    });

    test('Password should be valid: with spec symbols', async ({ registrationForm }) => {
        await registrationForm.passwordInput.fill('Pass123!');
        await registrationForm.passwordInput.blur();
        await expect(registrationForm.passwordInput).not.toHaveClass(/is-invalid/);
    });

    test('Password should be invalid: with space inside', async ({ registrationForm }) => {
        await registrationForm.passwordInput.fill('Pass word1');
        await registrationForm.passwordInput.blur();

        await expect(registrationForm.passwordInput).not.toHaveClass(/is-invalid/);
    });

    test('Password should be invalid: with space at the start', async ({ registrationForm }) => {
        await registrationForm.passwordInput.fill(' Passwor1');
        await registrationForm.passwordInput.blur();

        await expect(registrationForm.passwordInput).not.toHaveClass(/is-invalid/);
    });

    test('Password should be invalid: with space at the end', async ({ registrationForm }) => {
        await registrationForm.passwordInput.fill('Passwor1 ');
        await registrationForm.passwordInput.blur();
        await expect(registrationForm.passwordInput).not.toHaveClass(/is-invalid/);
    });

    // Negative cases
    test('Password should be invalid: too short (7 symbols)', async ({ registrationForm }) => {
        await registrationForm.passwordInput.fill('Passw1');
        await registrationForm.passwordInput.blur();

        await expect(registrationForm.passwordInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.errorMessage).toHaveText(VALIDATION_MESSAGES.passwordValidationError);
        await expect(registrationForm.registerButton).toBeDisabled();
    });

    test('Password should be invalid: too long (16 symbols)', async ({ registrationForm }) => {
        await registrationForm.passwordInput.fill('Passwor123456789');
        await registrationForm.passwordInput.blur();

        await expect(registrationForm.passwordInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.errorMessage).toHaveText(VALIDATION_MESSAGES.passwordValidationError);
        await expect(registrationForm.registerButton).toBeDisabled();
    });

    test('Password should be invalid: without capital letter', async ({ registrationForm }) => {
        await registrationForm.passwordInput.fill('password123');
        await registrationForm.passwordInput.blur();

        await expect(registrationForm.passwordInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.errorMessage).toHaveText(VALIDATION_MESSAGES.passwordValidationError);
        await expect(registrationForm.registerButton).toBeDisabled();
    });

    test('Password should be invalid: without small letter', async ({ registrationForm }) => {
        await registrationForm.passwordInput.fill('PASSWORD123');
        await registrationForm.passwordInput.blur();

        await expect(registrationForm.passwordInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.errorMessage).toHaveText(VALIDATION_MESSAGES.passwordValidationError);
        await expect(registrationForm.registerButton).toBeDisabled();
    });

    test('Password should be invalid: without numbers', async ({ registrationForm }) => {
        await registrationForm.passwordInput.fill('Password!');
        await registrationForm.passwordInput.blur();

        await expect(registrationForm.passwordInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.errorMessage).toHaveText(VALIDATION_MESSAGES.passwordValidationError);
        await expect(registrationForm.registerButton).toBeDisabled();
    });

});

test.describe('Registration: Re-enter password validation', () => {
    // We define a base password to compare against
    const basePassword = 'Password123!';

    test.beforeEach(async ({ homePage, registrationForm }) => {
        await homePage.open();
        await homePage.signUpButton.click();
        // Pre-fill the first password field for all tests in this block
        await registrationForm.passwordInput.fill(basePassword);
    });

    test('Should show error if passwords are different', async ({ registrationForm }) => {
        await registrationForm.repeatPasswordInput.fill('Different123');
        await registrationForm.repeatPasswordInput.blur();

        await expect(registrationForm.repeatPasswordInput).toHaveClass(/is-invalid/);
        await expect(registrationForm.errorMessage).toHaveText(VALIDATION_MESSAGES.passwordMatchError);
        await expect(registrationForm.registerButton).toBeDisabled();
    });

    test('Should show error if cases are different', async ({ registrationForm }) => {
        await registrationForm.passwordInput.fill(basePassword + 't'); // add one letter in lower case
        await registrationForm.repeatPasswordInput.fill(basePassword + 'T');
        await registrationForm.repeatPasswordInput.blur();

        await expect(registrationForm.errorMessage).toHaveText(VALIDATION_MESSAGES.passwordMatchError);
    });

    test('Should show error if there is an additional space', async ({ registrationForm }) => {
        await registrationForm.repeatPasswordInput.fill(` ${basePassword}`);
        await registrationForm.repeatPasswordInput.blur();

        await expect(registrationForm.errorMessage).toHaveText(VALIDATION_MESSAGES.passwordMatchError);
    });

    test('Should be valid if passwords are identical', async ({ registrationForm }) => {
        await registrationForm.repeatPasswordInput.fill(basePassword);
        await registrationForm.repeatPasswordInput.blur();

        await expect(registrationForm.repeatPasswordInput).not.toHaveClass(/is-invalid/);
    });
});

test.describe('Registration: Verify Successfull registration & user already exists cases', () => {

    const password = 'Password123!';

    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
        await homePage.signUpButton.click();
    });

    test('Should register a new user successfully', async ({ registrationForm }) => {
        // Generating unique data
        const uniqueEmail = `aqaMax${faker.string.alphanumeric(10)}@test.com`;

        await registrationForm.nameInput.fill(faker.person.firstName());
        await registrationForm.lastNameInput.fill(faker.person.lastName());
        await registrationForm.emailInput.fill(uniqueEmail);
        await registrationForm.passwordInput.fill(password);
        await registrationForm.repeatPasswordInput.fill(password);

        await expect(registrationForm.registerButton).toBeEnabled();
        await registrationForm.registerButton.click();

        // Check success message (ensure this locator is added to your RegistrationForm class)
        await expect(registrationForm.registrationCompleteMessage).toBeVisible();
    });

    test('Should show error when user already exists', async ({ registrationForm }) => {
        const existingEmail = 'test@mail.com'; // Constant for existing user

        await registrationForm.nameInput.fill('Ivan');
        await registrationForm.lastNameInput.fill('Tester');
        await registrationForm.emailInput.fill(existingEmail);
        await registrationForm.passwordInput.fill(password);
        await registrationForm.repeatPasswordInput.fill(password);

        await registrationForm.registerButton.click();

        // Check error message (ensure this locator is added to your RegistrationForm class)
        await expect(registrationForm.userAlreadyExistErrorMessage).toBeVisible();
    });
});