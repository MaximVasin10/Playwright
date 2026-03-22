import { test as setup } from '@playwright/test';
import { ApiController } from '../api-controllers/ApiController';

const authFile = 'testData/auth.json';

setup('authenticate via API', async ({ request }) => {
    const apiController = new ApiController(request);

    await apiController.login();

    await request.storageState({ path: 'testData/auth.json' });
});