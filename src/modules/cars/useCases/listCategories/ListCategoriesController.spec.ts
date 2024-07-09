import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { hash } from 'bcrypt';
import { app } from '@shared/infra/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('List categories controller', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO 
        users
          (
            id,
            name,
            email,
            password,
            driver_license,
            admin,
            created_at
          )
      VALUES
        (
          '${id}',
          'admin',
          'admin@mail.com',
          '${password}',
          'XXXXXX',
          'true',
          'now()'
        )`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list all categories', async () => {
    const session = await request(app).post('/sessions').send({
      email: 'admin@mail.com',
      password: 'admin',
    });

    const { token } = session.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Category test',
        description: 'Category test.',
      })
      .set({
        authorization: `Bearer ${token}`,
      });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id');
  });
});
