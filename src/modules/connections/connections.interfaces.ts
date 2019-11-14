export type DatabaseType = 'mysql' | 'postgres' | 'mariadb' | 'sqlite' | 'oracle' | 'mssql' | 'mongodb';

export interface ConnectionData {
  name: string;
  host: string;
  port: string;
  username: string;
  password: string;
  type: DatabaseType;
  database: string;
}

export enum CreateConnectionErrorMessage {
  NAME_IS_NOT_UNIQ = 'Connection with such a name already exists',
  CANNOT_ESTABLISH_CONNECTION = 'Database is not reachable',
  DATABASE_TYPE_DOES_NOT_EXISTS = 'Database type does not exists'
}

export interface TableAndColumnQueryResult {
  table: string;
  column: string;
}

export interface FormattedTableAndColumnQueryResult {
  [key: string]: string[];
}
