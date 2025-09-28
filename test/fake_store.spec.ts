import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('Store API', () => {
    const p = pactum;
    const rep = SimpleReporter;
    const baseUrl = 'https://fakestoreapi.com';

    p.request.setDefaultTimeout(90000);

    

    afterAll(() => p.reporter.end());

    describe('Products', () => {
        it('Get all products', async () => {
        await p
        .spec()
        .get(`${baseUrl}/products`)
        .expectStatus(StatusCodes.OK)
        .inspect()
    });
    it('Create a new product', async () => {
    p.reporter.add(rep);

    await p
     .spec()
      .post(`${baseUrl}/products`)
      .withJson({
        title: "Xbox",
        price: 2000,
        description: "string",
        category: "console",
        image: "http://ehttps://cms-assets.xboxservices.com/assets/bf/b0/bfb06f23-4c87-4c58-b4d9-ed25d3a739b9.png?n=389964_Hero-Gallery-0_A1_857x676.pngxample.com"
      })
      .expectStatus(StatusCodes.CREATED)
      .inspect()
    });
  });

    
})