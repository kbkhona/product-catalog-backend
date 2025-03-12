import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('********************************COrs info', process.env.DOMAIN_FRONTEND, process.env.PORT_FRONTEND)
  app.enableCors({
    origin: `http://${process.env.DOMAIN_FRONTEND}:${process.env.PORT_FRONTEND}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  });

  await app.listen(process.env.APP_PORT ?? 3001);
}
bootstrap();
