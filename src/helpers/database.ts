import { connect, connection, ConnectionStates } from 'mongoose';
import { Database } from './env';

export const connectDatabase = (): Promise<typeof import('mongoose')> => {
  return connect(Database.DB_URL);
};

export const getDatabaseConnectionState = (): number => {
  return connection.readyState.valueOf();
};
