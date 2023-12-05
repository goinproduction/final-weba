import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: false,
  },
  fullName: {
    type: String,
    require: false,
  },
  avatar: {
    type: String,
    require: false,
  },
});

export const User = mongoose.model('User', userSchema);
