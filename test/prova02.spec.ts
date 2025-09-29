import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('RESTful-API', () => {
    const p = pactum;
    const rep = SimpleReporter;
    const baseUrl = 'https://api.restful-api.dev';
    let newObjectId;

    p.request.setDefaultTimeout(90000);

    afterAll(() => p.reporter.end());

    describe('Objects', () => {
            it('POST - criar um novo produto', async () => {
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

        it('GET - mostrar todos os produtos cadastrados', async () => {
            await p
            .spec()
            .get(`${baseUrl}/objects`)
            .expectStatus(StatusCodes.OK)
            .inspect
        });
        
        it('GET - Mostrar objeto de acordo com ID válido', async () => {
            await p
              .spec()
              .get(`${baseUrl}/objects/5`)
              .expectStatus(StatusCodes.OK)
              .inspect()  
          });

        it('GET - Tentativa de mostrar objeto com ID inválido', async () => {
            await p
            .spec()
            .get(`${baseUrl}/objects/20`)
            .expectStatus(StatusCodes.NOT_FOUND)
            .inspect()  
        });

        it('POST - criar novo produto para utilizar como exemplo', async () =>{
            const objectBody = await p
            .spec()
            .post(`${baseUrl}/objects`)
            .withJson({
                name: 'Iphone 17',
                data: {
                    year: 2025,
                    price: 18000,
                    color: 'laranja'
                }
            })
            .expectStatus(StatusCodes.OK)
            .inspect()

            newObjectId = objectBody.json.id;
        });

        it('PUT - Atualizar todos os itens de um produto cadastrado', async () => {
            expect(newObjectId).toBeDefined()

            await p
            .spec()
            .put(`${baseUrl}/objects/${newObjectId}`)
            .withJson({
                name: 'Iphone 17 PRO MAX',
                data: {
                    year: 2025,
                    price: 22000,
                    color: 'rosa'
                }
            })
            .expectStatus(StatusCodes.OK)
            .inspect()
        });

        it('PATCH - Atualizar apenas a cor do produto', async () => {
            expect(newObjectId).toBeDefined()

            await p
                .spec()
                .patch(`${baseUrl}/objects/${newObjectId}`)
                .withJson({
                    data: {
                        color: "branco" 
                    }
                })
                .expectStatus(StatusCodes.OK) 
                .inspect();
        });

        it('DELETE - deletar 1 item com base no ID', async () => {
            expect(newObjectId).toBeDefined()
            
            await p
                .spec()
                .delete(`${baseUrl}/objects/${newObjectId}`)
                .expectStatus(StatusCodes.OK) 
                .inspect();
        });

        it('POST - Criar um novo produto e retornar os dados enviados', async () => {
            const objectBody = {
                name: 'iPhone 17',
                data: {
                    year: 2025,
                    price: 18000,
                    color: 'rosa'
                }
            };
    
                await p
                .spec()
                .post(`${baseUrl}/objects`)
                .withJson(objectBody)
                .expectStatus(StatusCodes.OK) 
                .expectJsonMatch({
                    name: objectBody.name,
                    data: objectBody.data,
                })
                .inspect();
            
            
        });

        it('PUT - Tentar atualizar um produto com id inválido', async () => {
            expect(newObjectId).toBeDefined()

            await p
            .spec()
            .put(`${baseUrl}/objects/20`)
            .withJson({
                name: 'Iphone 17 PRO MAX',
                data: {
                    year: 2025,
                    price: 22000,
                    color: 'rosa'
                }
            })
            .expectStatus(StatusCodes.NOT_FOUND)
            .inspect()
        });

        it('PATCH - Tentar atualizar um produto com id inválido', async () => {
            expect(newObjectId).toBeDefined()

            await p
                .spec()
                .patch(`${baseUrl}/objects/20`)
                .withJson({
                    data: {
                        color: "branco" 
                    }
                })
                .expectStatus(StatusCodes.NOT_FOUND) 
                .inspect();
        });



    });
});