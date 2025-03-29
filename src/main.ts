import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = 8092; 
  await app.listen(port);
  console.log(`🚀 Server running at http://localhost:${port}/graphql`);
}
bootstrap();
