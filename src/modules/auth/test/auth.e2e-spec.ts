import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';
import { INestApplication } from '@nestjs/common';

describe('Auth e2e ', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/POST auth/login`, async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({username: 'misha', id: 1})
      .expect(200).then((res) => {
        expect(res.body.access_token).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
