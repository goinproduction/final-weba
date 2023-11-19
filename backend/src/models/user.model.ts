import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  fullName: {
    type: String,
    require: false,
  },
});

export const User = mongoose.model('User', userSchema);
