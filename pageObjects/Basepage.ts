import { Page } from '@playwright/test';

export class BasePage {
    constructor(protected page: Page, protected url: string) { }

    async open() {
        await this.page.goto(this.url);
    }
}