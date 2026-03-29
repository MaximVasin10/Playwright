import { Page, Locator } from '@playwright/test';
import { BasePage } from '../Basepage';

export class Profile extends BasePage {

    constructor(page: Page) {
        super(page, '/panel/profile');
    }

    // Locators

    public readonly profileTitle = this.page.locator('h1', { hasText: 'Profile' });
    public readonly profilePhoto = this.page.getByAltText('User photo');
    public readonly editProfileButton = this.page.locator('button', { hasText: 'Edit profile' });
    public readonly profileName = this.page.locator('.profile_name');

}