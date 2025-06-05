import mongoose from 'mongoose';
import argon2 from 'argon2';


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  refreshToken: { type: String, select: false },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.verifyPassword = async function (candidatePassword) {
  return await argon2.verify(this.password, candidatePassword);
};

const User = mongoose.model('User', userSchema);
export default User;
