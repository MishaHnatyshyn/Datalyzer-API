import { Module } from '@nestjs/common';
import Controllers from './controllers/index';
import { UsersModule } from './database/modules/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [AppService],
})
export class AppModule {}
