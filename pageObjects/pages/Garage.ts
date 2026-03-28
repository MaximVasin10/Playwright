import { Page, Locator } from '@playwright/test';
import { BasePage } from '../Basepage';

export class Garage extends BasePage {

    constructor(page: Page) {
        super(page, '/panel/garage');
    }

    // Locators

    public readonly addCarButton = this.page.getByRole('button', { name: 'Add car' });
    public readonly addFuelExpenseButton = this.page.locator('.car-item').first().getByRole('button', { name: 'Add fuel expense' });
    public readonly editCarIcon = this.page.locator('.icon-edit');
    public readonly fuelExpensesLink = this.page.locator('.sidebar a[href="/panel/expenses"]');
    public readonly garageLink = this.page.locator('.sidebar a[href="/panel/garage"]');
    public readonly instructionsLink = this.page.locator('.sidebar a[href="/panel/instructions"]');
    public readonly logoutLink = this.page.getByRole('link', { name: 'Log out' });
    public readonly garageTitle = this.page.locator('.panel-page_heading h1');
    public readonly carList = this.page.locator('.car-list');
    public readonly carItem = this.page.locator('.car-item');
    public readonly carName = this.page.locator('.car_name');
    public readonly carLogo = this.page.locator('.car-logo_img');
    public readonly updateMileageText = this.page.locator('.car_update-mileage');
    public readonly mileageInput = this.page.locator('input[name="miles"]');
    public readonly updateMileageButton = this.page.locator('.update-mileage-form_submit');


}