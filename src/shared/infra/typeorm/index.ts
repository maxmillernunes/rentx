import { Connection, createConnection, getConnectionOptions } from 'typeorm';

// createConnection()

export default async (): Promise<Connection> => {
  const defaultConnection = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultConnection, {
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentx_test'
          : defaultConnection.database,
    })
  );
};
