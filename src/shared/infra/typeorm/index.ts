import {
  Connection,
  createConnection,
  getConnectionOptions,
  ConnectionOptions,
} from 'typeorm';
import fs from 'fs';

export default async (): Promise<Connection> => {
  let defaultConnection: ConnectionOptions;

  if (process.env.NODE_ENV === 'test') {
    const config = await fs.promises.readFile('ormconfig.test.json', 'utf8');
    defaultConnection = JSON.parse(config);

    return createConnection(defaultConnection);
  }

  defaultConnection = await getConnectionOptions();
  return createConnection(defaultConnection);
};
