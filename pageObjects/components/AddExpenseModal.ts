import { Page, Locator } from '@playwright/test';
import { BasePageComponent } from '../BasepageComponent';

export class AddExpenseModal extends BasePageComponent {

    constructor(page: Page) {
        super(page, page.locator('app-add-expense-modal'));
    }

    // Locators
    public readonly addExpenseModalHeader = this.container.locator('.modal-header');
    public readonly vehicleSelect = this.container.locator('select#addExpenseCar');
    public readonly reportDateInput = this.container.locator('input#addExpenseDate');
    public readonly datePickerToggle = this.container.locator('button.date-picker-toggle');
    public readonly mileageInput = this.container.locator('input#addExpenseMileage');
    public readonly litersInput = this.container.locator('input#addExpenseLiters');
    public readonly totalCostInput = this.container.locator('input#addExpenseTotalCost');

    public readonly cancelButton = this.container.locator('button', { hasText: 'Cancel' });
    public readonly addButton = this.container.locator('button', { hasText: 'Add' });
    public readonly closeButton = this.container.locator('button.close');
}