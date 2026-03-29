import { test, expect } from '../../../fixtures/PageFixture';

test.describe('Profile page: basic checks', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
    });

    test('Mock the response name, surname and verify the changes on UI', async ({ page, profile }) => {
        await page.route('**/api/users/profile', async (route) => {
            const mockBody = {
                "status": "ok",
                "data": {
                    "userId": 1,
                    "photoFilename": "default-user.png",
                    "name": "CHIKI",
                    "lastName": "PIKI"
                }
            };

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockBody),
            });
        });

        await profile.open();
        await page.waitForTimeout(2000);
        await expect(profile.profileName).toHaveText('CHIKI PIKI');
    });
});