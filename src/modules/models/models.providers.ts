import { Connection as TypeOPMConnection } from 'typeorm';
import { DB_CONNECTION, MODEL_REPOSITORY} from '../../constants';
import DataModel from '../database/entities/data-model.entity';

export default [
  {
    provide: MODEL_REPOSITORY,
    useFactory: (connection: TypeOPMConnection) => connection.getRepository(DataModel),
    inject: [DB_CONNECTION],
  },
];
