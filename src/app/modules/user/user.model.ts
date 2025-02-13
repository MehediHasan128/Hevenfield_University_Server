import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { userNameSchema } from './user.constant';

const userSchema = new Schema<TUser>({
  id: {
    type: String,
    required: [true, 'User ID is required'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    trim: true,
    match: [
      /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
      'Please enter a valid email address.',
    ],
  },
  userName: {
    type: userNameSchema,
    required: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [6, 'Password must be at least 6 characters long.'],
  },
  needPasswordChange: {
    type: Boolean,
    default: true,
  },
  passwordChangeAt: {
    type: Date,
  },
  role: {
    type: String,
    required: [true, 'Role is required.'],
    enum: {
      values: ['super-admin', 'registrar', 'admin', 'faculty', 'student'],
      message: 'Role must be either admin, faculty, or student.',
    },
  },
  status: {
    type: String,
    required: [true, 'Status is required.'],
    enum: {
      values: ['active', 'blocked'],
      message: 'Status must be either active or blocked.',
    },
    default: 'active'
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{
    timestamps: true
});

// bcrypt user password by pre hook middlware
userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_round))
  next();
})

export const User = model<TUser>('User', userSchema);
