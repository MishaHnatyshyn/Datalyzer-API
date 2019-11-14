import {FormattedTableAndColumnQueryResult, TableAndColumnQueryResult} from '../connections.interfaces';

export const dataBaseSelectTablesAndColumnsQuery = {
  postgres: `
    SELECT tablename AS table, column_name AS column
    FROM pg_catalog.pg_tables
    INNER JOIN information_schema.columns
    ON table_name = tablename
    WHERE table_schema = 'public'
  `,
};

export const formatTablesAndColumnsResponse = (
  data: TableAndColumnQueryResult[],
): FormattedTableAndColumnQueryResult => (
    data.reduce((acc, { column, table }) => {
    if (acc[table]) {
      acc[table].push(column);
    } else {
      acc[table] = [column];
    }
    return acc;
  }, {})
);
