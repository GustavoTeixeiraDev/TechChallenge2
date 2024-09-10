const request = require('supertest');
const app = require('../src/server');

describe('Testes CRUD de Posts', () => {
    it('Deve listar todos os posts', async () => {
        const res = await request(app).get('/api/posts');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('Deve criar um novo post', async () => {
        const res = await request(app)
            .post('/api/posts')
            .send({
                title: 'Novo Post',
                content: 'Conteúdo do novo post',
                author: 'Autor Teste'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    });
});
