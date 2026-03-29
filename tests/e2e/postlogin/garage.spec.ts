import { ApiController } from '../../../api-controllers/ApiController';
import { test, expect } from '../../../fixtures/PageFixture';
import { faker } from '@faker-js/faker';

test.describe('Garage: basic checks', () => {

    test.beforeEach(async ({ page, homePage, apiController }) => {
        await apiController.cleanupCars();
        await homePage.open();
        await page.reload();
    });

    test.afterAll(async ({ request }) => {
        const apiController = new ApiController(request);
        await apiController.cleanupCars();
    });

    test('Observe Garage page', async ({ garage }) => {
        await expect(garage.garageTitle).toBeVisible();
        await expect(garage.garageTitle).toHaveText('Garage');
    });

    test('Add car', async ({ garage, addCarModal }) => {
        await garage.addCarButton.click();
        await expect(addCarModal.addCarModalHeader).toBeVisible();
        await addCarModal.brandSelect.selectOption('BMW');
        await addCarModal.modelSelect.selectOption('X5');
        const mileage = faker.number.int({ min: 0, max: 200000 }).toString();
        await addCarModal.mileageInput.fill(mileage);
        await addCarModal.addButton.click();
        // Verify the car is added to the garage
        await expect(addCarModal.addCarModalHeader).toBeHidden();
        await expect(garage.carItem).toBeVisible();
        await expect(garage.carLogo).toBeVisible();
        await expect(garage.carName).toHaveText('BMW X5');
        await expect(garage.mileageInput).toBeVisible();
    });

    test('Add expense modal appears on Add fuel Expense button click', async ({ garage, addCarModal, addExpenseModal }) => {
        await garage.addCarButton.click();
        await expect(addCarModal.addCarModalHeader).toBeVisible();
        await addCarModal.brandSelect.selectOption('Audi');
        await addCarModal.modelSelect.selectOption('TT');
        const mileage = faker.number.int({ min: 0, max: 200000 }).toString();
        await addCarModal.mileageInput.fill(mileage);
        await addCarModal.addButton.click();

        await garage.addFuelExpenseButton.click();
        await expect(addExpenseModal.addExpenseModalHeader).toBeVisible();
    });

    test('Add expense page appears on Add fuel Expense link click', async ({ garage, addCarModal, fuelExpenses }) => {
        await garage.addCarButton.click();
        await expect(addCarModal.addCarModalHeader).toBeVisible();
        await addCarModal.brandSelect.selectOption('Audi');
        await addCarModal.modelSelect.selectOption('TT');
        const mileage = faker.number.int({ min: 0, max: 200000 }).toString();
        await addCarModal.mileageInput.fill(mileage);
        await addCarModal.addButton.click();

        await garage.fuelExpensesLink.click();
        await expect(fuelExpenses.fuelExpensesTitle).toBeVisible();
        await expect(fuelExpenses.addExpenseButton).toBeVisible();
    });
});