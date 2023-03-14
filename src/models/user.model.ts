import mongoose, { Schema, Document } from 'mongoose';
import { UserModelInterface } from '../interfaces';

const UserSchema: Schema = new Schema({
  Name: {
    type: String,
    required: true,
    unique: false,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
    private: true,
  },
});

export default mongoose.model<UserModelInterface>('User', UserSchema);
