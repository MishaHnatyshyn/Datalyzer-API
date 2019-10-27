import { Module } from '@nestjs/common';
import UserModule from './modules/user';

import DatabaseModule from './modules/database';

@Module({
  imports: [DatabaseModule, UserModule],
})

export class AppModule {}
