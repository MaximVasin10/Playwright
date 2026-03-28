import { test, expect } from '../../../fixtures/PageFixture';

test.describe('Cars: basic Api checks', () => {

    let carId: number;
    const carData = { brandId: 1, modelId: 2, initialMileage: 250 };

    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
    });

    test.afterEach(async ({ apiController }) => {
        await apiController.cleanupCars();
    });

    test('verify creating a new car', async ({ apiController }) => {
        const response = await apiController.createCar(
            carData.brandId,
            carData.modelId,
            carData.initialMileage
        );
        const body = await response.json();

        expect(response.status()).toBe(201);
        expect(body.data).toMatchObject({
            carBrandId: carData.brandId,
            carModelId: carData.modelId,
            mileage: carData.initialMileage
        });
    });

    test.describe('Tests with existing car', () => {
        test.beforeEach(async ({ apiController }) => {
            const response = await apiController.createCar(
                carData.brandId,
                carData.modelId,
                carData.initialMileage
            );
            const body = await response.json();
            carId = body.data.id;
        });

        test('verify retrieving the list of cars for the current user', async ({ apiController }) => {
            const response = await apiController.getUserCars();
            const body = await response.json();

            expect(response.status()).toBe(200);
            const car = body.data.find((c: any) => c.id === carId);
            expect(car).toBeDefined();
        });

        test('verify updating car mileage', async ({ apiController }) => {
            const newMileage = 777;
            const response = await apiController.updateCar(
                carId,
                carData.brandId,
                carData.modelId,
                newMileage
            );
            const body = await response.json();

            expect(response.status()).toBe(200);
            expect(body.data.mileage).toBe(newMileage);
        });

        test('verify car list updates accordingly to mileage changes', async ({ apiController }) => {
            const newMileage = 999;
            await apiController.updateCar(carId, carData.brandId, carData.modelId, newMileage);

            const response = await apiController.getUserCars();
            const body = await response.json();
            const car = body.data.find((c: any) => c.id === carId);

            expect(car.mileage).toBe(newMileage);
        });
    });
});