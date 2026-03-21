import { test as base } from '@playwright/test';
import { HomePage } from '../pageObjects/pages/Homepage';
import { Header } from '../pageObjects/components/Header';
import { LoginForm } from '../pageObjects/components/LoginForm';
import { RegistrationForm } from '../pageObjects/components/RegistrationForm';

// 1. Define types for all your Page Objects and Components
type MyPageObjects = {
    homePage: HomePage;
    header: Header;
    loginForm: LoginForm;
    registrationForm: RegistrationForm;
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
    }
});

export { expect } from '@playwright/test';