import { Page, Locator } from '@playwright/test';
import { BasePageComponent } from '../BasepageComponent';

export class RegistrationForm extends BasePageComponent {

    constructor(page: Page) {
        super(page, page.locator('.modal-content app-signup-modal'));
    }

    // Locators
    public readonly registerModal = this.container.locator('.modal-content app-signup-modal');
    public readonly modalTitle = this.container.locator('.modal-title');
    public readonly nameInput = this.container.locator('#signupName');
    public readonly lastNameInput = this.container.locator('#signupLastName');
    public readonly emailInput = this.container.locator('#signupEmail');
    public readonly passwordInput = this.container.locator('#signupPassword');
    public readonly repeatPasswordInput = this.container.locator('#signupRepeatPassword');
    public readonly registerButton = this.container.locator('.btn-primary', { hasText: 'Register' });
    public readonly errorMessage = this.container.locator('.invalid-feedback');
    public readonly closeButton = this.container.locator('button.close');
    public readonly userAlreadyExistErrorMessage = this.page.locator('.alert-danger', { hasText: 'user already exists' });
    public readonly registrationCompleteMessage = this.page.locator('.alert-success', { hasText: 'registration complete' });
}