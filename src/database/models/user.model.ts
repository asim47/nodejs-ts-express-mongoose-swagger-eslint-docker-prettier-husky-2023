import mongoose, { Schema } from 'mongoose';

interface UserModelInterface {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    private: true,
  },
});

export default mongoose.model<UserModelInterface>('users', UserSchema);
