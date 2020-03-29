const app = require('../../src/app');
const request = require('supertest');
const connection = require('../../src/database/connection');

describe('ONG', () => {
	beforeEach(async () => {
		await connection.migrate.rollback(); //apaga as migrations existentes antes de criar as de teste
		await connection.migrate.latest();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it('should be able to create and new ONG', async () => {
		const response = await request(app)
			.post('/ongs')
			// .set("Authorization", 'xxxxxxxx')//define um header pra requisição d teste
			.send({
				name: "lok",
				email: "teste@lok.com",
				whatsapp: "11931502201",
				city: "Carapicuíba",
				uf: "SP"
			});

		expect(response.body).toHaveProperty('id');
		expect(response.body.id).toHaveLength(8);
	});
});