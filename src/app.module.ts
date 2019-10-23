import { Module } from '@nestjs/common';
import UserModule from './modules/user';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [AppService],
})
export class AppModule {}
