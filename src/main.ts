import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {ValidationPipe} from "@nestjs/common";

const port = process.env.PORT || 3002;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(port, '0.0.0.0');
}
bootstrap();
