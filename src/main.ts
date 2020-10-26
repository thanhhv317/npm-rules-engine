import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import hbs = require('hbs');

// Multiple server
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express'
import * as http from "http"
import { AppInternalModule } from './appInternal.module';


async function bootstrap() {
  // server 1;
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.enableCors();
  await app.init();
  http.createServer(server).listen(3000);

  // server 2;
  const serverInternal = express();
  const appInternal = await NestFactory.create<NestExpressApplication>(
    AppInternalModule,
    new ExpressAdapter(serverInternal),
  );
  appInternal.useStaticAssets(join(__dirname, '..', 'public'));
  appInternal.setBaseViewsDir(join(__dirname, '..', 'views'));
  appInternal.setViewEngine('hbs');
  appInternal.enableCors();
  await appInternal.init();
  http.createServer(serverInternal).listen(4001);

}
bootstrap();
