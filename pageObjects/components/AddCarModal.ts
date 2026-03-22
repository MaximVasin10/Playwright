import { Page, Locator } from '@playwright/test';
import { BasePageComponent } from '../BasepageComponent';

export class AddCarModal extends BasePageComponent {

    constructor(page: Page) {
        super(page, page.locator('app-add-car-modal'));
    }

    // Locators

    public readonly addCarModalHeader = this.container.locator('.modal-header');

    public readonly brandSelect = this.container.locator('select#addCarBrand');
    public readonly modelSelect = this.container.locator('select#addCarModel');
    public readonly mileageInput = this.container.locator('input#addCarMileage');

    public readonly cancelButton = this.container.locator('button', { hasText: 'Cancel' });
    public readonly addButton = this.container.locator('button', { hasText: 'Add' });
    public readonly closeButton = this.container.locator('button.close');

}