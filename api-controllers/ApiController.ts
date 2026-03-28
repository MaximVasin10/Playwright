import { APIRequestContext, expect } from '@playwright/test';

export class ApiController {
    constructor(private request: APIRequestContext) { }

    async login() {
        const response = await this.request.post('/api/auth/signin', {
            data: {
                email: process.env.CUSTOMER_EMAIL,
                password: process.env.CUSTOMER_PASSWORD,
                remember: false
            }
        });
        expect(response.ok()).toBeTruthy();

        return response;
    }

    async cleanupCars() {
        const response = await this.request.get('/api/cars');
        const body = await response.json();

        if (body.data && body.data.length > 0) {
            for (const car of body.data) {
                await this.request.delete(`/api/cars/${car.id}`);
            }
        }
    }

    async createCar(brandId: number, modelId: number, mileage: number) {
        const response = await this.request.post('/api/cars', {
            data: {
                carBrandId: brandId,
                carModelId: modelId,
                mileage: mileage
            }
        });
        return response;
    }
}