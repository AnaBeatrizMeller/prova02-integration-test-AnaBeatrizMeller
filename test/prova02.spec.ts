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
            it('Create a new object', async () => {
            p.reporter.add(rep);
            await p
            .spec()
            .post(`${baseUrl}/objects`)
            .withJson({
                name: 'Iphone 13',
                data: {
                    year: 2021,
                    price: 3000,
                }
            })
            .expectStatus(StatusCodes.OK)
            .inspect()
        });
    });
});