import { Page, Locator } from '@playwright/test';
import { BasePageComponent } from '../base.pageComponent';

export class Header extends BasePageComponent {

    constructor(page: Page) {
        super(page, page.locator('app-header'));
    }

    // Locators

    public readonly signInButton = this.container.locator('.header_signin');
    public readonly guestLoginLink = this.container.locator('.header-link', { hasText: 'Guest log in' });

}