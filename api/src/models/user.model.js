import mongoose from "mongoose";
import argon2 from "argon2";
import { passwordRegex } from "../validations/auth.validation";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (v) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
    validate: {
      validator: function (v) {
        return passwordRegex.test(v);
      },
      message: () => 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
    }
  },
  phone: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    select: false
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  address: {
    city: String,
    state: String,
    street: String,
    zipCode: String,
  },
  restorantName: {
    type: String,
    validate: {
      validator: function (v) {
        if (this.role !== 'admin') return true;
        return v && v.trim().length > 0;
      },
      message: 'Restaurant name is only for admin users'
    }
  }
});


userSchema.pre('save', async function (next) {
  if (this.role === 'admin') {
    const existingAdmin = await this.constructor.findOne({ role: 'admin' });
    if (existingAdmin && !existingAdmin._id.equals(this._id)) {
      throw new Error('Only one admin user can exist');
    }
  }
  next();
});


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

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

const User = mongoose.model("User", userSchema);
export default User;
