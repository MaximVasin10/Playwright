import { test as base } from '@playwright/test';
import { HomePage } from '../pageObjects/pages/Homepage';
import { Header } from '../pageObjects/components/Header';
import { LoginForm } from '../pageObjects/components/LoginForm';
import { RegistrationForm } from '../pageObjects/components/RegistrationForm';
import { Garage } from '../pageObjects/pages/Garage';
import { AddCarModal } from '../pageObjects/components/AddCarModal';
import { AddExpenseModal } from '../pageObjects/components/AddExpenseModal';
import { FuelExpenses } from '../pageObjects/pages/FuelExpenses';
import { Profile } from '../pageObjects/pages/Profile';
import { ApiController } from '../api-controllers/ApiController';

// 1. Define types for all your Page Objects and Components
type MyPageObjects = {
    homePage: HomePage;
    header: Header;
    loginForm: LoginForm;
    registrationForm: RegistrationForm;
    garage: Garage;
    addCarModal: AddCarModal;
    addExpenseModal: AddExpenseModal;
    fuelExpenses: FuelExpenses;
    profile: Profile;
    apiController: ApiController;
};

// 2. Extend the base test with your objects
export const test = base.extend<MyPageObjects>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    header: async ({ page }, use) => {
        await use(new Header(page));
    },
    loginForm: async ({ page }, use) => {
        await use(new LoginForm(page));
    },
    registrationForm: async ({ page }, use) => {
        await use(new RegistrationForm(page));
    },
    garage: async ({ page }, use) => {
        await use(new Garage(page));
    },
    addCarModal: async ({ page }, use) => {
        await use(new AddCarModal(page));
    },
    addExpenseModal: async ({ page }, use) => {
        await use(new AddExpenseModal(page));
    },
    fuelExpenses: async ({ page }, use) => {
        await use(new FuelExpenses(page));
    },
    profile: async ({ page }, use) => {
        await use(new Profile(page));
    },
    apiController: async ({ request }, use) => {
        await use(new ApiController(request));
    },

});

export { expect } from '@playwright/test';