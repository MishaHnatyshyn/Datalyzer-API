import { Connection } from 'typeorm';
import User from '../../database/entities/user.entity';

export default [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
];
