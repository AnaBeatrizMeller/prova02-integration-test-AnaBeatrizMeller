import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('RESTful-API', () => {
    const p = pactum;
    const rep = SimpleReporter;
    const baseUrl = 'https://api.restful-api.dev';

    p.request.setDefaultTimeout(90000);

    afterAll(() => p.reporter.end());

    describe('Objects', () => {
        it('Get all objects', async () => {
            await p
            .spec()
            .get(`${baseUrl}/objects`)
            .expectStatus(StatusCodes.OK)
            .inspect()
        });
    });
});