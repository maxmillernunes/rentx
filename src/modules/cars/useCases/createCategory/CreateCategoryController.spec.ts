import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { hash } from 'bcrypt';
import { app } from '@shared/infra/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('Create category controller', () => {
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

  it('should be able a create a new category', async () => {
    const session = await request(app).post('/sessions').send({
      email: 'admin@mail.com',
      password: 'admin',
    });

    const { token } = session.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category test',
        description: 'Category test.',
      })
      .set({
        authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it('should not be able a create a new category with the some name', async () => {
    const session = await request(app).post('/sessions').send({
      email: 'admin@mail.com',
      password: 'admin',
    });

    const { token } = session.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category test',
        description: 'Category test.',
      })
      .set({
        authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
