import { Page, Locator } from '@playwright/test';
import { BasePage } from '../Basepage';

export class FuelExpenses extends BasePage {

    constructor(page: Page) {
        super(page, '/panel/expenses');
    }

    // Locators

    public readonly fuelExpensesTitle = this.page.locator('.panel-page_heading h1');
    public readonly carSelectDropdown = this.page.locator('button#carSelectDropdown');
    public readonly addExpenseButton = this.page.getByRole('button', { name: 'Add an expense' });

}