import { connect } from 'mongoose';
import { Database } from './env';

export const connectDatabase = (): Promise<typeof import('mongoose')> => {
  return connect(Database.DB_URL);
};
