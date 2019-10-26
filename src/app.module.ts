import { Module } from '@nestjs/common';
import UserModule from './modules/user';

import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, UserModule],
})

export class AppModule {}
