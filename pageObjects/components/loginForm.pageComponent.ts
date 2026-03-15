import { Page, Locator } from '@playwright/test';
import { BasePageComponent } from '../base.pageComponent';

export class LoginForm extends BasePageComponent {

    constructor(page: Page) {
        super(page, page.locator('.modal-content'));
    }

    // Locators as public readonly properties
    public readonly modalTitle = this.container.locator('.modal-title');
    public readonly emailInput = this.container.locator('#signinEmail');
    public readonly passwordInput = this.container.locator('#signinPassword');
    public readonly rememberMeCheckbox = this.container.locator('#remember');
    public readonly loginButton = this.container.locator('.modal-footer button.btn-primary', { hasText: 'Login' });
    public readonly forgotPasswordButton = this.container.locator('.btn-link', { hasText: 'Forgot password' });
    public readonly registrationButton = this.container.locator('.modal-footer .btn-link', { hasText: 'Registration' });
    public readonly closeButton = this.container.locator('button.close');


    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}