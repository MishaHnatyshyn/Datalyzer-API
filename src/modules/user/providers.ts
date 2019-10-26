import { Connection } from 'typeorm';
import User from '../../database/entities/user.entity';
import { DB_CONNECTION, USER_REPOSITORY } from '../../constants/providerNames';

export default [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DB_CONNECTION],
  },
];
