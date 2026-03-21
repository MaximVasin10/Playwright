import { Page, Locator } from '@playwright/test';

export class BasePageComponent {
    constructor(protected page: Page, protected container: Locator) { }
}