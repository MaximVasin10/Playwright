import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page.ts';

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page, '/');
    }

    // Locators

    public readonly signUpButton = this.page.locator('.btn-primary', { hasText: 'Sign up' });

}